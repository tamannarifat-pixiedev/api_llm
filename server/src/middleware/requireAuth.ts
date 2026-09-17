import type { Request, Response, NextFunction } from 'express';
import { validateSession, type SessionUser } from '../services/auth.js';

// Dashboard auth is disabled: the dashboard is a local, single-operator tool
// that loads straight in — no account, no login, no first-run setup. Every
// /api/* request is treated as the operator. A still-valid session token (the
// desktop app mints a hidden account; tests mint their own) resolves to that
// account so password re-verification endpoints (key reveal/export) keep
// working; otherwise a fixed synthetic identity is attached. The /v1 proxy is
// NOT affected — it keeps its own unified-API-key auth for app clients.
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
    ?? (req.headers['x-dashboard-token'] as string | undefined);
  const session = token ? validateSession(token) : undefined;
  (req as Request & { user?: SessionUser }).user = session ?? { userId: 0, email: 'local@localhost' };
  next();
}
