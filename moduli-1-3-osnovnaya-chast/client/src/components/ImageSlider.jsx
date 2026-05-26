import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'

const SLIDES = [
  { src: '/assets/3505f015e0d26644e8e4c.jpg', alt: 'Зал' },
  { src: '/assets/339037.jpeg', alt: 'Ресторан' },
  { src: '/assets/1686676944_elles-top-p-letnyaya-ploshcha.jpg', alt: 'Летняя веранда' },
  { src: '/assets/1671649122_idei-club-p-veranda-.jpg', alt: 'Закрытая веранда' },
]

export default function ImageSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [next, paused])

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-card border border-banquet-peach"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[390/220] w-full bg-banquet-peach">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={clsx(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущий слайд"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-banquet-red shadow hover:bg-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Следующий слайд"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-banquet-red shadow hover:bg-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setIndex(i)}
            className={clsx(
              'h-2 w-2 rounded-full transition-colors',
              i === index ? 'bg-banquet-red' : 'bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  )
}
