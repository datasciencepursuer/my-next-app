export const smoothScrollTo = (
  targetPosition: number,
  duration: number = 1000,
  callback?: () => void
): void => {
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const startTime = performance.now()

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = easeInOutCubic(progress)
    const currentPosition = startPosition + distance * easeProgress

    window.scrollTo({
      top: currentPosition,
      behavior: 'auto'
    })

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    } else {
      callback?.()
    }
  }

  requestAnimationFrame(animateScroll)
}