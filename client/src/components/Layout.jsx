import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useConfig } from '../contexts/ConfigContext'
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
      <header className="bg-white shadow-sm border-b border-banquet-peach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{config.theme.logo}</span>
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
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    Панель управления
                  </Link>
                  <Link
                    to="/admin/applications"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/admin/applications')
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
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
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    Главная
                  </Link>
                  <Link
                    to="/applications"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/applications')
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
                    )}
                  >
                    {config.labels?.viewButton || 'Мои заявки'}
                  </Link>
                  <Link
                    to="/applications/new"
                    className={clsx(
                      'text-sm font-medium transition-colors',
                      isActive('/applications/new')
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
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
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                Панель управления
              </Link>
              <Link
                to="/admin/applications"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/admin/applications')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
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
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                Главная
              </Link>
              <Link
                to="/applications"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/applications')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {config.labels?.viewButton || 'Мои заявки'}
              </Link>
              <Link
                to="/applications/new"
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive('/applications/new')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
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

      <footer className="border-t border-banquet-peach bg-white py-4 text-center text-xs text-banquet-green">
        <p>{config.contacts?.address}</p>
        <p>{config.contacts?.phone}</p>
      </footer>
    </div>
  )
}
