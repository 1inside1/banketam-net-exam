// Вариант 3: Корочки.есть - система записи на онлайн курсы
export default {
  name: 'Variant3',
  title: 'Корочки.есть',
  description: 'Информационная система для записи на онлайн курсы дополнительного профессионального образования',
  theme: {
    primary: 'indigo',
    logo: '🎓'
  },
  admin: {
    login: 'admin',
    password: 'education'
  },
  application: {
    type: 'course_enrollment',
    fields: [
      {
        name: 'courseName',
        label: 'Наименование курса',
        type: 'select',
        required: true,
        options: [
          { value: 'algorithms', label: 'Основы алгоритмизации и программирования' },
          { value: 'webdesign', label: 'Основы веб-дизайна' },
          { value: 'databases', label: 'Основы проектирования баз данных' }
        ]
      },
      {
        name: 'startDate',
        label: 'Желаемая дата начала обучения',
        type: 'date',
        required: true,
        validation: {
          pattern: /^\d{2}\.\d{2}\.\d{4}$/,
          message: 'Формат: ДД.ММ.ГГГГ'
        }
      },
      {
        name: 'paymentMethod',
        label: 'Способ оплаты',
        type: 'radio',
        required: true,
        options: [
          { value: 'cash', label: 'Наличными' },
          { value: 'transfer', label: 'Переводом на банковский счет' }
        ]
      }
    ],
    statuses: {
      new: { label: 'Новая', color: 'blue' },
      in_progress: { label: 'Идет обучение', color: 'yellow' },
      completed: { label: 'Обучение завершено', color: 'green' },
      cancelled: { label: 'Отменена', color: 'red' }
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
    applicationName: 'Заявка на курс',
    applicationNamePlural: 'Заявки на курсы',
    createButton: 'Записаться на курс',
    viewButton: 'Мои курсы'
  }
}
