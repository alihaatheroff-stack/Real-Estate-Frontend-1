import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import {
  GROUP_GEOGRAPHIES,
  GROUP_INDUSTRIES,
  GROUP_INTERESTS,
  GROUP_PROFESSIONAL_ROLES,
  GROUP_STRATEGIES,
} from '@/features/network/data/groupCategories'
import type { GroupCreateInput } from '@/features/network/model/groupsContext'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'

type CreateGroupDialogProps = {
  open: boolean
  onClose: () => void
  onCreated: (groupId: string) => void
}

const DEFAULT_FORM = {
  name: '',
  description: '',
  about: '',
  cover: '',
  category: '',
  industry: '',
  professionalRole: '',
  geography: '',
  strategy: '',
  interest: '',
  tags: '',
  privacy: 'Public' as 'Public' | 'Private',
}

function toOptions(values: readonly string[]) {
  return values.map((value) => ({ label: value, value }))
}

export function CreateGroupDialog({ open, onClose, onCreated }: CreateGroupDialogProps) {
  const { createGroup } = useNetworkGroups()
  const [form, setForm] = useState(DEFAULT_FORM)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm(DEFAULT_FORM)
    setError(null)
    setSubmitting(false)
  }, [open])

  if (!open) return null

  function patch<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const payload: GroupCreateInput = {
      name: form.name,
      description: form.description,
      about: form.about || form.description,
      cover: form.cover || undefined,
      category: form.category || form.industry,
      industry: form.industry,
      professionalRole: form.professionalRole,
      geography: form.geography,
      strategy: form.strategy,
      interest: form.interest,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      privacy: form.privacy,
    }
    const result = createGroup(payload)
    setSubmitting(false)
    if (!result.ok || !result.id) {
      setError(result.message)
      return
    }
    onCreated(result.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close create group"
        onClick={onClose}
      />
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-4 py-3">
          <div>
            <h2 className="font-display text-xl font-semibold">Create a group</h2>
            <p className="text-xs text-muted">You will be the owner of this community.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <Input
            label="Group name"
            required
            value={form.name}
            onChange={(e) => patch('name', e.target.value)}
            placeholder="e.g. SaaS Founders Pakistan"
          />
          <label className="flex w-full flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">Short description</span>
            <textarea
              required
              value={form.description}
              onChange={(e) => patch('description', e.target.value)}
              rows={2}
              placeholder="Community for founders building and scaling SaaS businesses."
              className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="flex w-full flex-col gap-1.5 text-sm">
            <span className="font-bold text-ink">About (optional)</span>
            <textarea
              value={form.about}
              onChange={(e) => patch('about', e.target.value)}
              rows={3}
              placeholder="Longer community purpose…"
              className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Industry"
              required
              placeholder="Select industry"
              options={toOptions(GROUP_INDUSTRIES)}
              value={form.industry}
              onChange={(e) => patch('industry', e.target.value)}
            />
            <Select
              label="Professional role"
              required
              placeholder="Select role"
              options={toOptions(GROUP_PROFESSIONAL_ROLES)}
              value={form.professionalRole}
              onChange={(e) => patch('professionalRole', e.target.value)}
            />
            <Select
              label="Geography"
              required
              placeholder="Select geography"
              options={toOptions(GROUP_GEOGRAPHIES)}
              value={form.geography}
              onChange={(e) => patch('geography', e.target.value)}
            />
            <Select
              label="Strategy"
              required
              placeholder="Select strategy"
              options={toOptions(GROUP_STRATEGIES)}
              value={form.strategy}
              onChange={(e) => patch('strategy', e.target.value)}
            />
            <Select
              label="Interest"
              required
              placeholder="Select interest"
              options={toOptions(GROUP_INTERESTS)}
              value={form.interest}
              onChange={(e) => patch('interest', e.target.value)}
            />
            <Select
              label="Privacy"
              options={[
                { label: 'Public — anyone can join', value: 'Public' },
                { label: 'Private — request to join', value: 'Private' },
              ]}
              value={form.privacy}
              onChange={(e) => patch('privacy', e.target.value as 'Public' | 'Private')}
            />
          </div>

          <Input
            label="Category label (optional)"
            value={form.category}
            onChange={(e) => patch('category', e.target.value)}
            placeholder="Defaults to industry"
          />
          <Input
            label="Tags (comma-separated)"
            value={form.tags}
            onChange={(e) => patch('tags', e.target.value)}
            placeholder="SaaS, Founders, Pakistan"
          />
          <Input
            label="Cover image URL (optional)"
            value={form.cover}
            onChange={(e) => patch('cover', e.target.value)}
            placeholder="Leave blank for a default cover"
          />

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <div className="flex flex-wrap gap-2 pb-2 pt-1">
            <Button type="submit" className="rounded-lg" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create group'}
            </Button>
            <Button type="button" variant="outline" className="rounded-lg" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
