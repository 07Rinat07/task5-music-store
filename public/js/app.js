//
// Загрузка списка песен
//
async function loadSongs() {
    const locale = document.getElementById('localeSelect')?.value ?? 'en_US';
    const seed   = document.getElementById('seedInput')?.value ?? 1;
    const likes  = document.getElementById('likesInput')?.value ?? 3.5;

    const url = `/api/songs/list?locale=${locale}&seed=${seed}&likes=${likes}`;

    try {
        const res = await fetch(url);
        const songs = await res.json();

        const container = document.getElementById('songsContainer');
        if (!container) return;

        container.innerHTML = "";

        songs.forEach(song => {
            const div = document.createElement('div');
            div.className = "song-card";
            div.innerHTML = `
                <h3>${song.title}</h3>
                <p><b>Artist:</b> ${song.artist}</p>
                <p><b>Album:</b> ${song.album}</p>
                <a href="/song/${song.index}">Open details →</a>
            `;
            container.appendChild(div);
        });

    } catch (e) {
        console.error("Error loading songs:", e);
    }
}

//
// Загрузка детальной информации о песне
//
async function loadDetails(index) {
    const url = `/api/songs/details/${index}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const container = document.getElementById('detailsContainer');
        if (!container) return;

        container.innerHTML = `
            <p><a href="/">← Back to list</a></p>

            <h2>${data.title}</h2>

            <img src="${data.coverUrl}" width="220" style="border-radius: 6px; margin: 10px 0;">

            <p><b>Artist:</b> ${data.artist}</p>
            <p><b>Genre:</b> ${data.genre}</p>
            <p><b>Album:</b> ${data.album}</p>

            <p><b>Review:</b><br>${data.review}</p>

            <audio controls style="margin-top: 10px;">
                <source src="${data.audioUrl}" type="audio/mpeg">
                Your browser does not support audio playback.
            </audio>

            <p style="margin-top: 15px;"><a href="/">← Back to list</a></p>
        `;

    } catch (e) {
        console.error("Error loading details:", e);
    }
}

//
// Автоматическая инициализация
//
document.addEventListener("DOMContentLoaded", () => {

    // Если есть контейнер списка — загружаем список
    if (document.getElementById('songsContainer')) {
        loadSongs();
    }

    // Если есть контейнер деталей — загружаем данные
    const detailsWrapper = document.getElementById('detailsContainer');
    const songIndex = detailsWrapper?.dataset?.songIndex;

    if (detailsWrapper && songIndex) {
        loadDetails(songIndex);
    }
});
