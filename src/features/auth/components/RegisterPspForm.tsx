import { PATHS } from '@/app/router/paths'
import { useRegisterPspForm } from '@/features/auth/hooks/useRegisterPspForm'
import {
  AccountCredentialsBlock,
  AccountCredentialsSignInPrompt,
  AdditionalLicensesBlock,
  BusinessInformationBlock,
  CredentialDocumentBlock,
  FormSection,
  InlineBlankField,
  MembershipCardInformation,
  ServiceProfileBlock,
  UnderlineField,
} from './register'

/** Thin composer — form state/validation live in `useRegisterPspForm`. */
export function RegisterPspForm() {
  const form = useRegisterPspForm()

  return (
    <div className="space-y-6">
      <div className="space-y-4 border-b border-line pb-5">
        <div className="space-y-2">
          <h1 className="w-full text-balance font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Register
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
        <div className="flex w-full flex-col gap-4">
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

          <BusinessInformationBlock
            step={2}
            phone={form.data.phone}
            onPhoneChange={(value) => form.update('phone', value)}
            businessName={form.data.businessName}
            businessEmail={form.data.businessEmail}
            businessWebsite={form.data.businessWebsite}
            businessAddressSameAs={form.data.businessAddressSameAs}
            businessAddressFields={form.data.businessAddressFields}
            onBusinessAddressSameAsChange={form.setBusinessAddressSameAs}
            onBusinessAddressFieldChange={form.updateBusinessAddress}
            businessOpenDays={form.data.businessOpenDays}
            businessHoursByDay={form.data.businessHoursByDay}
            bestTimesToReach={form.data.bestTimesToReach}
            onChange={(field, value) => form.update(field, value)}
            onToggleDay={form.toggleBusinessDay}
            onDayHoursChange={form.setDayHours}
            fieldErrors={form.fieldErrors}
          />

          <CredentialDocumentBlock
            step={3}
            title="License / Credential"
            uploadLabel="License document"
            name="contractorLicenseDoc"
            section="license"
            file={form.data.contractorLicenseDoc}
            onFileChange={(file) => form.update('contractorLicenseDoc', file)}
            manual={form.data.license}
            onManualChange={(field, value) => form.updateManual('license', field, value)}
            fieldErrors={form.fieldErrors}
          />

          <CredentialDocumentBlock
            step={4}
            title="Bonds / Insurance"
            uploadLabel="Insurance certificate"
            name="insuranceDoc"
            section="insurance"
            file={form.data.insuranceDoc}
            onFileChange={(file) => form.update('insuranceDoc', file)}
            manual={form.data.insurance}
            onManualChange={(field, value) => form.updateManual('insurance', field, value)}
            fieldErrors={form.fieldErrors}
          >
            <InlineBlankField
              label="Coverage notes:"
              name="insuranceInfo"
              value={form.data.insuranceInfo}
              onChange={(value) => form.update('insuranceInfo', value)}
              required
              invalid={Boolean(form.fieldErrors.insuranceInfo)}
              className="sm:col-span-2 lg:col-span-3"
            />
          </CredentialDocumentBlock>
        </div>

        <AdditionalLicensesBlock
          licenses={form.additionalLicenses}
          onAdd={form.addAdditionalLicense}
          onUpdate={form.updateAdditionalLicense}
          onRemove={form.removeAdditionalLicense}
        />

        <ServiceProfileBlock
          step={5}
          profileFilters={form.profileFilters}
          setProfileFilter={form.setProfileFilter}
          setProfileFilterList={form.setProfileFilterList}
          findLabels={form.findLabels}
          selectedPsp={form.selectedPsp}
          selectedFields={form.selectedFields}
          representation={form.representation}
          showRepresentation={form.showRepresentation}
          distance={form.distance}
          formOfPaymentMethods={form.formOfPaymentMethods}
          businessName={form.data.businessName}
          businessAddress={form.resolvedBusinessAddress}
          onAddFormOfPaymentMethod={form.addFormOfPaymentMethod}
          onUpdateFormOfPaymentMethod={form.updateFormOfPaymentMethod}
          onRemoveFormOfPaymentMethod={form.removeFormOfPaymentMethod}
          pspCategoryInvalid={Boolean(form.fieldErrors.pspCategory)}
        />

        <FormSection title="Membership" step={6}>
          <MembershipCardInformation
            numberOfEmployees={form.data.numberOfEmployees}
            employees={form.employees}
            total={form.data.membershipTotal}
            membershipGpsTotal={form.data.membershipGpsTotal}
            membershipAdvertiseTotal={form.data.membershipAdvertiseTotal}
            membershipDealsClosedTotal={form.data.membershipDealsClosedTotal}
            membershipTaxTotal={form.data.membershipTaxTotal}
            cardNumber={form.profileFilters.cardNumber}
            expirationDate={form.profileFilters.expirationDate}
            securityCode={form.profileFilters.securityCode}
            billingAddressSameAs={form.data.billingAddressSameAs}
            billingPhysicalAddress={form.data.billingPhysicalAddress}
            billingMailingAddress={form.data.billingMailingAddress}
            onBillingAddressSameAsChange={form.setBillingAddressSameAs}
            onBillingPhysicalAddressChange={form.updateBillingPhysicalAddress}
            onBillingMailingAddressChange={form.updateBillingMailingAddress}
            onNumberOfEmployeesChange={(value) => form.update('numberOfEmployees', value)}
            onTotalChange={(value) => form.update('membershipTotal', value)}
            onAmenityTotalChange={(field, value) => form.update(field, value)}
            onFieldChange={form.setProfileFilter}
            onAddEmployee={form.addEmployee}
            onUpdateEmployee={form.updateEmployee}
            onRemoveEmployee={form.removeEmployee}
            fieldErrors={form.fieldErrors}
          />
        </FormSection>

        <AccountCredentialsBlock
          step={7}
          email={form.data.email}
          password={form.data.password}
          confirmPassword={form.data.confirmPassword}
          acceptedPrivacyPolicy={form.data.acceptedPrivacyPolicy}
          acceptedTermsOfService={form.data.acceptedTermsOfService}
          fieldErrors={form.fieldErrors}
          error={form.error}
          homeHref={PATHS.home}
          onEmailChange={(value) => form.update('email', value)}
          onPasswordChange={(value) => form.update('password', value)}
          onConfirmPasswordChange={(value) => form.update('confirmPassword', value)}
          onAcceptedPrivacyPolicyChange={(value) =>
            form.update('acceptedPrivacyPolicy', value)
          }
          onAcceptedTermsOfServiceChange={(value) =>
            form.update('acceptedTermsOfService', value)
          }
          setFieldErrors={form.setFieldErrors}
          setError={form.setError}
        />
      </form>

      <AccountCredentialsSignInPrompt signInHref={PATHS.signIn} />
    </div>
  )
}
