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
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioCtx, analyser, source, dataArray, animationId;

function initVisualizer() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  }

  drawVisualizer();
}

function drawVisualizer() {
  animationId && cancelAnimationFrame(animationId);
  const WIDTH = canvas.width = canvas.offsetWidth;
  const HEIGHT = canvas.height = canvas.offsetHeight;

  function draw() {
    animationId = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = WIDTH / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i];
      const r = barHeight + 25;
      const g = 250 * (i / dataArray.length);
      const b = 50;

      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth - 1, barHeight);

      x += barWidth;
    }
  }

  draw();
}

audio.addEventListener("play", () => {
  initVisualizer();
});

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

