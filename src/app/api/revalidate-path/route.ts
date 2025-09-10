// ./src/app/api/revalidate-path/route.ts

import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = { _id?: string, type?: string, isPage?: boolean }

export async function POST(req: NextRequest) {
    try {
        if (!process.env.SANITY_REVALIDATE_SECRET) {
            return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', { status: 500 })
        }

        const { isValidSignature, body } = await parseBody<WebhookPayload>(
            req,
            process.env.SANITY_REVALIDATE_SECRET,
        )

        if (!isValidSignature) {
            const message = 'Invalid signature'
            return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 })
        }
        
        revalidatePath("/");
        revalidateTag("homepage");

        if (body?._id) {
            revalidateTag(`posts-${body._id}`);
            revalidatePath(`/posts/${body._id}`);
        }

        const message = `Updated routes`
        return NextResponse.json({ body, message })
    } catch (err) {
        console.error(err)
        const message = err instanceof Error ? err.message : 'Unknown error'
        return new Response(message, { status: 500 })
    }
}