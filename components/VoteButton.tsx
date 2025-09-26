import { Loader2 } from 'lucide-react'

interface VoteButtonProps {
  onClick: () => void
  disabled: boolean
  loading: boolean
  variant: 'success' | 'danger' | 'warning'
  children: React.ReactNode
}

export function VoteButton({ 
  onClick, 
  disabled, 
  loading, 
  variant, 
  children 
}: VoteButtonProps) {
  const variantClasses = {
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-purple-600 hover:bg-purple-700 text-white'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${loading ? 'cursor-wait' : ''}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Vote en cours...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
