import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: number
  text?: string
  className?: string
}

export function LoadingSpinner({ size = 24, text = "Loading...", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className="w-[1em] h-[1em] animate-spin text-gold" style={{ fontSize: `${size}px` }} />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
