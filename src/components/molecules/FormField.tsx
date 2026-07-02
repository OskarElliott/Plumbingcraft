import { cn } from '@/lib/utils'

type FieldType = 'text' | 'tel' | 'email' | 'textarea'

interface FormFieldProps {
  label: string
  id: string
  fieldType: FieldType
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: () => void
  placeholder?: string
  required?: boolean
  error?: string
}

export function FormField({
  label,
  id,
  fieldType,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  error,
}: FormFieldProps) {
  const base =
    'w-full rounded-lg bg-ink-900/60 border px-4 py-3 text-bone placeholder-muted/60 text-sm transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-blue/70 focus:border-blue min-h-[44px]'
  const borderState = error ? 'border-red-400/70' : 'border-line'

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-bone/85 mb-1.5">
        {label} {required && <span className="text-blue">*</span>}
      </label>

      {fieldType === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={4}
          className={cn(base, borderState, 'resize-none')}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          type={fieldType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(base, borderState)}
          aria-invalid={!!error}
        />
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
