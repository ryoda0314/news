import OpenAI from 'openai';
import { NewsItem } from './types';

import { Language } from './i18n';

const PROMPTS = {
    jp: {
        short: "この記事の内容を、日本語で1～2文、80文字以内で要約してください。対象読者はAIに興味のある大学生です。",
        long: "この記事の内容を、日本語で3～5文程度に要約してください。重要なポイントを箇条書き風に含めてください。",
        memo: "以下のニュースから、今日の業界動向を2-3行の日本語でまとめてください（「ざっくり業界メモ」として表示します）。",
        fallback: "要約を生成できませんでした。",
        memoFallback: "本日の主要なニュースをお届けします。詳細は各記事をご確認ください。"
    },
    en: {
        short: "Summarize this article in English in 1-2 sentences, within 150 characters. Target audience: university students interested in AI.",
        long: "Summarize this article in English in 3-5 sentences. Include key points in a bullet-point style.",
        memo: "From the following news items, summarize today's industry trends in English in 2-3 lines (to be displayed as 'Daily Industry Memo').",
        fallback: "Summary unavailable.",
        memoFallback: "Today's major news updates. Please check each article for details."
    },
    kr: {
        short: "이 기사의 내용을 한국어로 1~2문장, 100자 이내로 요약해주세요. 대상 독자는 AI에 관심이 있는 대학생입니다.",
        long: "이 기사의 내용을 한국어로 3~5문장 정도로 요약해주세요. 중요한 포인트를 글머리 기호 스타일로 포함해주세요.",
        memo: "다음 뉴스에서 오늘의 업계 동향을 한국어로 2-3줄로 요약해주세요 ('일일 산업 메모'로 표시됩니다).",
        fallback: "요약을 생성할 수 없습니다.",
        memoFallback: "오늘의 주요 뉴스를 제공합니다. 자세한 내용은 각 기사를 확인해주세요."
    },
    cn: {
        short: "请用中文在1-2句话内总结这篇文章，字数在100字以内。目标读者是对AI感兴趣的大学生。",
        long: "请用中文在3-5句话内总结这篇文章。以要点形式包含重要信息。",
        memo: "从以下新闻中，用中文2-3行总结今天的行业动态（将显示为'每日行业备忘录'）。",
        fallback: "无法生成摘要。",
        memoFallback: "今日主要新闻更新。详情请查看各篇文章。"
    }
};

export async function generateSummary(text: string, type: 'short' | 'long', language: Language = 'jp'): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
        return fallbackSummary(text, type, language);
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const prompt = PROMPTS[language][type];

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that summarizes tech news." },
                { role: "user", content: `${prompt}\n\nArticle content:\n${text.slice(0, 2000)}` }
            ],
            max_tokens: type === 'short' ? 100 : 300,
        });

        return response.choices[0].message.content || fallbackSummary(text, type, language);
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return fallbackSummary(text, type, language);
    }
}

function fallbackSummary(text: string, type: 'short' | 'long', language: Language = 'jp'): string {
    const maxLength = type === 'short' ? 100 : 300;
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + `... (${PROMPTS[language].fallback})`;
}

export async function generateIndustryMemo(news: NewsItem[], language: Language = 'jp'): Promise<string> {
    if (!process.env.OPENAI_API_KEY || news.length === 0) {
        return PROMPTS[language].memoFallback;
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const context = news.slice(0, 10).map(n => `- ${n.title}: ${n.summaryShort}`).join("\n");
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a tech news analyst." },
                { role: "user", content: `${PROMPTS[language].memo}\n\n${context}` }
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content || PROMPTS[language].memoFallback;
    } catch (error) {
        console.error("Memo generation failed:", error);
        return PROMPTS[language].memoFallback;
    }
}
