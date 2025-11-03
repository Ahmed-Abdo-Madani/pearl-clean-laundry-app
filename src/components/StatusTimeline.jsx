const StatusTimeline = ({ currentStatus }) => {
  const statusFlow = [
    { 
      key: 'scheduled', 
      label: 'Scheduled', 
      icon: '📅',
      description: 'Order placed'
    },
    { 
      key: 'picked-up', 
      label: 'Picked Up', 
      icon: '🚗',
      description: 'Items collected'
    },
    { 
      key: 'in-progress', 
      label: 'In Progress', 
      icon: '🧺',
      description: 'Being processed'
    },
    { 
      key: 'ready', 
      label: 'Ready', 
      icon: '✅',
      description: 'Ready for delivery'
    },
    { 
      key: 'delivered', 
      label: 'Delivered', 
      icon: '🏠',
      description: 'Order completed'
    }
  ]

  const getStatusIndex = (status) => {
    return statusFlow.findIndex(step => step.key === status)
  }

  const currentIndex = getStatusIndex(currentStatus)

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'upcoming'
  }

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-primary text-white border-primary',
          line: 'bg-primary',
          text: 'text-primary font-medium'
        }
      case 'current':
        return {
          circle: 'bg-primary text-white border-primary animate-pulse ring-4 ring-primary/20',
          line: 'bg-neutral-300',
          text: 'text-primary font-semibold'
        }
      case 'upcoming':
        return {
          circle: 'bg-neutral-100 text-neutral-400 border-neutral-300',
          line: 'bg-neutral-300',
          text: 'text-neutral-400'
        }
      default:
        return {
          circle: 'bg-neutral-100 text-neutral-400 border-neutral-300',
          line: 'bg-neutral-300',
          text: 'text-neutral-400'
        }
    }
  }

  return (
    <div className="w-full">
      {/* Desktop Timeline - Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {statusFlow.map((step, index) => {
            const status = getStepStatus(index)
            const classes = getStepClasses(status)
            const isLast = index === statusFlow.length - 1

            return (
              <div key={step.key} className="flex flex-col items-center relative flex-1">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-6 left-1/2 w-full h-0.5 z-0">
                    {/* Base line */}
                    <div className="h-full bg-neutral-300 transition-colors duration-500"></div>
                    {/* Progress overlay */}
                    <div 
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        index < currentIndex ? 'bg-primary w-full' : 'bg-primary w-0'
                      }`}
                    ></div>
                  </div>
                )}

                {/* Status Circle */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center 
                  text-lg transition-all duration-500 ${classes.circle}
                `}>
                  {step.icon}
                </div>

                {/* Status Label */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium transition-colors duration-300 ${classes.text}`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="md:hidden">
        <div className="space-y-6">
          {statusFlow.map((step, index) => {
            const status = getStepStatus(index)
            const classes = getStepClasses(status)
            const isLast = index === statusFlow.length - 1

            return (
              <div key={step.key} className="flex items-start relative">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-6 top-12 w-0.5 h-6 z-0">
                    {/* Base line */}
                    <div className="w-full h-full bg-neutral-300 transition-colors duration-500"></div>
                    {/* Progress overlay */}
                    <div 
                      className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                        index < currentIndex ? 'bg-primary h-full' : 'bg-primary h-0'
                      }`}
                    ></div>
                  </div>
                )}

                {/* Status Circle */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center 
                  text-lg transition-all duration-500 ${classes.circle}
                `}>
                  {step.icon}
                </div>

                {/* Status Content */}
                <div className="ml-4 flex-1">
                  <div className={`text-base font-medium transition-colors duration-300 ${classes.text}`}>
                    {step.label}
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StatusTimeline