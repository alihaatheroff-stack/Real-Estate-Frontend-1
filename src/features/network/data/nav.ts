import {
  Bell,
  Bookmark,
  Clapperboard,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  MessageCircle,
  MessagesSquare,
  Newspaper,
  NotebookPen,
  Settings,
  UserPlus,
  UserRound,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { PATHS, networkGroupPath, networkProfilePath } from '@/app/router/paths'
import { NETWORK_GROUPS } from '@/features/network/data/community'
import { CURRENT_MEMBER_ID } from '@/features/network/data/members'

export type NetworkNavLink = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
  /** Indent under a parent section (e.g. named groups). */
  nested?: boolean
}

const [groupOne, groupTwo] = NETWORK_GROUPS

export const NETWORK_SIDEBAR_LINKS: NetworkNavLink[] = [
  { to: PATHS.networkFeed, label: 'News feed', icon: LayoutGrid, end: true },
  { to: PATHS.networkArticles, label: 'Articles', icon: Newspaper },
  { to: PATHS.networkForums, label: 'Forums', icon: MessagesSquare },
  { to: PATHS.networkGroups, label: 'Groups', icon: UsersRound },
  {
    to: networkGroupPath(groupOne.id),
    label: groupOne.name,
    icon: UserRound,
    nested: true,
  },
  {
    to: networkGroupPath(groupTwo.id),
    label: groupTwo.name,
    icon: UserRound,
    nested: true,
  },
  { to: `${PATHS.networkFriends}?tab=followers`, label: 'Followers', icon: Users },
  { to: `${PATHS.networkFriends}?tab=following`, label: 'Following', icon: UserPlus },
  { to: `${PATHS.networkFriends}?tab=requests`, label: 'Friends', icon: Users },
  { to: PATHS.networkFriends, label: 'My community', icon: Users, end: true },
  { to: PATHS.networkMessages, label: 'Messages', icon: MessageCircle },
  { to: PATHS.networkNotifications, label: 'Notification', icon: Bell },
  { to: PATHS.networkWatch, label: 'Clips videos', icon: Clapperboard },
  { to: PATHS.networkNotes, label: 'Notes', icon: NotebookPen },
  { to: PATHS.networkEducation, label: 'Education', icon: GraduationCap },
  { to: PATHS.networkDashboard, label: 'Dashboard', icon: LayoutDashboard },
  { to: PATHS.networkSaved, label: 'Saved', icon: Bookmark },
  { to: PATHS.networkExplore, label: 'Explore', icon: Compass },
  { to: networkProfilePath(CURRENT_MEMBER_ID), label: 'Profile', icon: UserRound },
  { to: PATHS.networkSettings, label: 'Settings', icon: Settings },
]

export const NETWORK_MOBILE_TABS: NetworkNavLink[] = [
  { to: PATHS.networkFeed, label: 'News feed', icon: LayoutGrid, end: true },
  { to: PATHS.networkFriends, label: 'Community', icon: Users },
  { to: PATHS.networkExplore, label: 'Explore', icon: Compass },
  { to: PATHS.networkNotifications, label: 'Alerts', icon: Bell },
]
