const express = require('express');
const cors = require('cors');

// Детерминированный генератор случайных чисел
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Генерация WAV
function generateWavAudio(seed, index) {
    const sampleRate = 44100;
    const duration = 1.5; // 1.5 seconds
    const samples = sampleRate * duration;
    const frequency = 200 + Math.floor(seededRandom(seed + index) * 600);

    const buffer = Buffer.alloc(44 + samples * 2); // WAV header + samples

    // WAV Header
    buffer.write("RIFF", 0);
    buffer.writeUInt32LE(36 + samples * 2, 4);
    buffer.write("WAVEfmt ", 8);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(1, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(sampleRate * 2, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write("data", 36);
    buffer.writeUInt32LE(samples * 2, 40);

    // Audio data
    let offset = 44;
    for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        const sample = Math.sin(2 * Math.PI * frequency * t);
        buffer.writeInt16LE(sample * 32767, offset);
        offset += 2;
    }

    return buffer;
}


const app = express();
app.use(cors());

app.get('/audio', (req, res) => {
    const seed = parseInt(req.query.seed || "1");
    const index = parseInt(req.query.index || "1");

    const audio = generateWavAudio(seed, index);

    res.setHeader("Content-Type", "audio/wav");
    res.send(audio);
});


app.listen(4000, () => {
    console.log("Audio server running on http://localhost:4000");
});
