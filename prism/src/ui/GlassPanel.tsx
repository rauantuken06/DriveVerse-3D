import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** 'default' for docked panels, 'raised' for floating/elevated cards
   * (tooltips, modals) that need to read clearly over the 3D scene. */
  variant?: 'default' | 'raised'
}

/**
 * The one visual surface every floating panel in PRISM is built from —
 * the Intelligence panel, department tooltips, the AI command bar, CEO
 * Mode cards. Keeping it a single component is what keeps the glass
 * language consistent across the whole app.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  function GlassPanel({ className, variant = 'default', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-panel rounded-2xl',
          variant === 'raised' && 'shadow-[0_24px_60px_-16px_rgb(0,0,0,0.6)]',
          className,
        )}
        {...props}
      />
    )
  },
)
