// Вариант 4: Я буду кушац - система бронирования столиков
export default {
  name: 'Variant4',
  title: 'Я буду кушац',
  description: 'Веб-приложение для бронирования столиков в ресторане',
  theme: {
    primary: 'rose',
    logo: '🍽️'
  },
  admin: {
    login: 'admin',
    password: 'restaurant'
  },
  application: {
    type: 'table_booking',
    fields: [
      {
        name: 'bookingDate',
        label: 'Дата бронирования',
        type: 'date',
        required: true,
        useCalendar: true
      },
      {
        name: 'bookingTime',
        label: 'Время бронирования',
        type: 'time',
        required: true,
        placeholder: 'ЧЧ:ММ'
      },
      {
        name: 'guestCount',
        label: 'Количество гостей',
        type: 'select',
        required: true,
        options: Array.from({length: 10}, (_, i) => ({
          value: i + 1,
          label: `${i + 1} ${i === 0 ? 'гость' : i < 4 ? 'гостя' : 'гостей'}`
        }))
      },
      {
        name: 'contactPhone',
        label: 'Контактный телефон',
        type: 'text',
        required: true,
        placeholder: '+7(XXX)-XXX-XX-XX',
        validation: {
          pattern: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
        }
      }
    ],
    statuses: {
      new: { label: 'Новое', color: 'blue' },
      in_progress: { label: 'Подтверждено', color: 'yellow' },
      completed: { label: 'Посещение состоялось', color: 'green' },
      cancelled: { label: 'Отменено', color: 'red' }
    }
  },
  features: {
    reviews: true,
    reviewOnlyAfterComplete: true,
    deleteApplications: false,
    mobileDesign: true,
    adminFeatures: ['filter', 'pagination', 'popups']
  },
  labels: {
    applicationName: 'Бронирование',
    applicationNamePlural: 'Бронирования',
    createButton: 'Забронировать столик',
    viewButton: 'Мои бронирования'
  }
}
