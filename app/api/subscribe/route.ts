import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email')?.toString() ?? ''

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // TODO: Wire to ConvertKit or Mailchimp
    // ConvertKit example:
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID
    // await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
    // })

    // Mailchimp example:
    // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
    // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID
    // const MAILCHIMP_DC = MAILCHIMP_API_KEY?.split('-')[1]
    // await fetch(`https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: { Authorization: `apikey ${MAILCHIMP_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    // })

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
