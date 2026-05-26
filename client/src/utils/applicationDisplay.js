export function getFieldLabel(config, fieldName) {
  const field = config.application.fields.find((f) => f.name === fieldName)
  return field?.label || fieldName
}

export function formatFieldValue(config, fieldName, value) {
  const field = config.application.fields.find((f) => f.name === fieldName)
  if (!field || value == null || value === '') return value

  if (field.type === 'select' || field.type === 'radio') {
    const option = field.options?.find((o) => o.value === value)
    return option?.label || value
  }

  return value
}

export function getStatusBadgeClass(color) {
  const colors = {
    blue: 'bg-banquet-peach text-banquet-red',
    yellow: 'bg-banquet-gold/20 text-banquet-gold',
    green: 'bg-banquet-green/15 text-banquet-green',
    red: 'bg-red-100 text-red-800',
  }
  return colors[color] || colors.blue
}
