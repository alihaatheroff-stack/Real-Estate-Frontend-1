import { useState } from 'react'
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
import type { NetworkGroup } from '@/features/network/data/types'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'
import { PATHS } from '@/app/router/paths'
import { useNavigate } from 'react-router-dom'

type GroupManagePanelProps = {
  group: NetworkGroup
}

function toOptions(values: readonly string[]) {
  return values.map((value) => ({ label: value, value }))
}

export function GroupManagePanel({ group }: GroupManagePanelProps) {
  const navigate = useNavigate()
  const { updateGroup, archiveGroup, deleteGroup, myMembership } = useNetworkGroups()
  const role = myMembership(group.id).role
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: group.name,
    description: group.description,
    about: group.about,
    cover: group.cover,
    category: group.category,
    industry: group.industry,
    professionalRole: group.professionalRole,
    geography: group.geography,
    strategy: group.strategy,
    interest: group.interest,
    tags: group.tags.join(', '),
    rules: group.rules.join('\n'),
    privacy: group.privacy,
  })

  function patch<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function handleSave() {
    const result = updateGroup(group.id, {
      name: form.name,
      description: form.description,
      about: form.about,
      cover: form.cover,
      category: form.category,
      industry: form.industry,
      professionalRole: form.professionalRole,
      geography: form.geography,
      strategy: form.strategy,
      interest: form.interest,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      rules: form.rules
        .split('\n')
        .map((rule) => rule.trim())
        .filter(Boolean),
      privacy: form.privacy,
    })
    setMessage(result.message)
  }

  function handleArchive() {
    const result = archiveGroup(group.id)
    setMessage(result.message)
    if (result.ok) navigate(PATHS.networkGroups)
  }

  function handleDelete() {
    if (!window.confirm(`Delete “${group.name}”? This cannot be undone.`)) return
    const result = deleteGroup(group.id)
    setMessage(result.message)
    if (result.ok) navigate(PATHS.networkGroups)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-ink">Group settings</h3>
        <p className="mt-1 text-sm text-muted">
          Edit community details, categories, privacy, and lifecycle. Changes apply immediately.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Group name" value={form.name} onChange={(e) => patch('name', e.target.value)} />
        <Input
          label="Category label"
          value={form.category}
          onChange={(e) => patch('category', e.target.value)}
        />
        <div className="sm:col-span-2">
          <Input
            label="Cover image URL"
            value={form.cover}
            onChange={(e) => patch('cover', e.target.value)}
          />
        </div>
        <label className="flex w-full flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-bold text-ink">Short description</span>
          <textarea
            value={form.description}
            onChange={(e) => patch('description', e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="flex w-full flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-bold text-ink">About</span>
          <textarea
            value={form.about}
            onChange={(e) => patch('about', e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <Select
          label="Industry"
          options={toOptions(GROUP_INDUSTRIES)}
          value={form.industry}
          onChange={(e) => patch('industry', e.target.value)}
        />
        <Select
          label="Professional role"
          options={toOptions(GROUP_PROFESSIONAL_ROLES)}
          value={form.professionalRole}
          onChange={(e) => patch('professionalRole', e.target.value)}
        />
        <Select
          label="Geography"
          options={toOptions(GROUP_GEOGRAPHIES)}
          value={form.geography}
          onChange={(e) => patch('geography', e.target.value)}
        />
        <Select
          label="Strategy"
          options={toOptions(GROUP_STRATEGIES)}
          value={form.strategy}
          onChange={(e) => patch('strategy', e.target.value)}
        />
        <Select
          label="Interest"
          options={toOptions(GROUP_INTERESTS)}
          value={form.interest}
          onChange={(e) => patch('interest', e.target.value)}
        />
        <Select
          label="Privacy"
          options={[
            { label: 'Public', value: 'Public' },
            { label: 'Private', value: 'Private' },
          ]}
          value={form.privacy}
          onChange={(e) => patch('privacy', e.target.value as 'Public' | 'Private')}
        />
        <div className="sm:col-span-2">
          <Input
            label="Tags (comma-separated)"
            value={form.tags}
            onChange={(e) => patch('tags', e.target.value)}
          />
        </div>
        <label className="flex w-full flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-bold text-ink">Group rules (one per line)</span>
          <textarea
            value={form.rules}
            onChange={(e) => patch('rules', e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-line bg-paper px-3 py-2 text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button className="rounded-lg" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="outline" className="rounded-lg" onClick={handleArchive}>
          Archive group
        </Button>
        {role === 'owner' ? (
          <Button variant="ghost" className="rounded-lg text-red-700" onClick={handleDelete}>
            Delete group
          </Button>
        ) : null}
      </div>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  )
}
