import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useConfig } from '../contexts/ConfigContext'
import { applicationService } from '../services/applications'
import toast from 'react-hot-toast'

export default function ApplicationForm() {
  const { config } = useConfig()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await applicationService.create({
        type: config.application.type,
        data
      })
      toast.success('Заявка успешно создана!')
      navigate('/applications')
    } catch (error) {
      toast.error('Ошибка при создании заявки')
    }
    setIsLoading(false)
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <input
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              type="text"
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'number':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <input
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              type="number"
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <textarea
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              rows={3}
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'dateText':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <input
              {...register(field.name, {
                ...(field.required ? { required: `${field.label} обязательно` } : {}),
                ...(field.validation?.pattern ? {
                  pattern: {
                    value: field.validation.pattern,
                    message: field.validation.message || 'Неверный формат'
                  }
                } : {})
              })}
              type="text"
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
              placeholder={field.placeholder || 'ДД.ММ.ГГГГ'}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-banquet-red">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'date':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <input
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              type="date"
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'time':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <input
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              type="time"
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'select':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>
            <select
              {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
              className={`input ${errors[field.name] ? 'input-error' : ''}`}
            >
              <option value="">Выберите...</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      case 'radio':
        return (
          <div key={field.name}>
            <label className="label">{field.label}</label>
            <div className="space-y-2">
              {field.options.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    {...register(field.name, field.required ? { required: `${field.label} обязательно` } : {})}
                    type="radio"
                    value={option.value}
                    className="mr-2 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name].message}</p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-in">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {config.labels?.createButton || 'Новая заявка'}
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Заполните все обязательные поля для создания заявки.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            {config.application.fields.map(field => renderField(field))}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/applications')}
                className="btn-secondary"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
