import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useConfig } from '../contexts/ConfigContext'
import PageLogo from './PageLogo'
import SocialLinks from './SocialLinks'
import clsx from 'clsx'

export default function Layout() {
  const { user, logout } = useAuth()
  const { config } = useConfig()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="min-h-screen bg-banquet-cream app-shell md:max-w-none">
      <header className="bg-white/95 backdrop-blur shadow-sm border-b border-banquet-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <PageLogo className="h-9 w-9" />
              <h1 className="text-xl font-bold text-banquet-red">{config.title}</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {user.role === 'admin' ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/admin/dashboard')
                        ? 'text-banquet-red'
                        : 'text-banquet-muted hover:text-banquet-red'
                    )}
                  >
                    Панель управления
                  </Link>
                  <Link
                    to="/admin/applications"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/admin/applications')
                        ? 'text-banquet-red'
                        : 'text-banquet-muted hover:text-banquet-red'
                    )}
                  >
                    Все заявки
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/dashboard')
                        ? 'text-banquet-red'
                        : 'text-banquet-muted hover:text-banquet-red'
                    )}
                  >
                    Главная
                  </Link>
                  <Link
                    to="/applications"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/applications')
                        ? 'text-banquet-red'
                        : 'text-banquet-muted hover:text-banquet-red'
                    )}
                  >
                    {config.labels?.viewButton || 'Мои заявки'}
                  </Link>
                  <Link
                    to="/applications/new"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/applications/new')
                        ? 'text-banquet-red'
                        : 'text-banquet-muted hover:text-banquet-red'
                    )}
                  >
                    {config.labels?.createButton || 'Новая заявка'}
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.fullName} ({user.role === 'admin' ? 'Администратор' : 'Пользователь'})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <nav className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-2 space-y-1">
          {user.role === 'admin' ? (
            <>
              <Link
                to="/admin/dashboard"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/admin/dashboard')
                    ? 'bg-banquet-peach text-banquet-red'
                    : 'text-banquet-ink hover:bg-banquet-peach/50'
                )}
              >
                Панель управления
              </Link>
              <Link
                to="/admin/applications"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/admin/applications')
                    ? 'bg-banquet-peach text-banquet-red'
                    : 'text-banquet-ink hover:bg-banquet-peach/50'
                )}
              >
                Все заявки
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/dashboard')
                    ? 'bg-banquet-peach text-banquet-red'
                    : 'text-banquet-ink hover:bg-banquet-peach/50'
                )}
              >
                Главная
              </Link>
              <Link
                to="/applications"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/applications')
                    ? 'bg-banquet-peach text-banquet-red'
                    : 'text-banquet-ink hover:bg-banquet-peach/50'
                )}
              >
                {config.labels?.viewButton || 'Мои заявки'}
              </Link>
              <Link
                to="/applications/new"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/applications/new')
                    ? 'bg-banquet-peach text-banquet-red'
                    : 'text-banquet-ink hover:bg-banquet-peach/50'
                )}
              >
                {config.labels?.createButton || 'Новая заявка'}
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <Outlet />
      </main>

      <footer className="border-t border-banquet-peach bg-white py-4 px-4 text-center">
        <SocialLinks className="mb-2" />
        <p className="text-xs text-banquet-muted">{config.contacts?.address}</p>
        <p className="text-xs text-banquet-muted">{config.contacts?.phone}</p>
      </footer>
    </div>
  )
}
