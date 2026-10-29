/**
 * Server-only password check and session cookie for the Media admin panel.
 * The password comes from the ADMIN_PASSWORD environment variable (set in Vercel), never from the code.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'hf_admin'
const SESSION_DAYS = 7

const password = () => process.env.ADMIN_PASSWORD ?? ''
export const adminConfigured = () => password().length > 0

const sha256 = (value: string) => createHash('sha256').update(value).digest()
// Signed with the password itself, so changing the password signs everyone out
const sign = (expires: number) => createHmac('sha256', password()).update(`hf-admin:${expires}`).digest('base64url')

export function checkPassword(attempt: string) {
  return adminConfigured() && timingSafeEqual(sha256(attempt), sha256(password()))
}

export function newSession() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  return { value: `${expires}.${sign(expires)}`, expires: new Date(expires) }
}

function validSession(token: string | undefined) {
  if (!adminConfigured() || !token) return false
  const [raw, signature = ''] = token.split('.')
  const expires = Number(raw)
  if (!expires || expires < Date.now()) return false
  const expected = Buffer.from(sign(expires))
  const given = Buffer.from(signature)
  return given.length === expected.length && timingSafeEqual(given, expected)
}

export async function isAdmin() {
  const store = await cookies()
  return validSession(store.get(SESSION_COOKIE)?.value)
}
