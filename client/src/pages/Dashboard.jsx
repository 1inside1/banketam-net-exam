import { useAuth } from '../contexts/AuthContext'
import { useConfig } from '../contexts/ConfigContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import PageLogo from '../components/PageLogo'

const rooms = [
  { img: '/assets/3505f015e0d26644e8e4c.jpg', label: 'Зал' },
  { img: '/assets/339037.jpeg', label: 'Ресторан' },
  { img: '/assets/1686676944_elles-top-p-letnyaya-ploshcha.jpg', label: 'Летняя веранда' },
  { img: '/assets/1671649122_idei-club-p-veranda-.jpg', label: 'Закрытая веранда' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { config } = useConfig()

  return (
    <div className="space-y-6 animate-in">
      <div className="relative rounded-lg overflow-hidden h-40">
        <img src="/assets/unnamed.webp" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-banquet-navy/80 via-banquet-navy/40 to-transparent flex items-end p-4">
          <div className="flex items-center gap-3">
            <PageLogo className="h-10 w-10 brightness-110" />
            <div>
              <h1 className="text-white text-2xl leading-tight drop-shadow-md !text-white">
                Добро пожаловать, {user.fullName}!
              </h1>
              <p className="text-banquet-sand text-sm">{config.description}</p>
            </div>
          </div>
        </div>
      </div>

      {user.role === 'admin' && (
        <div className="card border-banquet-gold/40 bg-banquet-sand/30">
          <p className="text-sm text-banquet-taupe mb-3">
            Вы вошли как администратор. Перейдите в панель управления.
          </p>
          <Link to="/admin/dashboard" className="btn-primary inline-flex">
            Панель админа
          </Link>
        </div>
      )}

      <div>
        <h2>Наши помещения</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {rooms.map((room) => (
            <div key={room.label} className="rounded-xl overflow-hidden border border-banquet-sand shadow-sm bg-white">
              <img src={room.img} alt={room.label} className="h-24 w-full object-cover" />
              <p className="text-center text-sm py-2.5 text-banquet-wine font-medium">{room.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="card">
          <h3 className="!text-banquet-taupe">Профиль</h3>
          <p className="text-base mt-1 text-banquet-ink">{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
          <p className="text-sm text-banquet-muted mt-2">{user.email}</p>
          <p className="text-xs text-banquet-muted">
            Регистрация: {user.createdAt ? format(new Date(user.createdAt), 'd MMMM yyyy', { locale: ru }) : 'Сегодня'}
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Быстрые действия</h3>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <Link to="/applications" className="btn-secondary text-center">
            {config.labels?.viewButton || 'Мои заявки'}
          </Link>
          <Link to="/applications/new" className="btn-primary text-center">
            {config.labels?.createButton || 'Оформить бронирование'}
          </Link>
        </div>
      </div>
    </div>
  )
}
