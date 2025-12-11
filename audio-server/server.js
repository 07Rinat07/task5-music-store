import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000; // внутри контейнера

app.use(cors());

/**
 * Генерируем валидный WAV 16-bit PCM mono 44.1 kHz
 * Длина ~1 секунда. Сигнал — синус с частотой, зависящей
 * от seed и index => детерминизм.
 */
app.get("/audio", (req, res) => {
    const seed  = Number(req.query.seed || 1);
    const index = Number(req.query.index || 1);

    const sampleRate   = 44100;    // 44.1 kHz
    const durationSec  = 1;        // 1 секунда
    const numChannels  = 1;        // моно
    const bitsPerSample = 16;
    const numSamples   = sampleRate * durationSec;

    const byteRate  = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize  = numSamples * numChannels * (bitsPerSample / 8);
    const fileSize  = 44 + dataSize;

    const buffer = Buffer.alloc(fileSize);

    // ---- WAV header ----
    let offset = 0;
    buffer.write("RIFF", offset); offset += 4;
    buffer.writeUInt32LE(36 + dataSize, offset); offset += 4; // file size - 8
    buffer.write("WAVE", offset); offset += 4;

    buffer.write("fmt ", offset); offset += 4;
    buffer.writeUInt32LE(16, offset); offset += 4;            // subchunk size
    buffer.writeUInt16LE(1, offset); offset += 2;             // PCM
    buffer.writeUInt16LE(numChannels, offset); offset += 2;
    buffer.writeUInt32LE(sampleRate, offset); offset += 4;
    buffer.writeUInt32LE(byteRate, offset); offset += 4;
    buffer.writeUInt16LE(blockAlign, offset); offset += 2;
    buffer.writeUInt16LE(bitsPerSample, offset); offset += 2;

    buffer.write("data", offset); offset += 4;
    buffer.writeUInt32LE(dataSize, offset); offset += 4;

    // ---- PCM data ----
    // Дет. частота зависит только от seed и index
    const baseFreq = 220; // A3
    const step     = 55;  // шаг по частоте
    const variant  = (seed * 31 + index * 17) % 5; // 0..4
    const freq     = baseFreq + variant * step;

    const amplitude = 0.3; // чтобы не клиппило

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const sample = Math.sin(2 * Math.PI * freq * t); // -1..1
        const s = Math.max(-1, Math.min(1, sample * amplitude));
        const intSample = Math.round(s * 32767);         // 16-bit PCM

        buffer.writeInt16LE(intSample, offset);
        offset += 2;
    }

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Cache-Control", "no-cache");

    res.send(buffer);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Audio server running on port ${PORT} (WAV)`);
});
