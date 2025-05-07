import React from 'react'

type ButtonVariant = 'digit' | 'operator' | 'equals' | 'clear' | 'delete'

interface ButtonProps {
  value: string
  variant?: ButtonVariant
  onClick: () => void
  className?: string
  ariaLabel?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  digit: 'bg-purple-400 text-white hover:bg-purple-500',
  operator: 'bg-orange-400 text-white hover:bg-orange-500',
  equals: 'bg-green-600 text-white hover:bg-green-500',
  clear: 'bg-red-600 text-white hover:bg-red-700',
  delete: 'bg-purple-600 text-white hover:bg-purple-700'
}

const Button: React.FC<ButtonProps> = React.memo(({
  value,
  variant = 'digit',
  onClick,
  className = '',
  ariaLabel
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-xl font-medium rounded-lg transition-colors 
        duration-200 focus:outline-none focus:ring-0 focus:shadow-none 
        active:outline-none active:shadow-none ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel || value}
    >
      {value}
    </button>
  )
})

export default Button