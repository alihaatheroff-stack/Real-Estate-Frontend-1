import { Link, useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { setAuthenticated } from '@/features/auth/session'
import type { FieldErrorKey } from '@/features/auth/model/registerPsp'
import { FormSection } from './registerUi'

export function AccountCredentialsBlock({
  step = 7,
  email,
  password,
  confirmPassword,
  acceptedPrivacyPolicy,
  acceptedTermsOfService,
  fieldErrors,
  error,
  homeHref,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAcceptedPrivacyPolicyChange,
  onAcceptedTermsOfServiceChange,
  setFieldErrors,
  setError,
}: {
  step?: number
  email: string
  password: string
  confirmPassword: string
  acceptedPrivacyPolicy: boolean
  acceptedTermsOfService: boolean
  fieldErrors: Partial<Record<FieldErrorKey, boolean>>
  error: string
  homeHref: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onAcceptedPrivacyPolicyChange: (value: boolean) => void
  onAcceptedTermsOfServiceChange: (value: boolean) => void
  setFieldErrors: Dispatch<SetStateAction<Partial<Record<FieldErrorKey, boolean>>>>
  setError: (value: string) => void
}) {
  const navigate = useNavigate()

  return (
    <>
      <FormSection title="Set up log in credentials" step={step}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              showQaMark
              label="Email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Input
              showQaMark
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              autoComplete="new-password"
              required
            />
            {password.length > 0 && password.length < 8 ? (
              <p className="text-xs text-danger">Must be at least 8 characters.</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Input
              showQaMark
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              autoComplete="new-password"
              required
            />
            {confirmPassword.length > 0 && password !== confirmPassword ? (
              <p className="text-xs text-danger">Passwords do not match.</p>
            ) : null}
          </div>
        </div>
      </FormSection>

      {error ? (
        <div
          className="rounded-xl border border-danger/25 bg-danger/5 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-line pt-6">
        <label
          className={`flex cursor-pointer items-start gap-3 text-sm leading-relaxed ${fieldErrors.acceptedPrivacyPolicy ? 'text-danger' : 'text-ink-soft'
            }`}
        >
          <input
            type="checkbox"
            name="acceptedPrivacyPolicy"
            checked={acceptedPrivacyPolicy}
            onChange={(e) => {
              onAcceptedPrivacyPolicyChange(e.target.checked)
              if (e.target.checked) {
                setFieldErrors((prev) => {
                  const next = { ...prev }
                  delete next.acceptedPrivacyPolicy
                  return next
                })
                setError('')
              }
            }}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand focus:ring-brand/30"
            aria-invalid={Boolean(fieldErrors.acceptedPrivacyPolicy)}
            required
          />
          <span>
            I agree to the{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 text-sm leading-relaxed ${fieldErrors.acceptedTermsOfService ? 'text-danger' : 'text-ink-soft'
            }`}
        >
          <input
            type="checkbox"
            name="acceptedTermsOfService"
            checked={acceptedTermsOfService}
            onChange={(e) => {
              onAcceptedTermsOfServiceChange(e.target.checked)
              if (e.target.checked) {
                setFieldErrors((prev) => {
                  const next = { ...prev }
                  delete next.acceptedTermsOfService
                  return next
                })
                setError('')
              }
            }}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand focus:ring-brand/30"
            aria-invalid={Boolean(fieldErrors.acceptedTermsOfService)}
            required
          />
          <span>
            I agree to the{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Terms of Service
            </a>
            .
          </span>
        </label>

        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>
        {import.meta.env.DEV ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => {
              setAuthenticated(true)
              navigate(homeHref)
            }}
          >
            Skip (testing)
          </Button>
        ) : null}
      </div>
    </>
  )
}

/** Renders outside the form so parent `space-y-6` spacing is unchanged. */
export function AccountCredentialsSignInPrompt({
  signInHref,
}: {
  signInHref: string
}) {
  return (
    <p className="text-center text-sm text-muted">
      Already have an account?{' '}
      <Link to={signInHref} className="font-semibold text-brand hover:underline">
        Sign in
      </Link>
    </p>
  )
}
