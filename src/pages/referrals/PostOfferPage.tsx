import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { FIELD_OPTIONS, PSP_CATEGORIES } from '@/features/search'
import { PATHS } from '@/app/router/paths'

export function PostOfferPage() {
  return (
    <Section className="pt-10">
      <SectionHeading
        eyebrow="Post / Receive"
        title="Post a wanted offer"
        description="Describe the work you need. PSPs can respond with packaged proposals — full bidding flow comes with backend."
      />
      <form
        className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-line bg-paper p-6 shadow-soft"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input label="Title" name="title" placeholder="Need commercial lease agent near 93728" />
        <Select
          label="Category"
          name="category"
          placeholder="Select"
          options={PSP_CATEGORIES}
        />
        <Select label="Field" name="field" placeholder="Select" options={FIELD_OPTIONS} />
        <Input label="ZIP" name="zip" defaultValue="93728" />
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-ink-soft">Description</span>
          <textarea
            name="description"
            rows={5}
            className="rounded-xl border border-line bg-paper px-3 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Scope, timeline, referral preferences…"
          />
        </label>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit">Submit offer</Button>
          <Link to={PATHS.home}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
        <p className="text-xs text-muted">
          Submitting is UI-only for this frontend delivery. Wire to API when backend is ready.
        </p>
      </form>
    </Section>
  )
}
