import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-copper text-bone font-semibold hover:bg-copper-dark shadow-copper ' +
    'focus-visible:ring-2 focus-visible:ring-copper-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
  ghost:
    'bg-transparent text-bone border border-bone/25 font-medium hover:bg-bone/10 hover:border-bone/40 ' +
    'focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
  outline:
    'bg-transparent text-ink border border-ink/20 font-medium hover:border-copper hover:text-copper ' +
    'focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2',
}

const sizeClasses: Record<Size, string> = {
  md: 'py-2.5 px-5 text-sm rounded-full',
  lg: 'py-3.5 px-7 text-base rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 ease-editorial min-h-[44px]',
        'hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
