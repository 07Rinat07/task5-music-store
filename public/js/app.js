// Загружает список песен на главной странице
async function loadSongs() {
    const locale = document.getElementById('localeSelect').value;
    const seed   = document.getElementById('seedInput').value;
    const likes  = document.getElementById('likesInput').value;

    const url = `/api/songs/list?locale=${locale}&seed=${seed}&likes=${likes}`;

    try {
        const res = await fetch(url);
        const songs = await res.json();

        const container = document.getElementById('songsContainer');
        container.innerHTML = "";

        songs.forEach(song => {
            const div = document.createElement('div');
            div.className = "song-card";

            div.innerHTML = `
                <h3>${song.title}</h3>
                <p><b>Artist:</b> ${song.artist}</p>
                <p><b>Album:</b> ${song.album}</p>

                <button onclick="window.location.href='/song/${song.index}'">
                    Details
                </button>
            `;

            container.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading songs:", err);
    }
}

// Автоматическая загрузка списка при открытии страницы
document.addEventListener("DOMContentLoaded", loadSongs);
