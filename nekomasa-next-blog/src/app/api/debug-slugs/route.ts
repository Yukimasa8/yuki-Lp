import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const posts = await client.fetch(`*[_type == "post"]{title, "slug": slug.current}`);
    return NextResponse.json(posts);
}
