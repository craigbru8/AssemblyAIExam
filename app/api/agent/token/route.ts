import { NextResponse } from 'next/server'

/** Voice Agent ephemeral token mint (Bearer auth per product docs). */

export async function GET() {
  const key = process.env.ASSEMBLYAI_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'missing_assemblyai_api_key' }, { status: 500 })
  }

  try {
    const url = new URL('https://agents.assemblyai.com/v1/token')
    url.searchParams.set('expires_in_seconds', '300')
    url.searchParams.set('max_session_duration_seconds', '3600')

    const upstream = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      cache: 'no-store',
    })

    const bodyUnknown: unknown = await upstream.json()

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'token_upstream_failed', status: upstream.status, body: bodyUnknown },
        { status: 502 },
      )
    }

    const body = bodyUnknown as { token?: string }
    if (!body.token) {
      return NextResponse.json({ error: 'token_missing_in_response', body }, { status: 502 })
    }

    return NextResponse.json({ token: body.token })
  } catch (e) {
    return NextResponse.json({ error: 'token_fetch_exception', detail: `${e}` }, { status: 502 })
  }
}
