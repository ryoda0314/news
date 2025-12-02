'use client';

import { NewsItem } from '@/lib/types';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Tag, TrendingUp, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsCardProps {
    item: NewsItem;
    variant?: 'compact' | 'full';
}

export default function NewsCard({ item, variant = 'full' }: NewsCardProps) {
    const { t } = useLanguage();

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative"
        >
            {/* Gradient glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />

            {/* Card container */}
            <div className="relative glass rounded-2xl p-6 hover:bg-slate-800/60 transition-all duration-300 h-full flex flex-col">
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Header with meta info */}
                <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 text-xs">
                        <span className="flex items-center text-slate-400">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {format(new Date(item.date), 'MMM d, yyyy')}
                        </span>
                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                        <span className="font-semibold text-gradient">
                            {item.source}
                        </span>
                    </div>

                    {/* Importance Badge */}
                    {item.importance > 80 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg blur-md opacity-50" />
                            <div className="relative flex items-center px-2.5 py-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg">
                                <TrendingUp className="w-3 h-3 mr-1 text-white" />
                                <span className="text-xs font-black text-white uppercase tracking-wide">
                                    {t.hot}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-bold text-white mb-3 leading-tight group-hover:text-gradient transition-all duration-300">
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none"
                    >
                        <span className="absolute inset-0 -m-6" aria-hidden="true" />
                        {item.title}
                    </a>
                </h3>

                {/* Summary */}
                <p className="relative text-sm text-slate-300 mb-5 leading-relaxed flex-grow line-clamp-3">
                    {variant === 'compact' ? item.summaryShort : item.summaryLong}
                </p>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 4).map((tag, index) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                        >
                            <Tag className="w-3 h-3 mr-1.5 opacity-60" />
                            {tag}
                        </motion.span>
                    ))}
                </div>

                {/* Footer with external link icon */}
                <div className="relative flex items-center justify-between pt-3 border-t border-slate-700/50">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-cyan-400 opacity-60" />
                        <span className="text-xs text-slate-400 font-medium">
                            {t.score}: <span className="text-cyan-400 font-bold">{item.importance}</span>
                        </span>
                    </div>

                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex items-center space-x-1 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            className="flex items-center space-x-1"
                            whileHover={{ x: 3 }}
                        >
                            <span className="font-medium">{t.readMore}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </motion.div>
                    </a>
                </div>
            </div>
        </motion.article>
    );
}
