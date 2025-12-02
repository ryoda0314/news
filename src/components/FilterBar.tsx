'use client';

import { NewsCategory } from '@/lib/types';
import { clsx } from 'clsx';
import { Filter, Layers, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterBarProps {
    categories: NewsCategory[];
    companies: string[];
    selectedCategory: NewsCategory | 'all';
    selectedCompany: string | 'all';
    onSelectCategory: (cat: NewsCategory | 'all') => void;
    onSelectCompany: (comp: string | 'all') => void;
}

export default function FilterBar({
    categories,
    companies,
    selectedCategory,
    selectedCompany,
    onSelectCategory,
    onSelectCompany,
}: FilterBarProps) {
    const { t } = useLanguage();

    return (
        <div className="relative mb-8">
            {/* Gradient glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />

            {/* Container */}
            <div className="relative glass-strong rounded-2xl p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg">
                        <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gradient">{t.filters}</h2>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <span>{t.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <FilterButton
                            label={t.all}
                            isActive={selectedCategory === 'all'}
                            onClick={() => onSelectCategory('all')}
                            variant="category"
                        />
                        {categories.map((cat) => (
                            <FilterButton
                                key={cat}
                                label={cat}
                                isActive={selectedCategory === cat}
                                onClick={() => onSelectCategory(cat)}
                                variant="category"
                            />
                        ))}
                    </div>
                </div>

                {/* Companies */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        <span>{t.company}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <FilterButton
                            label={t.all}
                            isActive={selectedCompany === 'all'}
                            onClick={() => onSelectCompany('all')}
                            variant="company"
                        />
                        {companies.map((comp) => (
                            <FilterButton
                                key={comp}
                                label={comp}
                                isActive={selectedCompany === comp}
                                onClick={() => onSelectCompany(comp)}
                                variant="company"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable filter button component
function FilterButton({
    label,
    isActive,
    onClick,
    variant,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
    variant: 'category' | 'company';
}) {
    const gradientClass = variant === 'category'
        ? 'from-cyan-500 to-purple-500'
        : 'from-purple-500 to-pink-500';

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                'relative px-4 py-2 rounded-full text-sm font-semibold transition-all overflow-hidden',
                'capitalize',
                isActive ? 'text-white' : 'text-slate-300 hover:text-white'
            )}
        >
            {/* Active gradient background */}
            {isActive && (
                <motion.div
                    layoutId={`active-${variant}`}
                    className={clsx('absolute inset-0 bg-gradient-to-r rounded-full', gradientClass)}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
            )}

            {/* Active glow */}
            {isActive && (
                <div className={clsx('absolute inset-0 bg-gradient-to-r rounded-full blur-md opacity-50', gradientClass)} />
            )}

            {/* Inactive background */}
            {!isActive && (
                <div className="absolute inset-0 bg-slate-700/30 rounded-full border border-slate-600/50" />
            )}

            {/* Hover effect */}
            {!isActive && (
                <div className="absolute inset-0 bg-slate-600/50 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            )}

            <span className="relative z-10">{label}</span>
        </motion.button>
    );
}
