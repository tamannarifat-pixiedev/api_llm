import type { ReactNode } from 'react'

// Dashboard auth removed: there is no account, no login, and no first-run
// setup. This gate used to query /api/auth/status and interpose setup/login
// forms (and desktop session self-repair); it now renders the dashboard
// directly. The server's requireAuth middleware is bypassed in lockstep, so
// /api/* needs no session token.
export function AuthGate({ children }: { children: ReactNode }) {
  return <>{children}</>
}
