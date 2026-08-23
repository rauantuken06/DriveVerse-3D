import { useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { GlassPanel } from '@/ui/GlassPanel'
import { cn } from '@/utils/cn'

const SUGGESTIONS = [
  'What requires my attention today?',
  'Why are sales below target?',
  "What's our biggest operational risk?",
  'What happens if supply capacity drops by 30%?',
]

/**
 * The visual shell of the AI Command Center (spec section 8). This is
 * intentionally just chrome + local input state for now — Phase 8
 * wires `onSubmit` to the response engine in `hooks/useAIResponder`,
 * and Phase 9 makes that engine write into `store/` to drive the 3D
 * scene. The layout/positioning is final; only the submit behavior
 * changes later.
 */
export function AICommandBar() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-6">
      {focused && (
        <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setValue(s)}
              className="rounded-full border border-glass-border bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-70 transition-colors hover:border-ink-70 hover:text-ink-100"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <GlassPanel
        variant="raised"
        className={cn(
          'pointer-events-auto w-full max-w-2xl rounded-full transition-shadow',
          focused && 'ring-1 ring-cyan/40',
        )}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // Phase 8: dispatch `value` to the AI responder here.
          }}
          className="flex items-center gap-3 px-5 py-3.5"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-cyan" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask PRISM anything about your company..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-100 placeholder:text-ink-30 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100 text-void transition-opacity disabled:opacity-20"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
      </GlassPanel>
    </div>
  )
}
