// Pause other tracks when one is playing
document.querySelectorAll('audio').forEach(audio => {
  audio.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

const playlistItems = document.querySelectorAll('.track');
const audio = document.getElementById('main-audio');

playlistItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.getAttribute('data-src');
    audio.src = src;
    audio.play();
    playlistItems.forEach(el => el.classList.remove('bg-purple-700'));
    item.classList.add('bg-purple-700');
  });
});
