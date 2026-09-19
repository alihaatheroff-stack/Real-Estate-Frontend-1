import { useSearchParams } from 'react-router-dom'
import { SettingsNav } from '@/features/network/components/settings/SettingsNav'
import {
  BlockingPanel,
  EditProfilePanel,
  LanguagePanel,
  NotificationSettingsPanel,
  PasswordSecurityPanel,
  ViewingSharingPanel,
} from '@/features/network/components/settings/SettingsPanels'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { parseSettingsTab, type SettingsTab } from '@/features/network/data/settings'

export function NetworkSettingsPage() {
  const [params, setParams] = useSearchParams()
  const tab = parseSettingsTab(params.get('tab'))

  function selectTab(next: SettingsTab) {
    setParams({ tab: next }, { replace: true })
  }

  return (
    <NetworkPageFrame hideRight>
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="h-fit lg:sticky lg:top-4">
          <SettingsNav tab={tab} onSelect={selectTab} />
        </div>
        <section className="overflow-visible rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] sm:p-7">
          {tab === 'profile' ? <EditProfilePanel /> : null}
          {tab === 'language' ? <LanguagePanel /> : null}
          {tab === 'blocking' ? <BlockingPanel /> : null}
          {tab === 'notification' ? <NotificationSettingsPanel /> : null}
          {tab === 'security' ? <PasswordSecurityPanel /> : null}
          {tab === 'viewing' ? <ViewingSharingPanel /> : null}
        </section>
      </div>
    </NetworkPageFrame>
  )
}
