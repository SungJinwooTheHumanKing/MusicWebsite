const songs = [
  { title: "Dreamer", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Sky High", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Pulse", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

const songListEl = document.getElementById("song-list");
const searchInput = document.getElementById("search");
const player = document.getElementById("player");
const playerTitle = document.getElementById("player-title");
const audio = document.getElementById("audio");
const closePlayer = document.getElementById("close-player");

let currentPlaying = null;

function loadSongs(filteredSongs = songs) {
  songListEl.innerHTML = "";
  filteredSongs.forEach((song, index) => {
    const songEl = document.createElement("div");
    songEl.className = "song";
    songEl.textContent = song.title;
    songEl.addEventListener("click", () => playSong(song));
    songListEl.appendChild(songEl);
  });
}

function playSong(song) {
  if (currentPlaying !== song.url) {
    audio.src = song.url;
    playerTitle.textContent = song.title;
    player.classList.remove("hidden");
    currentPlaying = song.url;
  }
}

closePlayer.addEventListener("click", () => {
  player.classList.add("hidden");
  audio.pause();
  currentPlaying = null;
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = songs.filter(song => song.title.toLowerCase().includes(query));
  loadSongs(filtered);
});

loadSongs();

