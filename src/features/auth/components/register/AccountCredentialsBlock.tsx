import { Link, useNavigate } from 'react-router-dom'
import type { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  REGISTER_POLICY_AGREEMENTS,
  type AcceptedPolicies,
  type RegisterPolicyId,
} from '@/features/auth/data/registerPolicyAgreements'
import { markHeaderTourPending, markPreferMarketingLanding, setAuthenticated } from '@/features/auth/session'
import type { FieldErrorKey } from '@/features/auth/model/registerPsp'
import {
  seedRegistrationProfile,
  type RegisterFormMode,
} from '@/features/auth/model/registrationProfile'
import { FormSection } from './registerUi'

export function AccountCredentialsBlock({
  step = 7,
  email,
  password,
  confirmPassword,
  acceptedPolicies,
  fieldErrors,
  error,
  homeHref,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAcceptedPolicyChange,
  setFieldErrors,
  setError,
  submitLabel = 'Create account',
  showSkip = true,
  showPolicies = true,
  savedFlash = false,
  credentialsTitle = 'Set up log in credentials',
  onSaveClick,
  registerMode,
}: {
  step?: number
  email: string
  password: string
  confirmPassword: string
  acceptedPolicies: AcceptedPolicies
  fieldErrors: Partial<Record<FieldErrorKey, boolean>>
  error: string
  homeHref: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onConfirmPasswordChange: (value: string) => void
  onAcceptedPolicyChange: (id: RegisterPolicyId, value: boolean) => void
  setFieldErrors: Dispatch<SetStateAction<Partial<Record<FieldErrorKey, boolean>>>>
  setError: (value: string) => void
  submitLabel?: string
  showSkip?: boolean
  showPolicies?: boolean
  savedFlash?: boolean
  credentialsTitle?: string
  /** When set, Save uses this instead of submitting the parent form. */
  onSaveClick?: () => void
  /** Used when Skip seeds Settings with Client vs PSP registration fields. */
  registerMode?: RegisterFormMode
}) {
  const navigate = useNavigate()

  return (
    <>
      <FormSection title={credentialsTitle} step={step} divided={false}>
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

      {savedFlash ? (
        <div
          className="rounded-xl border border-[#1dbf73]/30 bg-[#1dbf73]/10 px-4 py-3 text-sm font-medium text-[#0f8a52]"
          role="status"
        >
          Your registration details were saved.
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-line pt-6">
        {showPolicies
          ? REGISTER_POLICY_AGREEMENTS.map((doc) => {
              const errorKey = `acceptedPolicy.${doc.id}` as const
              const invalid = Boolean(fieldErrors[errorKey] || fieldErrors.acceptedPolicies)
              return (
                <label
                  key={doc.id}
                  className={`flex cursor-pointer items-start gap-3 text-sm leading-relaxed ${
                    invalid ? 'text-danger' : 'text-ink-soft'
                  }`}
                >
                  <input
                    type="checkbox"
                    name={`acceptedPolicy.${doc.id}`}
                    checked={acceptedPolicies[doc.id]}
                    onChange={(e) => {
                      onAcceptedPolicyChange(doc.id, e.target.checked)
                      if (e.target.checked) {
                        setFieldErrors((prev) => {
                          const next = { ...prev }
                          delete next[errorKey]
                          delete next.acceptedPolicies
                          return next
                        })
                        setError('')
                      }
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand focus:ring-brand/30"
                    aria-invalid={invalid}
                    required
                  />
                  <span>
                    I agree to the{' '}
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand underline-offset-2 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {doc.label}
                    </a>
                    .
                  </span>
                </label>
              )
            })
          : null}

        <Button
          type={onSaveClick ? 'button' : 'submit'}
          className="w-full"
          size="lg"
          onClick={onSaveClick}
        >
          {submitLabel}
        </Button>
        {showSkip ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => {
              if (registerMode) seedRegistrationProfile(registerMode)
              markHeaderTourPending()
              markPreferMarketingLanding()
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
