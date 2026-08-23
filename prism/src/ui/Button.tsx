import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

// Framer Motion's event props (onAnimationStart/onDrag*) collide with
// the native DOM ones on ButtonHTMLAttributes — drop the native
// versions since motion.button's are what actually fire here.
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-ink-100 text-void hover:bg-white shadow-[0_0_0_1px_rgb(255,255,255,0.1)]',
  outline:
    'border border-glass-border text-ink-100 hover:border-ink-70 hover:bg-white/5',
  ghost: 'text-ink-70 hover:text-ink-100 hover:bg-white/5',
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3.5 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
}

/** Every clickable action in PRISM (ENTER PRISM, CEO MODE, SIMULATE,
 * RUN SIMULATION, APPLY RECOMMENDATION) goes through this — one place
 * to keep letter-spacing/weight/motion consistent. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'outline', size = 'md', ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={cn(
        'rounded-full font-medium tracking-wide uppercase transition-colors duration-200',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  )
})
