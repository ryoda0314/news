import type Parser from 'rss-parser';

export interface FeedConfig {
    url: string;
    source: string;
    company?: string;
}

const FEEDS: FeedConfig[] = [
    { url: 'https://openai.com/news/rss.xml', source: 'OpenAI Blog', company: 'OpenAI' },
    { url: 'https://blog.google/technology/ai/rss/', source: 'Google AI Blog', company: 'Google' },
    { url: 'https://feeds.feedburner.com/blogspot/gJZg', source: 'Google Developers Blog', company: 'Google' },
    { url: 'https://blogs.microsoft.com/ai/feed/', source: 'Microsoft AI Blog', company: 'Microsoft' },
];

export interface RawNewsItem {
    title: string;
    link: string;
    pubDate: string;
    contentSnippet?: string;
    content?: string;
    source: string;
    company?: string;
}

export async function fetchFeeds(): Promise<RawNewsItem[]> {
    // Lazy load rss-parser to avoid build-time issues
    const Parser = (await import('rss-parser')).default;
    const parser = new Parser();

    const promises = FEEDS.map(async (feed) => {
        try {
            const feedResult = await parser.parseURL(feed.url);
            return feedResult.items.map((item) => ({
                title: item.title || 'No Title',
                link: item.link || '',
                pubDate: item.pubDate || new Date().toISOString(),
                contentSnippet: item.contentSnippet || item.content || '',
                content: item.content || item.contentSnippet || '',
                source: feed.source,
                company: feed.company,
            }));
        } catch (error) {
            console.error(`Error fetching feed ${feed.url}:`, error);
            return [];
        }
    });

    const results = await Promise.all(promises);
    return results.flat();
}
