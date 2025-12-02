'use client';

import { useState, useEffect } from 'react';
import { NewsItem, NewsCategory } from '@/lib/types';
import NewsCard from '@/components/NewsCard';
import FilterBar from '@/components/FilterBar';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TimelinePage() {
    const { t, language } = useLanguage();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
    const [selectedCompany, setSelectedCompany] = useState<string | 'all'>('all');

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                const res = await fetch(`/api/news?lang=${language}`);
                const data = await res.json();
                setNews(data.news || []);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [language]);

    const categories: NewsCategory[] = ['model', 'tool', 'business', 'research', 'regulation'];
    const companies = Array.from(new Set(news.map(n => n.company).filter(Boolean) as string[]));

    const filteredNews = news.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        if (selectedCompany !== 'all' && item.company !== selectedCompany) return false;
        return true;
    });

    // Group by date
    const groupedNews: Record<string, NewsItem[]> = {};
    filteredNews.forEach(item => {
        const dateKey = format(new Date(item.date), 'yyyy-MM-dd');
        if (!groupedNews[dateKey]) groupedNews[dateKey] = [];
        groupedNews[dateKey].push(item);
    });

    const sortedDates = Object.keys(groupedNews).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-slate-400">{t.loading}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="space-y-3">
                <h1 className="text-4xl font-bold text-white flex items-center">
                    <Clock className="w-10 h-10 mr-3 text-blue-400" />
                    {t.timelineTitle}
                </h1>
                <p className="text-lg text-slate-400">
                    {t.timelineSubtitle}
                </p>
            </div>

            {/* Filters */}
            <FilterBar
                categories={categories}
                companies={companies}
                selectedCategory={selectedCategory}
                selectedCompany={selectedCompany}
                onSelectCategory={setSelectedCategory}
                onSelectCompany={setSelectedCompany}
            />

            {/* Timeline */}
            <div className="space-y-10">
                {sortedDates.map(date => (
                    <section key={date} className="space-y-4">
                        <div className="sticky top-24 z-20 bg-slate-900/95 backdrop-blur-sm py-3 border-b border-slate-700/50">
                            <h2 className="text-xl font-bold text-white">
                                {format(new Date(date), 'MMMM d, yyyy')}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pl-6 border-l-2 border-slate-700/50">
                            <AnimatePresence mode='popLayout'>
                                {groupedNews[date].map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NewsCard item={item} variant="full" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                ))}

                {sortedDates.length === 0 && (
                    <div className="text-center py-20 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                        <p className="text-slate-400 text-lg">{t.noResults}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
