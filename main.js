// Search Functionality
document.querySelector('.search-bar').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  document.querySelectorAll('.music-list div').forEach(song => {
    song.style.display = song.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
  });
});

// Music Player Logic
const player = document.createElement('div');
player.id = 'music-player';
player.innerHTML = `
  <div class="player-content">
    <span id="close-player">×</span>
    <h3 id="now-playing">Now Playing</h3>
    <audio id="audio-player" controls autoplay></audio>
  </div>
`;
document.body.appendChild(player);

document.querySelectorAll('.music-list div').forEach(song => {
  song.addEventListener('click', () => {
    const songName = song.textContent;
    const audioPlayer = document.getElementById('audio-player');

    // Replace with your actual audio file mapping
    const filename = songName.toLowerCase().replace(/\s+/g, '_') + '.mp3';
    audioPlayer.src = `songs/${filename}`; // ensure the file exists in 'songs/' folder
    document.getElementById('now-playing').textContent = 'Now Playing: ' + songName;
    player.style.display = 'block';
  });
});

document.getElementById('close-player').addEventListener('click', () => {
  document.getElementById('music-player').style.display = 'none';
  document.getElementById('audio-player').pause();
});
