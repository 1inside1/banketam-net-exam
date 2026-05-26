import PageLogo from './PageLogo'
import SocialLinks from './SocialLinks'

export default function AuthLayout({ title, subtitle, children, image = '/assets/04.png' }) {
  return (
    <div className="min-h-screen bg-banquet-cream app-shell">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-6 text-center">
          <PageLogo className="h-11 w-11 mb-2 drop-shadow-md brightness-110" />
          <h1 className="text-white drop-shadow text-[26px] leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-banquet-peach text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="px-4 py-6 -mt-3">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </div>

      <footer className="px-4 pb-8 flex flex-col items-center gap-3">
        <SocialLinks />
        <p className="text-secondary text-center">Банкетам.Нет — бронирование банкетных залов</p>
      </footer>
    </div>
  )
}
