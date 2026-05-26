// Универсальная конфигурация
export default {
  name: 'Universal',
  title: 'Универсальная система',
  description: 'Базовый шаблон для создания информационной системы',
  theme: {
    primary: 'blue',
    logo: '🚀'
  },
  admin: {
    login: 'admin',
    password: 'admin123'
  },
  application: {
    type: 'universal',
    fields: [
      {
        name: 'title',
        label: 'Название',
        type: 'text',
        required: true,
        placeholder: 'Введите название'
      },
      {
        name: 'description',
        label: 'Описание',
        type: 'textarea',
        required: true,
        placeholder: 'Введите описание'
      },
      {
        name: 'date',
        label: 'Дата',
        type: 'date',
        required: true
      },
      {
        name: 'type',
        label: 'Тип',
        type: 'select',
        required: true,
        options: [
          { value: 'type1', label: 'Тип 1' },
          { value: 'type2', label: 'Тип 2' },
          { value: 'type3', label: 'Тип 3' }
        ]
      }
    ],
    statuses: {
      new: { label: 'Новая', color: 'blue' },
      in_progress: { label: 'В работе', color: 'yellow' },
      completed: { label: 'Завершена', color: 'green' },
      cancelled: { label: 'Отменена', color: 'red' }
    }
  },
  features: {
    reviews: true,
    reviewOnlyAfterComplete: true,
    deleteApplications: true,
    mobileDesign: true
  }
}
