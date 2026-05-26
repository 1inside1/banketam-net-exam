import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useConfig } from '../contexts/ConfigContext'
import { applicationService } from '../services/applications'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { config } = useConfig()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await applicationService.getStats()
      setStats(data)
    } catch {
      toast.error('Ошибка при загрузке статистики')
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-banquet-red"></div>
      </div>
    )
  }

  const statCards = [
    { name: 'Всего заявок', value: stats?.totalApplications || 0 },
    { name: 'Новые', value: stats?.newApplications || 0 },
    { name: 'Банкет назначен', value: stats?.assignedApplications || 0 },
    { name: 'Завершено', value: stats?.completedApplications || 0 },
    { name: 'Пользователей', value: stats?.totalUsers || 0 },
  ]

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="!text-[28px]">Панель администратора</h1>
        <p className="text-secondary">{config.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {statCards.map((stat) => (
          <div key={stat.name} className="card !p-4">
            <p className="text-secondary">{stat.name}</p>
            <p className="text-3xl font-bold mt-1 text-banquet-red">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Управление</h3>
        <Link to="/admin/applications" className="btn-primary inline-flex mt-3">
          Все заявки
        </Link>
      </div>

      <div className="card">
        <h3>О системе</h3>
        <p className="text-sm mt-2">{config.description}</p>
        <ul className="mt-3 space-y-1 text-secondary">
          <li>Фильтры и поиск заявок</li>
          <li>Сортировка и постраничная навигация</li>
          <li>Изменение статуса через всплывающее окно</li>
        </ul>
      </div>
    </div>
  )
}
