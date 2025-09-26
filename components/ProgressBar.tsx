interface ProgressBarProps {
  value: number
  max: number
  color: 'green' | 'red' | 'purple'
}

export function ProgressBar({ value, max, color }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colorClasses = {
    green: 'progress-best',
    red: 'progress-worst',
    purple: 'progress-sma'
  }

  return (
    <div className="progress-bar h-3 w-full">
      <div
        className={`progress-fill ${colorClasses[color]}`}
        style={{
          width: `${percentage}%`,
          '--progress-width': `${percentage}%`
        } as React.CSSProperties}
      />
    </div>
  )
}
