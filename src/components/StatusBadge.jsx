import { useTranslation } from 'react-i18next'

const StatusBadge = ({ status, size = 'medium' }) => {
  const { t } = useTranslation()
  
  const statusConfig = {
    'scheduled': {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      label: t('status.scheduled')
    },
    'picked-up': {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      label: t('status.pickedUp')
    },
    'in-progress': {
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      label: t('status.inProgress')
    },
    'ready': {
      color: 'bg-green-100 text-green-800 border-green-200',
      label: t('status.ready')
    },
    'delivered': {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      label: t('status.delivered')
    }
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  }

  const config = statusConfig[status] || statusConfig['scheduled']
  const sizeClass = sizeClasses[size] || sizeClasses['medium']

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${config.color} ${sizeClass}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge