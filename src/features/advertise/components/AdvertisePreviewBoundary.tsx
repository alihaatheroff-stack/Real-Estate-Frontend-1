import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  error: Error | null
}

/** Keeps the create form usable if the live preview throws. */
export class AdvertisePreviewBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AdvertisePreviewBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl border border-line bg-white p-4 text-sm text-muted">
            Preview hit an error. Your form below still works — try refreshing if the badge
            doesn’t show.
            <button
              type="button"
              className="mt-2 block text-sm font-semibold text-brand underline"
              onClick={() => this.setState({ error: null })}
            >
              Retry preview
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
