// Вариант 2: Грузовозофф - система заказа грузоперевозок
export default {
  name: 'Variant2',
  title: 'Грузовозофф',
  description: 'Информационная система для заказа грузоперевозок автомобильным транспортом',
  theme: {
    primary: 'orange',
    logo: '🚚'
  },
  admin: {
    login: 'admin',
    password: 'gruzovik2024'
  },
  application: {
    type: 'cargo_delivery',
    fields: [
      {
        name: 'deliveryDate',
        label: 'Дата перевозки',
        type: 'date',
        required: true
      },
      {
        name: 'deliveryTime',
        label: 'Время перевозки',
        type: 'time',
        required: true
      },
      {
        name: 'cargoWeight',
        label: 'Вес груза (кг)',
        type: 'number',
        required: true,
        placeholder: 'Приблизительный вес в килограммах'
      },
      {
        name: 'cargoDimensions',
        label: 'Габариты груза',
        type: 'text',
        required: true,
        placeholder: 'Например: 2м x 1.5м x 1м'
      },
      {
        name: 'cargoType',
        label: 'Тип груза',
        type: 'select',
        required: true,
        options: [
          { value: 'fragile', label: 'Хрупкое' },
          { value: 'perishable', label: 'Скоропортящееся' },
          { value: 'refrigerated', label: 'Требуется рефрижератор' },
          { value: 'animals', label: 'Животные' },
          { value: 'liquid', label: 'Жидкость' },
          { value: 'furniture', label: 'Мебель' },
          { value: 'waste', label: 'Мусор' }
        ]
      },
      {
        name: 'pickupAddress',
        label: 'Адрес отправления',
        type: 'textarea',
        required: true,
        placeholder: 'Полный адрес забора груза'
      },
      {
        name: 'deliveryAddress',
        label: 'Адрес доставки',
        type: 'textarea',
        required: true,
        placeholder: 'Полный адрес доставки груза'
      }
    ],
    statuses: {
      new: { label: 'Новая', color: 'blue' },
      in_progress: { label: 'В работе', color: 'yellow' },
      completed: { label: 'Доставлено', color: 'green' },
      cancelled: { label: 'Отменена', color: 'red' }
    }
  },
  features: {
    reviews: true,
    reviewOnlyAfterComplete: true,
    deleteApplications: false,
    mobileDesign: true
  },
  labels: {
    applicationName: 'Заявка на перевозку',
    applicationNamePlural: 'Заявки на перевозку',
    createButton: 'Новая заявка',
    viewButton: 'Мои заявки'
  }
}
