import { createContext, useContext, useState, useEffect } from 'react'

const ConfigContext = createContext({})

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider')
  }
  return context
}

// Динамически загружаем конфигурацию варианта
const loadVariantConfig = async () => {
  try {
    // Сначала пытаемся загрузить текущий вариант из localStorage
    const savedVariant = localStorage.getItem('currentVariant') || 'banketam'
    const module = await import(`../variants/${savedVariant}.js`)
    return module.default
  } catch (error) {
    console.error('Error loading variant config:', error)
    // Загружаем универсальный вариант по умолчанию
    const module = await import('../variants/universal.js')
    return module.default
  }
}

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVariantConfig().then(cfg => {
      setConfig(cfg)
      setLoading(false)
    })
  }, [])

  const switchVariant = async (variantName) => {
    setLoading(true)
    localStorage.setItem('currentVariant', variantName)
    const module = await import(`../variants/${variantName}.js`)
    setConfig(module.default)
    setLoading(false)
    // Перезагружаем страницу для применения новой конфигурации
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <ConfigContext.Provider value={{ config, switchVariant }}>
      {children}
    </ConfigContext.Provider>
  )
}
