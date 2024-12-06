import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const body = await request.json()
    const blobs = [];

    for (const images of body) {
        const blob = await put(images.imageName, images.imageUrls, {
        access: 'public',
        });
        blobs.push(blob);
    }

    return NextResponse.json(blobs);
}