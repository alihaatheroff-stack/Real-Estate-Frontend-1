import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ComingSoon } from '@/components/feedback/ComingSoon'
import { FOOTER_LINKS, SITE } from '@/shared/config/site'
import { PATHS } from '@/app/router/paths'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3 lg:col-span-1">
          <p className="font-display text-2xl font-extrabold">{SITE.name}</p>
          <p className="text-sm leading-relaxed text-paper/70">{SITE.tagline}</p>
          <p className="text-sm text-paper/60">{SITE.description}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Account
          </p>
          <ul className="space-y-2">
            {FOOTER_LINKS.account.map((link) => (
              <li key={link.label}>
                {'soon' in link && link.soon ? (
                  <span className="inline-flex items-center gap-2 text-sm text-paper/50">
                    {link.label}
                    <ComingSoon className="bg-white/10 text-paper/70" />
                  </span>
                ) : (
                  <Link to={link.href} className="text-sm text-paper/80 hover:text-accent">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Legal
          </p>
          <ul className="space-y-2">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-paper/80 hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link to={PATHS.advertise} className="mt-4 inline-block text-sm text-paper/80 hover:text-accent">
            Advertise on RE Network
          </Link>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Stay updated
          </p>
          <p className="text-sm text-paper/70">
            Local projects, new referrals, and featured campaigns.
          </p>
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              name="email"
              type="email"
              placeholder="you@email.com"
              className="border-white/15 bg-white/5 text-paper placeholder:text-paper/40"
              aria-label="Email"
            />
            <Button type="submit" variant="accent" className="shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built for Property Service Providers.</p>
        </Container>
      </div>
    </footer>
  )
}
