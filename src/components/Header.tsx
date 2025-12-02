'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Zap, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/i18n';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const NAV_ITEMS = [
        { name: t.navToday, href: '/' },
        { name: t.navTimeline, href: '/timeline' },
        { name: t.navIndex, href: '/ai-index' },
    ];

    return (
        <header className="sticky top-0 left-0 right-0 z-50 glass-strong border-b border-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-gradient-to-br from-cyan-500 to-purple-500 p-2 rounded-lg">
                            <Zap className="w-5 h-5 text-white" fill="white" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-gradient tracking-tight">
                            {t.appName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                            {t.appSubtitle}
                        </span>
                    </div>
                </Link>

                {/* Navigation & Language Selector */}
                <div className="flex items-center space-x-4">
                    {/* Navigation */}
                    <nav className="flex items-center space-x-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group"
                                >
                                    <motion.div
                                        className={clsx(
                                            'relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all overflow-hidden',
                                            isActive
                                                ? 'text-white'
                                                : 'text-slate-300 hover:text-white'
                                        )}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Active background with gradient */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        {/* Hover glow effect */}
                                        {!isActive && (
                                            <div className="absolute inset-0 bg-slate-700/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}

                                        {/* Active glow */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-50" />
                                        )}

                                        <span className="relative z-10">{item.name}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all text-sm font-medium text-slate-300 hover:text-white"
                        >
                            <Globe className="w-4 h-4" />
                            <span>{languages.find(l => l.code === language)?.flag}</span>
                        </button>

                        <AnimatePresence>
                            {showLanguageMenu && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowLanguageMenu(false)}
                                    />

                                    {/* Dropdown Menu */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 glass-strong rounded-xl border border-slate-700/50 overflow-hidden z-50"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setShowLanguageMenu(false);
                                                }}
                                                className={clsx(
                                                    'w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all',
                                                    language === lang.code
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white'
                                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                )}
                                            >
                                                <span className="text-lg">{lang.flag}</span>
                                                <span>{lang.name}</span>
                                                {language === lang.code && (
                                                    <span className="ml-auto text-cyan-400">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
