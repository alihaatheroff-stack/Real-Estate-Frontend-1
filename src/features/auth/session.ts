import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 're-auth-session'
const CHANGE_EVENT = 're-auth-change'
const TOUR_PENDING_KEY = 're-header-tour-pending'
const TOUR_DONE_KEY = 're-header-tour-done'
const TOUR_SESSION_HIDDEN_KEY = 're-header-tour-session-hidden'
const TOUR_CHANGE_EVENT = 're-header-tour-change'
/** After first-time registration, show marketing landing instead of member hub. */
const POST_REGISTER_LANDING_KEY = 're-post-register-landing'
const LANDING_PREF_CHANGE_EVENT = 're-landing-pref-change'

function readAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function readHeaderTourPending(): boolean {
  try {
    if (localStorage.getItem(TOUR_DONE_KEY) === '1') return false
    if (sessionStorage.getItem(TOUR_SESSION_HIDDEN_KEY) === '1') return false
    return localStorage.getItem(TOUR_PENDING_KEY) === '1'
  } catch {
    return false
  }
}

function emitTourChange() {
  window.dispatchEvent(new Event(TOUR_CHANGE_EVENT))
}

function subscribeTour(onStoreChange: () => void) {
  window.addEventListener(TOUR_CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(TOUR_CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function readPreferMarketingLanding(): boolean {
  try {
    return sessionStorage.getItem(POST_REGISTER_LANDING_KEY) === '1'
  } catch {
    return false
  }
}

function emitLandingPrefChange() {
  window.dispatchEvent(new Event(LANDING_PREF_CHANGE_EVENT))
}

function subscribeLandingPref(onStoreChange: () => void) {
  window.addEventListener(LANDING_PREF_CHANGE_EVENT, onStoreChange)
  return () => window.removeEventListener(LANDING_PREF_CHANGE_EVENT, onStoreChange)
}

export function setAuthenticated(value: boolean) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, '1')
    else {
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(POST_REGISTER_LANDING_KEY)
    }
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitChange()
  emitLandingPrefChange()
}

/** Call after a successful registration so the header product tour can start. */
export function markHeaderTourPending() {
  try {
    localStorage.setItem(TOUR_PENDING_KEY, '1')
    localStorage.removeItem(TOUR_DONE_KEY)
    sessionStorage.removeItem(TOUR_SESSION_HIDDEN_KEY)
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitTourChange()
}

/**
 * First-time registration: keep the marketing landing (hero + sections)
 * instead of the signed-in Fiverr-style member hub.
 */
export function markPreferMarketingLanding() {
  try {
    sessionStorage.setItem(POST_REGISTER_LANDING_KEY, '1')
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitLandingPrefChange()
}

/** Returning sign-in: use the Fiverr-style member home. */
export function clearPreferMarketingLanding() {
  try {
    sessionStorage.removeItem(POST_REGISTER_LANDING_KEY)
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitLandingPrefChange()
}

/** Permanently dismiss the header tour (Don't show again). */
export function completeHeaderTour() {
  try {
    localStorage.removeItem(TOUR_PENDING_KEY)
    localStorage.setItem(TOUR_DONE_KEY, '1')
    sessionStorage.removeItem(TOUR_SESSION_HIDDEN_KEY)
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitTourChange()
}

/** Hide the tour for this browser tab/session only. */
export function dismissHeaderTourForSession() {
  try {
    sessionStorage.setItem(TOUR_SESSION_HIDDEN_KEY, '1')
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitTourChange()
}

export function signOut() {
  setAuthenticated(false)
}

export function useIsAuthenticated() {
  return useSyncExternalStore(subscribe, readAuthenticated, () => false)
}

export function useHeaderTourPending() {
  return useSyncExternalStore(subscribeTour, readHeaderTourPending, () => false)
}

export function usePreferMarketingLanding() {
  return useSyncExternalStore(subscribeLandingPref, readPreferMarketingLanding, () => false)
}
