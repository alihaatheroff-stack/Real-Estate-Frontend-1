import { Link } from 'react-router-dom'
import { ComingSoon } from '@/components/feedback/ComingSoon'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <ComingSoon />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-3 text-muted">{description}</p>
      <Link to={PATHS.home} className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  )
}
