import { writeClient } from '@/lib/sanity';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    try {
        const updatedPost = await writeClient
            .patch(id)
            .setIfMissing({ views: 0 })
            .inc({ views: 1 })
            .commit();

        return NextResponse.json({ views: updatedPost.views });
    } catch (error) {
        console.error('Failed to increment views:', error);
        return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }
}
