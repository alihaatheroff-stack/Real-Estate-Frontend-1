import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import type { AdditionalLicense } from '@/features/auth/model/registerPsp'
import { DocumentUploadField } from './DocumentUploadField'
import { additionalLicenseCardClass } from './styles'

export function AdditionalLicensesBlock({
  licenses,
  onAdd,
  onUpdate,
  onRemove,
}: {
  licenses: AdditionalLicense[]
  onAdd: () => void
  onUpdate: (
    id: string,
    patch: Partial<Pick<AdditionalLicense, 'name' | 'file'>>,
  ) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      {licenses.map((item, index) => (
        <div key={item.id} className={additionalLicenseCardClass}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-ink">
              Additional license
              {licenses.length > 1 ? ` ${index + 1}` : ''}
            </h3>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-paper hover:text-ink"
              aria-label="Remove additional license"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Input
            showQaMark
            label="License name"
            name={`additionalLicenseName-${item.id}`}
            placeholder="License name"
            value={item.name}
            onChange={(e) => onUpdate(item.id, { name: e.target.value })}
          />
          <DocumentUploadField
            label="License document"
            name={`additionalLicenseDoc-${item.id}`}
            file={item.file}
            onChange={(file) => onUpdate(item.id, { file })}
          />
        </div>
      ))}

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-ink">Add more Bonds / Insurance</p>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-line text-ink transition hover:border-brand hover:bg-brand-light/40 hover:text-brand"
          aria-label="Add more Bonds / Insurance"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
