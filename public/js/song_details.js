async function loadSongDetails(index) {
    const res = await fetch(`/api/songs/details/${index}`);
    const data = await res.json();

    const container = document.getElementById('detailsContainer');

    container.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.coverUrl}" width="250" style="border-radius:6px;margin:10px 0;">
        <p><b>Artist:</b> ${data.artist}</p>
        <p><b>Album:</b> ${data.album}</p>
        <p><b>Genre:</b> ${data.genre}</p>
        <p><b>Review:</b> ${data.review}</p>

        <h3>Audio</h3>
        <audio controls src="${data.audioUrl}" style="width:100%;"></audio>
    `;
}
