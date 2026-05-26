import { useState, useEffect } from 'react'
import { useConfig } from '../contexts/ConfigContext'
import { applicationService } from '../services/applications'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import toast from 'react-hot-toast'
import clsx from 'clsx'

export default function AdminApplications() {
  const { config } = useConfig()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [adminComment, setAdminComment] = useState('')

  useEffect(() => {
    loadApplications()
  }, [page, statusFilter, searchQuery])

  const loadApplications = async () => {
    try {
      const params = {
        page,
        limit: 10,
        ...(statusFilter && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      }
      const data = await applicationService.getAllAdmin(params)
      setApplications(data.applications)
      setTotalPages(data.pages)
    } catch (error) {
      toast.error('Ошибка при загрузке заявок')
    }
    setLoading(false)
  }

  const handleStatusUpdate = async () => {
    try {
      await applicationService.updateStatus(selectedApp.id, {
        status: newStatus,
        adminComment
      })
      toast.success('Статус обновлен')
      setShowStatusModal(false)
      setSelectedApp(null)
      setNewStatus('')
      setAdminComment('')
      loadApplications()
    } catch (error) {
      toast.error('Ошибка при обновлении статуса')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      try {
        await applicationService.deleteAdmin(id)
        toast.success('Заявка удалена')
        loadApplications()
      } catch (error) {
        toast.error('Ошибка при удалении заявки')
      }
    }
  }

  const getStatusColor = (status) => {
    const statusConfig = config.application.statuses[status]
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    }
    return colors[statusConfig?.color] || colors.blue
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Управление заявками
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Все заявки пользователей системы
        </p>
      </div>

      {/* Фильтры */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Статус
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              className="mt-1 input"
            >
              <option value="">Все статусы</option>
              {Object.entries(config.application.statuses).map(([value, status]) => (
                <option key={value} value={value}>{status.label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Поиск
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              className="mt-1 input"
              placeholder="Поиск по ФИО, email или телефону..."
            />
          </div>
        </div>
      </div>

      {/* Таблица заявок */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Заявки не найдены</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-primary-600 truncate">
                          {config.labels?.applicationName || 'Заявка'} #{app.id}
                        </p>
                        <div className="ml-2 flex-shrink-0">
                          <span className={clsx(
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                            getStatusColor(app.status)
                          )}>
                            {config.application.statuses[app.status]?.label}
                          </span>
                        </div>
                      </div>
                      
                      {/* Информация о пользователе */}
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {app.user.fullName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {app.user.email}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {app.user.phone}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {format(new Date(app.createdAt), 'd MMMM yyyy, HH:mm', { locale: ru })}
                        </div>
                      </div>
                      
                      {/* Данные заявки */}
                      <div className="mt-4 bg-gray-50 rounded-md p-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Данные заявки:</h4>
                        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
                          {Object.entries(app.data).map(([key, value]) => {
                            const field = config.application.fields.find(f => f.name === key)
                            return (
                              <div key={key}>
                                <dt className="font-medium text-gray-500">{field?.label || key}:</dt>
                                <dd className="text-gray-900">{value}</dd>
                              </div>
                            )
                          })}
                        </dl>
                      </div>
                      
                      {/* Комментарий администратора */}
                      {app.adminComment && (
                        <div className="mt-3 bg-yellow-50 rounded-md p-3">
                          <p className="text-sm">
                            <span className="font-medium text-gray-900">Комментарий администратора:</span>
                            <br />
                            {app.adminComment}
                          </p>
                        </div>
                      )}
                      
                      {/* Отзыв пользователя */}
                      {app.rating && (
                        <div className="mt-3 bg-green-50 rounded-md p-3">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">Оценка пользователя:</span>
                            <div className="ml-2 flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={clsx(
                                    'h-4 w-4',
                                    i < app.rating ? 'text-yellow-400' : 'text-gray-300'
                                  )}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          {app.review && (
                            <p className="mt-1 text-sm text-gray-600">{app.review}</p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Действия */}
                    <div className="ml-5 flex-shrink-0 flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          setSelectedApp(app)
                          setNewStatus(app.status)
                          setShowStatusModal(true)
                        }}
                        className="text-sm text-primary-600 hover:text-primary-900"
                      >
                        Изменить статус
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-sm text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn-secondary"
            >
              Назад
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="ml-3 btn-secondary"
            >
              Вперед
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Страница <span className="font-medium">{page}</span> из{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={clsx(
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === i + 1
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для изменения статуса */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-in">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Изменить статус заявки
            </h3>
            
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Новый статус
              </label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="input"
              >
                {Object.entries(config.application.statuses).map(([value, status]) => (
                  <option key={value} value={value}>{status.label}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Комментарий администратора
              </label>
              <textarea
                id="comment"
                rows={4}
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                className="input"
                placeholder="Введите комментарий..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowStatusModal(false)
                  setSelectedApp(null)
                  setNewStatus('')
                  setAdminComment('')
                }}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button
                onClick={handleStatusUpdate}
                className="btn-primary"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
