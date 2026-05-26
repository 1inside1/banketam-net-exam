import { useAuth } from '../contexts/AuthContext'
import { useConfig } from '../contexts/ConfigContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import PageLogo from '../components/PageLogo'
import ImageSlider from '../components/ImageSlider'
import QualityBlock from '../components/QualityBlock'
import ContactsBlock from '../components/ContactsBlock'

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
    <div className="space-y-5 animate-in">
      <div className="flex items-center gap-3">
        <PageLogo className="h-11 w-11" />
        <div>
          <h1 className="!text-[28px] leading-tight">
            Добро пожаловать, {user.fullName.split(' ')[0]}!
          </h1>
          <p className="text-secondary">{config.description}</p>
        </div>
      </div>

      <ImageSlider />

      {user.role === 'admin' && (
        <div className="card border-banquet-gold/50 bg-banquet-cream">
          <p className="text-sm text-banquet-green mb-3">
            Вы вошли как администратор.
          </p>
          <Link to="/admin/dashboard" className="btn-primary inline-flex">
            Панель админа
          </Link>
        </div>
      )}

      <div>
        <h2>Наши помещения</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {rooms.map((room, i) => (
            <div
              key={room.label}
              className="rounded-xl overflow-hidden border border-banquet-peach shadow-sm bg-white animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img src={room.img} alt={room.label} className="h-24 w-full object-cover" />
              <p className="text-center text-sm py-2.5 text-banquet-red font-medium">{room.label}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityBlock />

      <ContactsBlock />

      <div className="card">
        <h3>Профиль</h3>
        <p className="text-base mt-1">{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
        <p className="text-sm mt-2">{user.email}</p>
        <p className="text-secondary mt-1">
          Регистрация: {user.createdAt ? format(new Date(user.createdAt), 'd MMMM yyyy', { locale: ru }) : 'Сегодня'}
        </p>
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
