import { cookies } from 'next/headers'
import { adminConfigured, checkPassword, isAdmin, newSession, SESSION_COOKIE } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json({ admin: await isAdmin(), configured: adminConfigured() })
}

/** Sign in with the admin password */
export async function POST(request: Request) {
  if (!adminConfigured()) return Response.json({ error: 'The admin password has not been set up yet.' }, { status: 503 })
  const body = await request.json().catch(() => ({}))
  const attempt = typeof body?.password === 'string' ? body.password : ''
  if (!checkPassword(attempt)) {
    await new Promise((resolve) => setTimeout(resolve, 800)) // slow down guessing
    return Response.json({ error: 'That password is not correct.' }, { status: 401 })
  }
  const session = newSession()
  const store = await cookies()
  store.set(SESSION_COOKIE, session.value, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', expires: session.expires })
  return Response.json({ admin: true })
}

/** Sign out */
export async function DELETE() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  return Response.json({ admin: false })
}
