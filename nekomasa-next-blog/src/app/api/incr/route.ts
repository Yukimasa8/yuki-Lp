import { writeClient } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const { id } = await req.json();

    console.log('Received ID:', id);

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
        console.error('SANITY_API_TOKEN is missing');
        return NextResponse.json({ error: 'Internal Configuration Error: Token missing' }, { status: 500 });
    }

    try {
        console.log('Attempting to patch post with ID:', id);
        const updatedPost = await writeClient
            .patch(id)
            .setIfMissing({ views: 0 })
            .inc({ views: 1 })
            .commit();

        console.log('Updated post:', updatedPost);
        return NextResponse.json({ views: updatedPost.views });
    } catch (error: any) {
        console.error('Failed to increment views:', error);
        return NextResponse.json({ error: error.message || 'Failed to increment views' }, { status: 500 });
    }
}
