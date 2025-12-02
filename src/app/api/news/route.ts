import { NextResponse } from 'next/server';
import { getNews } from '@/lib/getNews';
import { Language } from '@/lib/i18n';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = (searchParams.get('lang') as Language) || 'jp';

    try {
        const { news, memo } = await getNews(lang);
        return NextResponse.json({ news, memo });
    } catch (error) {
        console.error('Error in /api/news:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
