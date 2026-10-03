/**
 * Scroll-Driven Cinematic Background Video Scrub Engine (Mobile & Desktop Responsive)
 */

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideo');
  const scrollSpacer = document.getElementById('scrollSpacer');
  if (!video) return;

  video.pause();

  let duration = 0;
  let targetTime = 0;
  let smoothedTime = 0;
  let isSeeking = false;
  let lastTimestamp = performance.now();
  let isVideoPrimed = false;
  const SMOOTHING_SPEED = 18;

  function primeVideo() {
    if (isVideoPrimed) return;
    isVideoPrimed = true;
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      }
    }
  }

  function getViewportHeight() {
    return (
      (window.visualViewport && window.visualViewport.height) ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
      1
    );
  }

  function updateScrollHeight() {
    if (duration > 0 && scrollSpacer) {
      const isMobile = window.innerWidth <= 768;
      const multiplier = isMobile ? 12 : 15;
      const calculatedHeight = Math.max(300, Math.min(1200, Math.round(duration * multiplier)));
      scrollSpacer.style.height = `${calculatedHeight}vh`;
    }
  }

  function calculateTargetTime() {
    const scrollY =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;
    const winHeight = getViewportHeight();
    const docHeight =
      document.documentElement.scrollHeight ||
      document.body.scrollHeight ||
      1;
    const maxScroll = docHeight - winHeight;

    if (maxScroll <= 0 || !duration) return;

    const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));
    targetTime = scrollFraction * duration;
  }

  function commitSeek() {
    if (!duration) return;
    const clampedTime = Math.max(0, Math.min(duration - 0.001, smoothedTime));
    if (Math.abs(video.currentTime - clampedTime) > 0.004) {
      isSeeking = true;
      try {
        if ('fastSeek' in video && typeof video.fastSeek === 'function') {
          video.fastSeek(clampedTime);
        } else {
          video.currentTime = clampedTime;
        }
      } catch (e) {
        try {
          video.currentTime = clampedTime;
        } catch (err) {}
        isSeeking = false;
      }
    }
  }

  function onSeeked() {
    isSeeking = false;
    commitSeek();
  }

  function onLoadedMetadata() {
    duration = video.duration;
    updateScrollHeight();
    calculateTargetTime();
    smoothedTime = targetTime;
    try {
      video.currentTime = targetTime;
    } catch (e) {}
  }

  video.addEventListener('loadedmetadata', onLoadedMetadata);
  video.addEventListener('seeked', onSeeked);

  if (video.readyState >= 1) {
    onLoadedMetadata();
  }

  const onScroll = () => {
    primeVideo();
    calculateTargetTime();
  };

  const onResize = () => {
    updateScrollHeight();
    calculateTargetTime();
  };

  const onTouchStart = () => {
    primeVideo();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('touchmove', onScroll, { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('pointerdown', onTouchStart, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onResize);
  }

  function animationLoop(now) {
    const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;

    if (duration > 0) {
      const factor = 1 - Math.exp(-SMOOTHING_SPEED * dt);
      smoothedTime += (targetTime - smoothedTime) * factor;

      if (!isSeeking) {
        commitSeek();
      }
    }
    requestAnimationFrame(animationLoop);
  }
  requestAnimationFrame(animationLoop);
});

