// Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- Auth Buttons ---
document.getElementById('google-login').onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    alert(`Welcome ${result.user.displayName}`);
  }).catch(console.error);
};

document.getElementById('facebook-login').onclick = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    alert(`Welcome ${result.user.displayName}`);
  }).catch(console.error);
};

// Placeholder for Instagram login
document.getElementById('instagram-login').onclick = () => {
  alert('Instagram login not directly supported via Firebase.');
};

// --- Dark/Light Mode ---
document.querySelector('.theme-toggle').onclick = () => {
  const root = document.documentElement;
  if (root.style.getPropertyValue('--bg') === '#fff') {
    root.style.setProperty('--bg', '#121212');
    root.style.setProperty('--text', '#fff');
  } else {
    root.style.setProperty('--bg', '#fff');
    root.style.setProperty('--text', '#000');
  }
};

// --- Playlist Loader ---
function loadTrack(src) {
  const audio = document.getElementById('audio');
  audio.src = src;
  audio.play();
}

// --- Audio Visualizer ---
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById('audio');
const audioSource = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();

audioSource.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}

drawVisualizer();

