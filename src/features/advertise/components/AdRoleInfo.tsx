import type { AdRolePlacement, AdvertisementDraft } from '@/features/advertise/types'
import { cn } from '@/shared/lib/cn'

export function resolveAdvertiserLabel(draft: AdvertisementDraft) {
  const name = (draft.advertiserName ?? '').trim() || 'Broker name'
  const role = (draft.role ?? '').trim() || 'Your role'
  const service = (draft.service ?? '').trim() || 'Service'
  const brokerLicense = (draft.brokerLicense ?? '').trim() || 'License #'
  const address = (draft.address ?? '').trim() || 'Address'
  const city = (draft.city ?? '').trim() || 'City'
  const zipcode = (draft.zipcode ?? '').trim() || 'Zipcode'
  const phone = (draft.phone ?? '').trim() || 'Phone'
  const cityZip = [city, zipcode].filter(Boolean).join(', ')
  return { name, role, service, brokerLicense, address, cityZip, phone }
}

/** Broker / service block used inside advertise creatives / placement previews. */
export function AdRoleInfo({
  draft,
  size = 'md',
  className,
}: {
  draft: AdvertisementDraft
  size?: 'sm' | 'md'
  className?: string
}) {
  const { name, role, service, brokerLicense, address, cityZip, phone } =
    resolveAdvertiserLabel(draft)
  const line = size === 'sm' ? 'text-[10px] leading-snug' : 'text-[12px] leading-snug'
  const label = 'font-medium text-ink-soft'

  return (
    <div className={cn('min-w-0 space-y-0.5', className)}>
      <p className={cn('truncate font-semibold text-ink underline', size === 'sm' ? 'text-[11px]' : 'text-sm')}>
        {name}
      </p>
      <p className={cn('truncate text-muted', size === 'sm' ? 'text-[10px]' : 'text-[13px]')}>
        {role}
      </p>
      <div className={cn('text-muted', size === 'sm' ? 'mt-1' : 'mt-1.5', line)}>
        <p>
          <span className={label}>Service:</span> {service}
        </p>
        <p>
          <span className={label}>License #:</span> {brokerLicense}
        </p>
        <p>
          <span className={label}>Address:</span> {address}
        </p>
        <p>
          <span className={label}>City, Zipcode:</span> {cityZip}
        </p>
        <p>
          <span className={label}>Phone:</span> {phone}
        </p>
      </div>
    </div>
  )
}

export function rolePlacementLabel(placement: AdRolePlacement) {
  return placement === 'above-image' ? 'Above the image' : 'Below the image'
}
