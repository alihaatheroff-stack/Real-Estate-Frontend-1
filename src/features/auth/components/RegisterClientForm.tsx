import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { useRegisterPspForm } from '@/features/auth/hooks/useRegisterPspForm'
import { pickManualAddressFields } from '@/features/auth/model/registerPsp'
import {
  AccountCredentialsBlock,
  AccountCredentialsSignInPrompt,
  CredentialDocumentBlock,
  LanguageAndLevelBlock,
  PaymentsAndTermsBlock,
  UnderlineField,
} from './register'

function resolveClientAddress(form: ReturnType<typeof useRegisterPspForm>) {
  if (form.data.identificationCurrentAddressSameAsId === true) {
    return pickManualAddressFields(form.data.identification)
  }
  if (form.data.identificationCurrentAddressSameAsId === false) {
    return pickManualAddressFields(form.data.identificationCurrentAddress)
  }
  return pickManualAddressFields(form.data.identification)
}

/** Client registration — identification, language & level, payments, credentials. */
export function RegisterClientForm() {
  const form = useRegisterPspForm('client')
  const payerAddress = resolveClientAddress(form)
  const payerName = form.data.identification.firstName.trim() || 'Client'

  return (
    <div className="space-y-6">
      <div className="space-y-4 border-b border-line pb-5">
        <div className="space-y-2">
          <Link
            to={PATHS.register}
            className="text-sm font-medium text-brand hover:underline"
          >
            ← Change registration type
          </Link>
          <h1 className="w-full text-balance font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Register as a Client
          </h1>
        </div>
        <div className="grid w-full grid-cols-2 gap-6 sm:gap-10 lg:gap-16">
          <UnderlineField
            label="Time:"
            name="registrationTime"
            type="time"
            value={form.data.registrationTime}
            onChange={(value) => form.update('registrationTime', value)}
          />
          <UnderlineField
            label="Date:"
            name="registrationDate"
            type="date"
            value={form.data.registrationDate}
            onChange={(value) => form.update('registrationDate', value)}
          />
        </div>
      </div>

      <form className="space-y-8" onSubmit={form.handleSubmit} noValidate>
        <CredentialDocumentBlock
          step={1}
          title="Identification"
          uploadLabel="ID document"
          name="identificationDoc"
          section="identification"
          file={form.data.identificationDoc}
          onFileChange={(file) => form.update('identificationDoc', file)}
          manual={form.data.identification}
          onManualChange={(field, value) =>
            form.updateManual('identification', field, value)
          }
          fieldErrors={form.fieldErrors}
          currentAddressSameAsId={form.data.identificationCurrentAddressSameAsId}
          currentAddress={form.data.identificationCurrentAddress}
          onCurrentAddressSameAsIdChange={form.setIdentificationCurrentAddressSameAsId}
          onCurrentAddressChange={form.updateIdentificationCurrentAddress}
          hasAllergy={form.data.hasAllergy}
          allergyDetails={form.data.allergyDetails}
          onHasAllergyChange={form.setHasAllergy}
          onAllergyDetailsChange={(value) => form.update('allergyDetails', value)}
          otherMedicalCondition={form.data.otherMedicalCondition}
          onOtherMedicalConditionChange={(value) =>
            form.update('otherMedicalCondition', value)
          }
          emergencyContacts={form.data.emergencyContacts}
          onAddEmergencyContact={form.addEmergencyContact}
          onUpdateEmergencyContact={form.updateEmergencyContact}
          onRemoveEmergencyContact={form.removeEmergencyContact}
        />

        <LanguageAndLevelBlock
          step={2}
          profileFilters={form.profileFilters}
          setProfileFilterList={form.setProfileFilterList}
        />

        <PaymentsAndTermsBlock
          step={3}
          divided={false}
          profileFilters={form.profileFilters}
          setProfileFilterList={form.setProfileFilterList}
          formOfPaymentMethods={form.formOfPaymentMethods}
          payerName={payerName}
          payerAddress={payerAddress}
          onSyncFormOfPaymentMethods={form.syncFormOfPaymentMethods}
          onUpdateFormOfPaymentMethod={form.updateFormOfPaymentMethod}
        />

        <AccountCredentialsBlock
          step={4}
          email={form.data.email}
          password={form.data.password}
          confirmPassword={form.data.confirmPassword}
          acceptedPolicies={form.data.acceptedPolicies}
          fieldErrors={form.fieldErrors}
          error={form.error}
          homeHref={PATHS.home}
          onEmailChange={(value) => form.update('email', value)}
          onPasswordChange={(value) => form.update('password', value)}
          onConfirmPasswordChange={(value) => form.update('confirmPassword', value)}
          onAcceptedPolicyChange={(id, value) =>
            form.update('acceptedPolicies', {
              ...form.data.acceptedPolicies,
              [id]: value,
            })
          }
          setFieldErrors={form.setFieldErrors}
          setError={form.setError}
          registerMode="client"
        />
      </form>

      <AccountCredentialsSignInPrompt signInHref={PATHS.signIn} />
    </div>
  )
}
