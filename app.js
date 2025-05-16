// Pause other tracks when one is playing
document.querySelectorAll('audio').forEach(audio => {
  audio.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});
