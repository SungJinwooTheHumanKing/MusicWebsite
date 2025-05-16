const audio = document.getElementById('main-audio');
const playlistItems = document.querySelectorAll('.track');
const nowPlaying = document.getElementById('now-playing');
const miniPlayer = document.getElementById('mini-player');
const likeButtons = document.querySelectorAll('.like-btn');

// Play audio from playlist
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    const src = item.getAttribute('data-src');
    audio.src = src;
    audio.play();
    nowPlaying.textContent = `Now Playing: ${src.split('/').pop()}`;
    miniPlayer.style.display = 'flex';

    playlistItems.forEach(el => el.classList.remove('bg-purple-700'));
    item.classList.add('bg-purple-700');
  });
});

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  document.body.classList.toggle('bg-white');
  document.body.classList.toggle('text-black');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  document.body.classList.add('bg-white', 'text-black');
}

// Like button
likeButtons.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const trackName = playlistItems[index].textContent.trim();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.includes(trackName)) {
      favorites = favorites.filter(name => name !== trackName);
      btn.classList.remove('text-red-500');
    } else {
      favorites.push(trackName);
      btn.classList.add('text-red-500');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});

// Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
let source;

audio.addEventListener('play', () => {
  if (!source) {
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }
  visualize();
});

function visualize() {
  requestAnimationFrame(visualize);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i];
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

