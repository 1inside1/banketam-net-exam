import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useConfig } from '../contexts/ConfigContext'

export default function Login() {
  const { login } = useAuth()
  const { config } = useConfig()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await login(data)
    setIsLoading(false)
    
    if (result.success) {
      if (result.user?.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-banquet-peach py-12 px-4 app-shell">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <span className="text-5xl">{config.theme.logo}</span>
          <h1 className="mt-4">{config.title}</h1>
          <p className="mt-2 text-sm text-banquet-green">Вход в систему</p>
        </div>
        
        <form className="mt-8 space-y-6 card" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="login" className="label">Логин</label>
              <input
                {...register('login', { required: 'Введите логин' })}
                type="text"
                className={`input ${errors.login ? 'input-error' : ''}`}
                placeholder="Введите логин"
              />
              {errors.login && (
                <p className="mt-1 text-sm text-banquet-red">{errors.login.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="label">Пароль</label>
              <input
                {...register('password', { required: 'Введите пароль' })}
                type="password"
                className={`input ${errors.password ? 'input-error' : ''}`}
                placeholder="Введите пароль"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-banquet-red">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full btn-primary">
            {isLoading ? 'Вход...' : 'Войти'}
          </button>

          <div className="text-center">
            <span className="text-sm text-banquet-green">
              Еще не зарегистрированы?{' '}
              <Link to="/register" className="font-medium text-banquet-red hover:underline">
                Регистрация
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
