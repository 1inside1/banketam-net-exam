// Вариант 1: Буквоежка - система обмена книгами
export default {
  name: 'Variant1',
  title: 'Буквоежка',
  description: 'Информационная система обмена книгами среди пользователей',
  theme: {
    primary: 'emerald',
    logo: '📚'
  },
  admin: {
    login: 'admin',
    password: 'bookworm'
  },
  application: {
    type: 'book_exchange',
    fields: [
      {
        name: 'author',
        label: 'Автор книги',
        type: 'text',
        required: true,
        placeholder: 'Введите автора книги'
      },
      {
        name: 'title',
        label: 'Название книги',
        type: 'text',
        required: true,
        placeholder: 'Введите название книги'
      },
      {
        name: 'exchangeType',
        label: 'Тип обмена',
        type: 'radio',
        required: true,
        options: [
          { value: 'share', label: 'Готов поделиться' },
          { value: 'want', label: 'Хочу в свою библиотеку' }
        ]
      },
      {
        name: 'publisher',
        label: 'Издательство',
        type: 'text',
        required: false,
        placeholder: 'Издательство (необязательно)'
      },
      {
        name: 'year',
        label: 'Год издания',
        type: 'number',
        required: false,
        placeholder: 'Год издания'
      },
      {
        name: 'binding',
        label: 'Переплет',
        type: 'select',
        required: false,
        options: [
          { value: '', label: 'Не указано' },
          { value: 'hard', label: 'Твердый' },
          { value: 'soft', label: 'Мягкий' }
        ]
      },
      {
        name: 'condition',
        label: 'Состояние книги',
        type: 'select',
        required: false,
        options: [
          { value: '', label: 'Не указано' },
          { value: 'excellent', label: 'Отличное' },
          { value: 'good', label: 'Хорошее' },
          { value: 'satisfactory', label: 'Удовлетворительное' }
        ]
      }
    ],
    statuses: {
      new: { label: 'Новая', color: 'blue' },
      in_progress: { label: 'Опубликована', color: 'green' },
      cancelled: { label: 'Отклонена', color: 'red' }
    },
    adminActions: {
      approve: { label: 'Опубликовать', status: 'in_progress' },
      reject: { label: 'Отклонить', status: 'cancelled', requireComment: true }
    }
  },
  features: {
    reviews: false,
    deleteApplications: true,
    archiveView: true,
    mobileDesign: true
  },
  labels: {
    applicationName: 'Карточка книги',
    applicationNamePlural: 'Карточки книг',
    createButton: 'Добавить карточку',
    viewButton: 'Мои карточки'
  }
}
