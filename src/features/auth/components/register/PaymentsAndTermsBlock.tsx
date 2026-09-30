import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import type { HeroFiltersState } from '@/features/search'
import { splitCsv } from '@/features/search'
import { RegisterFilterMenuProvider } from '@/features/search/components/HeroFilterSelect'
import {
  createEmptyFormOfPaymentMethod,
  type AddressFields,
  type FormOfPaymentMethodEntry,
  type FormOfPaymentMethodField,
  type FormOfPaymentMethodType,
} from '@/features/auth/model/registerPsp'
import { cn } from '@/shared/lib/cn'
import { FormOfPaymentMethodFields } from './formOfPayment'
import {
  LCRE_FINANCING_BANNER,
  REGISTER_CARD_PAYMENT_TYPES,
  REGISTER_CASH_SUBOPTIONS,
  REGISTER_CREDIT_FINANCIERS,
  REGISTER_LCRE_FINANCING_CATEGORIES,
  REGISTER_PAYMENT_PACKET_OPTIONS,
  REGISTER_PAYMENT_TERMS_OPTIONS,
  REGISTER_TIER_OPTIONS,
  isCardPaymentType,
  type RegisterPaymentMethodRoot,
} from './paymentsAndTermsData'
import { FormSection } from './registerUi'
import { RegisterFilterSelect } from './serviceProfileControls'

function toggleInList(list: string[], item: string) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item]
}

function NestedPanel({ children }: { children: ReactNode }) {
  return (
    <div className="ml-6 space-y-2 border-l border-line/80 pl-4 pt-1">{children}</div>
  )
}

function MethodCheckbox({
  label,
  checked,
  onChange,
  bold = false,
}: {
  label: string
  checked: boolean
  onChange: () => void
  bold?: boolean
}) {
  return (
    <label className="flex w-full cursor-pointer items-start gap-2.5 text-sm text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-ink/25 accent-brand focus:ring-brand/30"
      />
      <span className={cn(checked && 'font-medium text-ink', bold && 'font-semibold text-ink')}>
        {label}
      </span>
    </label>
  )
}

function SuggestField({ id, label }: { id: string; label: string }) {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 text-sm">
      <span className="font-semibold text-ink">Suggest:</span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Suggest ${label.toLowerCase()}`}
        className="min-w-[10rem] flex-1 border-b border-line bg-transparent px-1 py-0.5 text-sm text-ink outline-none placeholder:text-muted focus:border-brand"
        aria-label={`Suggest ${label}`}
      />
    </div>
  )
}

function ensureCardEntries(
  entries: FormOfPaymentMethodEntry[],
  selectedTypes: FormOfPaymentMethodType[],
): FormOfPaymentMethodEntry[] {
  const next = entries.filter(
    (entry) => entry.type && selectedTypes.includes(entry.type),
  )
  for (const type of selectedTypes) {
    if (!next.some((entry) => entry.type === type)) {
      next.push({ ...createEmptyFormOfPaymentMethod(), type })
    }
  }
  return next.length > 0 ? next : [createEmptyFormOfPaymentMethod()]
}

export function PaymentsAndTermsBlock({
  step,
  divided = true,
  profileFilters,
  setProfileFilterList,
  formOfPaymentMethods,
  payerName,
  payerAddress,
  onSyncFormOfPaymentMethods,
  onUpdateFormOfPaymentMethod,
}: {
  step?: number
  divided?: boolean
  profileFilters: HeroFiltersState
  setProfileFilterList: (key: keyof HeroFiltersState, next: string[]) => void
  formOfPaymentMethods: FormOfPaymentMethodEntry[]
  payerName: string
  payerAddress: AddressFields
  onSyncFormOfPaymentMethods: (entries: FormOfPaymentMethodEntry[]) => void
  onUpdateFormOfPaymentMethod: (
    id: string,
    field: FormOfPaymentMethodField,
    value: string | boolean,
  ) => void
}) {
  const paymentTerms = splitCsv(profileFilters.paymentTerms)
  const methods = splitCsv(profileFilters.paymentMethods)
  const paymentPacket = splitCsv(profileFilters.paymentPacket)
  const tierSelection = splitCsv(profileFilters.tierSelection)

  const cashOn = methods.includes('Cash')
  const cardOn = methods.includes('Card')
  const creditOn = methods.includes('Credit')
  const packetOn = methods.includes('Payment Packet')
  const tierOn = methods.includes('Tier')
  const lcreOn = methods.includes('Credit > LCRE Financing')

  function setMethods(next: string[]) {
    setProfileFilterList('paymentMethods', next)
  }

  function toggleRoot(root: RegisterPaymentMethodRoot) {
    const on = methods.includes(root)
    if (on) {
      setMethods(methods.filter((value) => value !== root && !value.startsWith(`${root} > `)))
      if (root === 'Card') {
        onSyncFormOfPaymentMethods([createEmptyFormOfPaymentMethod()])
      }
      if (root === 'Payment Packet') setProfileFilterList('paymentPacket', [])
      if (root === 'Tier') setProfileFilterList('tierSelection', [])
      return
    }
    setMethods([...methods, root])
  }

  function toggleChild(root: RegisterPaymentMethodRoot, child: string) {
    const path = `${root} > ${child}`
    const turningOff = methods.includes(path)
    let next = toggleInList(methods, path)
    if (!next.includes(root)) next = [...next, root]

    if (root === 'Credit' && child === 'LCRE Financing' && turningOff) {
      next = next.filter(
        (value) => !value.startsWith('Credit > LCRE Financing > '),
      )
    }

    if (root === 'Card' && isCardPaymentType(child)) {
      const selectedTypes = next
        .filter((value) => value.startsWith('Card > '))
        .map((value) => value.slice('Card > '.length))
        .filter(isCardPaymentType)
      onSyncFormOfPaymentMethods(ensureCardEntries(formOfPaymentMethods, selectedTypes))
    }

    setMethods(next)
  }

  function toggleLcreCategory(label: string) {
    const path = `Credit > LCRE Financing > ${label}`
    let next = toggleInList(methods, path)
    if (!next.includes('Credit')) next = [...next, 'Credit']
    if (!next.includes('Credit > LCRE Financing')) {
      next = [...next, 'Credit > LCRE Financing']
    }
    setMethods(next)
  }

  return (
    <FormSection title="Payments & Terms" step={step} divided={divided}>
      <RegisterFilterMenuProvider>
        <div className="flex flex-col gap-5">
          <RegisterFilterSelect
            label="Payment Terms:"
            placeholder="Ex. (Before, After, etc.,)"
            options={[...REGISTER_PAYMENT_TERMS_OPTIONS]}
            value={paymentTerms}
            onChange={(next) => setProfileFilterList('paymentTerms', next)}
            showSuggest
          />

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-sm font-bold leading-snug text-ink">
              Payment Methods:
              <FieldQaMark field="Payment Methods:" />
            </span>

            <div className="space-y-3 rounded-xl border border-line/80 bg-mist/10 p-4">
              <div className="space-y-2">
                <MethodCheckbox
                  label="Cash"
                  checked={cashOn}
                  bold
                  onChange={() => toggleRoot('Cash')}
                />
                {cashOn ? (
                  <NestedPanel>
                    {REGISTER_CASH_SUBOPTIONS.map((option) => (
                      <MethodCheckbox
                        key={option}
                        label={option}
                        checked={methods.includes(`Cash > ${option}`)}
                        onChange={() => toggleChild('Cash', option)}
                      />
                    ))}
                    <SuggestField id="suggest-cash" label="cash option" />
                  </NestedPanel>
                ) : null}
              </div>

              <div className="space-y-2 border-t border-line/70 pt-3">
                <MethodCheckbox
                  label="Card"
                  checked={cardOn}
                  bold
                  onChange={() => toggleRoot('Card')}
                />
                {cardOn ? (
                  <NestedPanel>
                    <p className="text-sm font-semibold text-ink">Payment type:</p>
                    {REGISTER_CARD_PAYMENT_TYPES.map((option) => {
                      const selected = methods.includes(`Card > ${option}`)
                      const entry = formOfPaymentMethods.find((item) => item.type === option)
                      return (
                        <div key={option} className="space-y-2">
                          <MethodCheckbox
                            label={option}
                            checked={selected}
                            onChange={() => toggleChild('Card', option)}
                          />
                          {selected && entry ? (
                            <div className="ml-6 space-y-2 border-l border-line/70 pl-4">
                              <FormOfPaymentMethodFields
                                entry={entry}
                                businessName={payerName}
                                businessAddress={payerAddress}
                                onUpdate={(field, value) =>
                                  onUpdateFormOfPaymentMethod(entry.id, field, value)
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                    <SuggestField id="suggest-card" label="payment type" />
                  </NestedPanel>
                ) : null}
              </div>

              <div className="space-y-2 border-t border-line/70 pt-3">
                <MethodCheckbox
                  label="Credit"
                  checked={creditOn}
                  bold
                  onChange={() => toggleRoot('Credit')}
                />
                {creditOn ? (
                  <NestedPanel>
                    <p className="text-sm font-semibold text-ink">A–Z Financiers:</p>
                    {REGISTER_CREDIT_FINANCIERS.map((option) => (
                      <MethodCheckbox
                        key={option}
                        label={option}
                        checked={methods.includes(`Credit > ${option}`)}
                        onChange={() => toggleChild('Credit', option)}
                      />
                    ))}

                    {lcreOn ? (
                      <div className="ml-2 space-y-3 rounded-xl border border-brand/25 bg-brand-light/40 p-3">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-ink">{LCRE_FINANCING_BANNER.title}</p>
                          <p className="text-sm leading-relaxed text-muted">
                            {LCRE_FINANCING_BANNER.body}
                          </p>
                          <Link
                            to={LCRE_FINANCING_BANNER.href}
                            className="inline-flex text-sm font-semibold text-brand hover:underline"
                          >
                            View LCRE Financing
                          </Link>
                        </div>
                        <div className="space-y-2 border-t border-brand/20 pt-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                            Financing categories
                          </p>
                          {REGISTER_LCRE_FINANCING_CATEGORIES.map((item) => (
                            <div key={item.label} className="flex flex-wrap items-center gap-3">
                              <MethodCheckbox
                                label={item.label}
                                checked={methods.includes(
                                  `Credit > LCRE Financing > ${item.label}`,
                                )}
                                onChange={() => toggleLcreCategory(item.label)}
                              />
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-medium text-brand hover:underline"
                              >
                                Learn more
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <SuggestField id="suggest-credit" label="financier" />
                  </NestedPanel>
                ) : null}
              </div>

              <div className="space-y-2 border-t border-line/70 pt-3">
                <MethodCheckbox
                  label="Payment Packet"
                  checked={packetOn}
                  bold
                  onChange={() => toggleRoot('Payment Packet')}
                />
                {packetOn ? (
                  <NestedPanel>
                    {REGISTER_PAYMENT_PACKET_OPTIONS.map((option) => (
                      <MethodCheckbox
                        key={option}
                        label={option}
                        checked={paymentPacket.includes(option)}
                        onChange={() =>
                          setProfileFilterList(
                            'paymentPacket',
                            toggleInList(paymentPacket, option),
                          )
                        }
                      />
                    ))}
                    <SuggestField id="suggest-packet" label="payment packet" />
                  </NestedPanel>
                ) : null}
              </div>

              <div className="space-y-2 border-t border-line/70 pt-3">
                <MethodCheckbox
                  label="Tier"
                  checked={tierOn}
                  bold
                  onChange={() => toggleRoot('Tier')}
                />
                {tierOn ? (
                  <NestedPanel>
                    {REGISTER_TIER_OPTIONS.map((option) => (
                      <MethodCheckbox
                        key={option}
                        label={option}
                        checked={tierSelection.includes(option)}
                        onChange={() =>
                          setProfileFilterList(
                            'tierSelection',
                            toggleInList(tierSelection, option),
                          )
                        }
                      />
                    ))}
                    <SuggestField id="suggest-tier" label="tier" />
                  </NestedPanel>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </RegisterFilterMenuProvider>
    </FormSection>
  )
}
