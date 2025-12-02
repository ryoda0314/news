import { NewsItem, NewsCategory } from './types';
import { RawNewsItem } from './fetchFeeds';

const KEYWORDS = {
    high: ['GPT-5', 'GPT 5', 'Gemini 3', 'Gemini 1.5', 'Claude Opus', 'Claude 3.5', 'Claude 4', 'Antigravity', 'OpenAI', 'DeepMind', 'Anthropic'],
    medium: ['LLM', 'Generative AI', 'Transformer', 'Agent', 'Copilot', 'Cursor', 'Vertex AI', 'Azure OpenAI'],
    low: ['AI', 'Machine Learning', 'Update', 'Release'],
};

const CATEGORY_KEYWORDS: Record<NewsCategory, string[]> = {
    model: ['GPT', 'Gemini', 'Claude', 'Llama', 'Mistral', 'Model', 'LLM'],
    tool: ['Antigravity', 'Cursor', 'Copilot', 'IDE', 'SDK', 'API', 'Tool'],
    business: ['Investment', 'Acquisition', 'Partnership', 'Revenue', 'IPO'],
    research: ['Paper', 'Research', 'Study', 'Algorithm', 'Benchmark'],
    regulation: ['Regulation', 'Law', 'Policy', 'Safety', 'Ethics', 'EU AI Act'],
};

export function filterAndScore(rawItems: RawNewsItem[]): NewsItem[] {
    return rawItems
        .map(item => scoreItem(item))
        .filter(item => item.importance > 20) // Filter out low importance items
        .sort((a, b) => {
            // First sort by date (newest first)
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateB !== dateA) {
                return dateB - dateA;
            }
            // Then by importance if dates are equal
            return b.importance - a.importance;
        });
}

function scoreItem(item: RawNewsItem): NewsItem {
    let score = 0;
    const text = `${item.title} ${item.contentSnippet}`.toLowerCase();
    const tags: string[] = [];
    let category: NewsCategory = 'model'; // Default

    // Keyword scoring
    KEYWORDS.high.forEach(kw => {
        if (text.includes(kw.toLowerCase())) {
            score += 30;
            tags.push(kw);
        }
    });
    KEYWORDS.medium.forEach(kw => {
        if (text.includes(kw.toLowerCase())) {
            score += 10;
            if (!tags.includes(kw)) tags.push(kw);
        }
    });
    KEYWORDS.low.forEach(kw => {
        if (text.includes(kw.toLowerCase())) score += 5;
    });

    // Source scoring
    if (item.source.includes('OpenAI') || item.source.includes('DeepMind')) score += 20;

    // Recency scoring (simple)
    const date = new Date(item.pubDate);
    const now = new Date();
    const hoursDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (hoursDiff < 24) score += 20;
    else if (hoursDiff < 48) score += 10;

    // Determine category
    let maxCatScore = 0;
    (Object.keys(CATEGORY_KEYWORDS) as NewsCategory[]).forEach(cat => {
        let catScore = 0;
        CATEGORY_KEYWORDS[cat].forEach(kw => {
            if (text.includes(kw.toLowerCase())) catScore++;
        });
        if (catScore > maxCatScore) {
            maxCatScore = catScore;
            category = cat;
        }
    });

    return {
        id: Buffer.from(item.link).toString('base64'),
        title: item.title,
        source: item.source,
        url: item.link,
        date: item.pubDate,
        summaryShort: item.contentSnippet?.slice(0, 100) + '...' || '', // Temporary
        summaryLong: item.contentSnippet?.slice(0, 300) + '...' || '', // Temporary
        tags: Array.from(new Set(tags)).slice(0, 5),
        category,
        company: item.company,
        importance: Math.min(score, 100),
    };
}
