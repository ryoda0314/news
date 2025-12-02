import { fetchFeeds } from './fetchFeeds';
import { filterAndScore } from './filterAndScore';
import { generateSummary, generateIndustryMemo } from './summarize';
import { NewsItem } from './types';
import { Language } from './i18n';

interface NewsData {
    news: NewsItem[];
    memo: string;
}

// Cache per language
const cache: Record<string, { data: NewsData, timestamp: number }> = {};
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export async function getNews(language: Language = 'jp'): Promise<NewsData> {
    if (cache[language] && Date.now() - cache[language].timestamp < CACHE_DURATION) {
        return cache[language].data;
    }

    try {
        const rawItems = await fetchFeeds();
        const scoredItems = filterAndScore(rawItems);

        // Process top 20 items
        const topItems = scoredItems.slice(0, 20);

        const summarizedItems = await Promise.all(topItems.map(async (item) => {
            const context = item.title + "\n" + item.summaryLong;
            const [short, long] = await Promise.all([
                generateSummary(context, 'short', language),
                generateSummary(context, 'long', language)
            ]);
            return { ...item, summaryShort: short, summaryLong: long };
        }));

        const memo = await generateIndustryMemo(summarizedItems, language);
        const result = { news: summarizedItems, memo };

        cache[language] = { data: result, timestamp: Date.now() };
        return result;
    } catch (error) {
        console.error("Failed to get news:", error);
        return { news: [], memo: "Failed to fetch news." };
    }
}
