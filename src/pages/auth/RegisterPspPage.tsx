import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PATHS } from '@/app/router/paths'
import { PSP_CATEGORIES } from '@/features/search'
import { cn } from '@/shared/lib/cn'

const WEEKDAYS = [
  { label: 'Mon', value: 'monday' },
  { label: 'Tue', value: 'tuesday' },
  { label: 'Wed', value: 'wednesday' },
  { label: 'Thu', value: 'thursday' },
  { label: 'Fri', value: 'friday' },
  { label: 'Sat', value: 'saturday' },
  { label: 'Sun', value: 'sunday' },
] as const

const textareaClass =
  'rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  location: string
  address: string
  zip: string
  category: string
  contractorLicense: string
  insuranceProvider: string
  insurancePolicyNumber: string
  insuranceInfo: string
  availability: string[]
  identificationDoc: File | null
  contractorLicenseDoc: File | null
  insuranceDoc: File | null
}

const INITIAL: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  location: '',
  address: '',
  zip: '',
  category: '',
  contractorLicense: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  insuranceInfo: '',
  availability: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  identificationDoc: null,
  contractorLicenseDoc: null,
  insuranceDoc: null,
}

const STEPS = [
  { id: 'name', title: 'Your name', hint: 'Enter your first and last name.' },
  { id: 'email', title: 'Email', hint: 'We’ll use this to sign you in and send updates.' },
  { id: 'phone', title: 'Phone number', hint: 'Best number to reach you for referrals.' },
  { id: 'password', title: 'Password', hint: 'Choose a secure password for your account.' },
  { id: 'location', title: 'Location', hint: 'City and state where you primarily work.' },
  { id: 'address', title: 'Address', hint: 'Street address for verification.' },
  { id: 'id', title: 'Identification', hint: 'Upload a government-issued ID.' },
  { id: 'license', title: 'Contractor license', hint: 'License number and optional document.' },
  { id: 'insurance', title: 'Insurance info', hint: 'Provider, policy, and coverage details.' },
  { id: 'availability', title: 'Availability', hint: 'Which days are you typically available?' },
  { id: 'review', title: 'Confirm registration', hint: 'Review your details, then create your account.' },
] as const

export function RegisterPspPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [error, setError] = useState('')
  const [registeredAt] = useState(() => new Date())

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const progress = ((step + 1) / STEPS.length) * 100

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setError('')
  }

  function toggleDay(day: string) {
    setData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
    setError('')
  }

  function validateStep(): boolean {
    switch (STEPS[step].id) {
      case 'name':
        if (!data.firstName.trim() || !data.lastName.trim()) {
          setError('Enter both first and last name.')
          return false
        }
        break
      case 'email':
        if (!data.email.trim() || !data.email.includes('@')) {
          setError('Enter a valid email address.')
          return false
        }
        break
      case 'phone':
        if (!data.phone.trim()) {
          setError('Enter your phone number.')
          return false
        }
        break
      case 'password':
        if (data.password.length < 8) {
          setError('Password must be at least 8 characters.')
          return false
        }
        break
      case 'location':
        if (!data.location.trim()) {
          setError('Enter your location.')
          return false
        }
        break
      case 'address':
        if (!data.address.trim() || !data.zip.trim()) {
          setError('Enter your address and ZIP code.')
          return false
        }
        break
      case 'id':
        if (!data.identificationDoc) {
          setError('Upload an identification document.')
          return false
        }
        break
      case 'license':
        if (!data.category || !data.contractorLicense.trim()) {
          setError('Select a category and enter your license number.')
          return false
        }
        break
      case 'insurance':
        if (
          !data.insuranceProvider.trim() ||
          !data.insurancePolicyNumber.trim() ||
          !data.insuranceInfo.trim()
        ) {
          setError('Complete all insurance fields.')
          return false
        }
        break
      case 'availability':
        if (data.availability.length === 0) {
          setError('Select at least one day.')
          return false
        }
        break
      default:
        break
    }
    setError('')
    return true
  }

  function goNext() {
    if (!validateStep()) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  // TEMP: remove before launch — skip validation for local testing
  function skipStep() {
    setError('')
    if (isLast) {
      navigate(PATHS.home)
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLast) {
      goNext()
      return
    }
    if (!validateStep()) return
    // UI-only — wire to registration API when backend is ready.
    navigate(PATHS.home)
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Step {step + 1} of {STEPS.length}
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink">{current.title}</h1>
        <p className="mt-1 text-sm text-muted">{current.hint}</p>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden>
        <div
          className="h-full rounded-full bg-brand transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {current.id === 'name' && (
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="First name"
              name="firstName"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              autoFocus
            />
            <Input
              label="Last name"
              name="lastName"
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </div>
        )}

        {current.id === 'email' && (
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoFocus
          />
        )}

        {current.id === 'phone' && (
          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoFocus
          />
        )}

        {current.id === 'password' && (
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => update('password', e.target.value)}
            autoComplete="new-password"
            autoFocus
          />
        )}

        {current.id === 'location' && (
          <Input
            label="Location"
            name="location"
            placeholder="City, state (e.g. Fresno, CA)"
            value={data.location}
            onChange={(e) => update('location', e.target.value)}
            autoFocus
          />
        )}

        {current.id === 'address' && (
          <div className="space-y-3">
            <label className="flex w-full flex-col gap-1.5 text-sm">
              <span className="font-medium text-ink-soft">Street address</span>
              <textarea
                name="address"
                rows={2}
                className={textareaClass}
                placeholder="Street address, suite / unit"
                value={data.address}
                onChange={(e) => update('address', e.target.value)}
                autoFocus
              />
            </label>
            <Input
              label="ZIP code"
              name="zip"
              placeholder="93728"
              value={data.zip}
              onChange={(e) => update('zip', e.target.value)}
            />
          </div>
        )}

        {current.id === 'id' && (
          <DocumentUploadField
            label="ID document"
            name="identificationDoc"
            file={data.identificationDoc}
            onChange={(file) => update('identificationDoc', file)}
          />
        )}

        {current.id === 'license' && (
          <div className="space-y-3">
            <Select
              label="Primary category"
              name="category"
              placeholder="Select"
              options={PSP_CATEGORIES}
              value={data.category}
              onChange={(e) => update('category', e.target.value)}
            />
            <Input
              label="Contractor license number"
              name="contractorLicense"
              placeholder="License #"
              value={data.contractorLicense}
              onChange={(e) => update('contractorLicense', e.target.value)}
            />
            <DocumentUploadField
              label="License document (optional)"
              name="contractorLicenseDoc"
              file={data.contractorLicenseDoc}
              onChange={(file) => update('contractorLicenseDoc', file)}
            />
          </div>
        )}

        {current.id === 'insurance' && (
          <div className="space-y-3">
            <Input
              label="Insurance provider"
              name="insuranceProvider"
              placeholder="Carrier / company name"
              value={data.insuranceProvider}
              onChange={(e) => update('insuranceProvider', e.target.value)}
              autoFocus
            />
            <Input
              label="Policy number"
              name="insurancePolicyNumber"
              placeholder="Policy #"
              value={data.insurancePolicyNumber}
              onChange={(e) => update('insurancePolicyNumber', e.target.value)}
            />
            <label className="flex w-full flex-col gap-1.5 text-sm">
              <span className="font-medium text-ink-soft">Coverage notes</span>
              <textarea
                name="insuranceInfo"
                rows={3}
                className={textareaClass}
                placeholder="Liability limits, expiration, certificate details…"
                value={data.insuranceInfo}
                onChange={(e) => update('insuranceInfo', e.target.value)}
              />
            </label>
            <DocumentUploadField
              label="Insurance certificate (optional)"
              name="insuranceDoc"
              file={data.insuranceDoc}
              onChange={(file) => update('insuranceDoc', file)}
            />
          </div>
        )}

        {current.id === 'availability' && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {WEEKDAYS.map((day) => {
              const selected = data.availability.includes(day.value)
              return (
                <button
                  key={day.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleDay(day.value)}
                  className={cn(
                    'rounded-xl border px-2 py-2.5 text-center text-sm font-semibold transition',
                    selected
                      ? 'border-brand bg-brand text-white'
                      : 'border-line bg-paper text-ink-soft hover:border-brand/50',
                  )}
                >
                  {day.label}
                </button>
              )
            })}
          </div>
        )}

        {current.id === 'review' && (
          <div className="space-y-3 rounded-xl border border-line bg-mist/60 p-4 text-sm">
            <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
            <ReviewRow label="Email" value={data.email} />
            <ReviewRow label="Phone" value={data.phone} />
            <ReviewRow label="Location" value={data.location} />
            <ReviewRow label="Address" value={`${data.address}, ${data.zip}`} />
            <ReviewRow label="Category" value={data.category || '—'} />
            <ReviewRow label="License" value={data.contractorLicense} />
            <ReviewRow
              label="Insurance"
              value={`${data.insuranceProvider} · ${data.insurancePolicyNumber}`}
            />
            <ReviewRow
              label="Availability"
              value={data.availability
                .map((d) => WEEKDAYS.find((w) => w.value === d)?.label ?? d)
                .join(', ')}
            />
            <ReviewRow
              label="Registered at"
              value={registeredAt.toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            />
            <div className="space-y-3 border-t border-line/70 pt-3">
              <p className="text-muted">Documents</p>
              <DocumentPreview file={data.identificationDoc} label="ID document" compact />
              {data.contractorLicenseDoc ? (
                <DocumentPreview file={data.contractorLicenseDoc} label="License document" compact />
              ) : null}
              {data.insuranceDoc ? (
                <DocumentPreview file={data.insuranceDoc} label="Insurance certificate" compact />
              ) : null}
            </div>
            <input type="hidden" name="registeredAtIso" value={registeredAt.toISOString()} />
          </div>
        )}

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <div className="flex flex-wrap gap-2 pt-1">
          {step > 0 ? (
            <Button type="button" variant="outline" className="flex-1" size="lg" onClick={goBack}>
              Back
            </Button>
          ) : null}
          <Button type="submit" className="flex-1" size="lg">
            {isLast ? 'Create account' : 'Continue'}
          </Button>
          {/* TEMP: remove before launch */}
          <Button type="button" variant="ghost" className="w-full" size="sm" onClick={skipStep}>
            Skip (testing)
          </Button>
        </div>
      </form>

      {step === 0 ? (
        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to={PATHS.signIn} className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </p>
      ) : null}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line/70 pb-2 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-4">
      <span className="shrink-0 text-muted">{label}</span>
      <span className="font-medium text-ink sm:text-right">{value}</span>
    </div>
  )
}

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return url
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function DocumentPreview({
  file,
  label,
  compact = false,
  onRemove,
}: {
  file: File | null
  label?: string
  compact?: boolean
  onRemove?: () => void
}) {
  const url = useObjectUrl(file)
  if (!file || !url) return null

  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-line bg-paper',
        compact && 'border-line/80',
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div className="min-w-0">
          {label ? <p className="text-xs text-muted">{label}</p> : null}
          <p className="truncate text-sm font-medium text-ink">{file.name}</p>
          <p className="text-xs text-muted">{formatFileSize(file.size)}</p>
        </div>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-ink"
            aria-label="Remove document"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {isImage ? (
        <div className={cn('bg-mist/50 p-2', compact ? 'max-h-40' : 'max-h-72')}>
          <img
            src={url}
            alt={`Preview of ${file.name}`}
            className={cn(
              'mx-auto w-full rounded-lg object-contain',
              compact ? 'max-h-36' : 'max-h-64',
            )}
          />
        </div>
      ) : isPdf ? (
        <iframe
          title={`Preview of ${file.name}`}
          src={url}
          className={cn('w-full bg-mist', compact ? 'h-40' : 'h-64')}
        />
      ) : (
        <div className="flex items-center gap-3 px-3 py-4 text-sm text-muted">
          <FileText className="h-8 w-8 shrink-0 text-brand" />
          <span>Preview not available for this file type.</span>
        </div>
      )}
    </div>
  )
}

function DocumentUploadField({
  label,
  name,
  file,
  onChange,
}: {
  label: string
  name: string
  file: File | null
  onChange: (file: File | null) => void
}) {
  return (
    <div className="space-y-3">
      <label className="flex w-full flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink-soft">{label}</span>
        <input
          key={file ? file.name + file.lastModified : 'empty'}
          type="file"
          name={name}
          accept="image/*,.pdf"
          className="block w-full cursor-pointer rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-dark hover:border-brand/50"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      {file ? (
        <DocumentPreview file={file} onRemove={() => onChange(null)} />
      ) : null}
    </div>
  )
}
