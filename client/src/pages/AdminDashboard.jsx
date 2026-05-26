import { useState, useEffect } from 'react'
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
    } catch (error) {
      toast.error('Ошибка при загрузке статистики')
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Всего заявок',
      value: stats?.totalApplications || 0,
      icon: (
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      name: 'Новые заявки',
      value: stats?.newApplications || 0,
      icon: (
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      name: 'Банкет назначен',
      value: stats?.assignedApplications || 0,
      icon: (
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-indigo-500'
    },
    {
      name: 'Завершено',
      value: stats?.completedApplications || 0,
      icon: (
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      name: 'Пользователей',
      value: stats?.totalUsers || 0,
      icon: (
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Панель администратора
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Общая статистика системы {config.title}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Информация о системе
          </h3>
          <div className="mt-5 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Название системы</h4>
              <p className="mt-1 text-sm text-gray-900">{config.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Описание</h4>
              <p className="mt-1 text-sm text-gray-900">{config.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Тип заявок</h4>
              <p className="mt-1 text-sm text-gray-900">{config.labels?.applicationNamePlural || 'Заявки'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Функции</h4>
              <ul className="mt-1 text-sm text-gray-900">
                {config.features.reviews && <li>✓ Система отзывов</li>}
                {config.features.deleteApplications && <li>✓ Удаление заявок пользователями</li>}
                {config.features.mobileDesign && <li>✓ Мобильная версия</li>}
                {config.features.archiveView && <li>✓ Просмотр архива</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
