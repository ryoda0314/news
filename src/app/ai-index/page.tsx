'use client';

import { useState } from 'react';
import { MODELS } from '@/data/models';
import { TOOLS } from '@/data/tools';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { ExternalLink, BookOpen, Wrench } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IndexPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'models' | 'tools'>('models');

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="space-y-3">
                <h1 className="text-4xl font-bold text-white flex items-center">
                    <BookOpen className="w-10 h-10 mr-3 text-blue-400" />
                    {t.indexTitle}
                </h1>
                <p className="text-lg text-slate-400">
                    {t.indexSubtitle}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-800/50 p-1.5 rounded-xl w-fit border border-slate-700/50">
                {(['models', 'tools'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            'px-6 py-3 rounded-lg text-sm font-medium transition-all relative flex items-center space-x-2',
                            activeTab === tab
                                ? 'text-white bg-blue-600 shadow-lg shadow-blue-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        )}
                    >
                        {tab === 'models' ? (
                            <BookOpen className="w-4 h-4" />
                        ) : (
                            <Wrench className="w-4 h-4" />
                        )}
                        <span className="capitalize">{tab === 'models' ? t.tabModels : t.tabTools}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='wait'>
                    {activeTab === 'models' ? (
                        MODELS.map((model) => (
                            <motion.div
                                key={model.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {model.name}
                                    </h3>
                                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-600/50">
                                        {model.developer}
                                    </span>
                                </div>

                                <p className="text-sm text-slate-300 mb-4 leading-relaxed min-h-[4rem]">
                                    {model.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {model.tags.map(tag => (
                                        <span key={tag} className="text-xs text-slate-400 bg-slate-700/30 px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-xs text-slate-500 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                    {t.updated}: {model.lastUpdate}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        TOOLS.map((tool) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {tool.name}
                                    </h3>
                                    <a
                                        href={tool.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>

                                <p className="text-sm text-slate-300 mb-4 leading-relaxed min-h-[4rem]">
                                    {tool.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tool.tags.map(tag => (
                                        <span key={tag} className="text-xs text-slate-400 bg-slate-700/30 px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-xs text-slate-500">
                                    {t.developer}: {tool.developer}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
