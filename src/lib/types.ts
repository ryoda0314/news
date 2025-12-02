export type NewsCategory = "model" | "tool" | "business" | "research" | "regulation";

export interface NewsItem {
    id: string;
    title: string;
    source: string;        // "OpenAI Blog" / "Google AI Blog" / "Google Cloud" / "Google Developers" etc.
    url: string;           // Original article URL
    date: string;          // ISO string
    summaryShort: string;  // 1-2 lines
    summaryLong: string;   // 3-8 lines
    tags: string[];        // ["GPT5", "Gemini3", "Antigravity", "OpenAI"] etc.
    category: NewsCategory;
    company?: string;      // "OpenAI" | "Google" | "Anthropic" | "Meta" | ...
    importance: number;    // 0-100
}
