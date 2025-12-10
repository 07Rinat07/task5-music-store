async function loadSongs() {
    const locale = document.getElementById('locale').value;
    const seed = document.getElementById('seed').value;

    const url = `/api/songs/list?locale=${locale}&seed=${seed}`;
    const response = await fetch(url);
    const songs = await response.json();

    const container = document.getElementById('song-list');
    container.innerHTML = "";

    songs.forEach(song => {
        const div = document.createElement('div');
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px 0";
        div.style.borderRadius = "6px";

        div.innerHTML = `
            <strong>${song.index}. ${song.title}</strong><br>
            <em>${song.artist}</em><br>
            <span>${song.genre} — ${song.album}</span><br>
            Likes: ${song.likes}<br>
            <a href="/song/${song.index}">Details</a>
        `;

        container.appendChild(div);
    });
}

async function loadSongDetails(index) {
    const url = `/api/songs/details/${index}`;
    const response = await fetch(url);
    const song = await response.json();

    const container = document.getElementById('song-details');

    container.innerHTML = `
        <h3>${song.title}</h3>
        <p><strong>${song.artist}</strong></p>
        <p>${song.genre} — ${song.album}</p>
        <p><strong>Likes:</strong> ${song.likes}</p>
        <p><strong>Review:</strong> ${song.review}</p>

        <img src="${song.coverUrl}" style="width: 200px; border-radius: 10px; margin-bottom: 20px;">

        <audio controls src="${song.audioUrl}"></audio>
    `;
}
