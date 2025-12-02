'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import { ArrowRight, Sparkles, Newspaper, Calendar, Clock, TrendingUp } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import { clsx } from 'clsx';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
    const { t, language } = useLanguage();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [memo, setMemo] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'latest' | 'importance'>('latest');

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                const res = await fetch(`/api/news?lang=${language}`);
                const data = await res.json();
                setNews(data.news || []);
                setMemo(data.memo || '');
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [language]);

    // Sort news based on selected option
    const sortedNews = [...news].sort((a, b) => {
        if (sortBy === 'latest') {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateB !== dateA) {
                return dateB - dateA;
            }
            return b.importance - a.importance;
        } else {
            // Sort by importance
            if (b.importance !== a.importance) {
                return b.importance - a.importance;
            }
            // Then by date if importance is equal
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });

    const topNews = sortedNews.slice(0, 6);

    return (
        <div className="space-y-12 relative">
            {/* Page Header */}
            <div className="text-center space-y-4 py-12">
                <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full text-cyan-400 text-sm font-semibold mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('ja-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black">
                    {t.pageTitle}
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    {t.pageSubtitle}
                </p>
            </div>

            {/* Industry Memo */}
            <section className="max-w-5xl mx-auto">
                <div className="relative group">
                    {/* Animated gradient glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-500" />

                    {/* Card */}
                    <div className="relative glass-strong rounded-3xl p-8 md:p-10">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl">
                                <Newspaper className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gradient">{t.dailyMemo}</h2>
                        </div>

                        <p className="text-base md:text-lg text-slate-300 leading-relaxed whitespace-pre-line mb-8">
                            {memo || t.loading}
                        </p>

                        <Link
                            href="/timeline"
                            className="group/btn inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
                        >
                            {t.viewTimeline}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Top News Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full mr-4" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{t.topStories}</h2>
                    </div>

                    {/* Sort Toggle */}
                    <div className="flex items-center space-x-2 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50">
                        <button
                            onClick={() => setSortBy('latest')}
                            className={clsx(
                                'px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2',
                                sortBy === 'latest'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            )}
                        >
                            <Clock className="w-4 h-4" />
                            <span>{t.sortLatest}</span>
                        </button>
                        <button
                            onClick={() => setSortBy('importance')}
                            className={clsx(
                                'px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2',
                                sortBy === 'importance'
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            )}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span>{t.sortImportance}</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center space-x-3 text-slate-400 text-lg">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                            <p>{t.loading}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topNews.map((item) => (
                            <NewsCard key={item.id} item={item} variant="compact" />
                        ))}
                    </div>
                )}

                {!loading && news.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center space-x-3 text-slate-400 text-lg">
                            <Sparkles className="w-6 h-6 animate-pulse" />
                            <p>{t.loading}</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
