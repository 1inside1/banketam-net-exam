import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useConfig } from '../contexts/ConfigContext'
import { applicationService } from '../services/applications'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import toast from 'react-hot-toast'
import clsx from 'clsx'

export default function Applications() {
  const { config } = useConfig()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const data = await applicationService.getAll()
      setApplications(data)
    } catch (error) {
      toast.error('Ошибка при загрузке заявок')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      try {
        await applicationService.delete(id)
        toast.success('Заявка удалена')
        loadApplications()
      } catch (error) {
        toast.error('Ошибка при удалении заявки')
      }
    }
  }

  const handleReview = async () => {
    try {
      await applicationService.update(selectedApp.id, { rating, review })
      toast.success('Отзыв добавлен')
      setShowReviewModal(false)
      setSelectedApp(null)
      setRating(5)
      setReview('')
      loadApplications()
    } catch (error) {
      toast.error('Ошибка при добавлении отзыва')
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {config.labels?.viewButton || 'Мои заявки'}
        </h1>
        <Link
          to="/applications/new"
          className="mt-3 sm:mt-0 inline-flex items-center btn-primary"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {config.labels?.createButton || 'Создать заявку'}
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Нет заявок</h3>
          <p className="mt-1 text-sm text-gray-500">Начните с создания новой заявки.</p>
          <div className="mt-6">
            <Link to="/applications/new" className="btn-primary">
              {config.labels?.createButton || 'Создать заявку'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
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
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(new Date(app.createdAt), 'd MMMM yyyy', { locale: ru })}
                          </p>
                        </div>
                      </div>
                      {/* Отображение данных заявки */}
                      <div className="mt-2 text-sm text-gray-700">
                        {Object.entries(app.data).slice(0, 3).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                      {/* Отзыв */}
                      {app.rating && (
                        <div className="mt-2 bg-gray-50 rounded p-2">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">Ваша оценка:</span>
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
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      {config.features.reviews && app.status !== 'new' && !app.rating && (
                        <button
                          onClick={() => {
                            setSelectedApp(app)
                            setShowReviewModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Оставить отзыв
                        </button>
                      )}
                      {config.features.deleteApplications && app.status === 'new' && (
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Модальное окно для отзыва */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-in">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Оставить отзыв
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Оценка
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={clsx(
                        'h-8 w-8 transition-colors',
                        value <= rating ? 'text-yellow-400' : 'text-gray-300'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                Комментарий
              </label>
              <textarea
                id="review"
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="input"
                placeholder="Поделитесь своими впечатлениями..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setSelectedApp(null)
                  setRating(5)
                  setReview('')
                }}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button
                onClick={handleReview}
                className="btn-primary"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
