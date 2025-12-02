export type Language = 'jp' | 'en' | 'kr' | 'cn';

export const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'jp', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kr', name: '한국어', flag: '🇰🇷' },
    { code: 'cn', name: '中文', flag: '🇨🇳' },
];

export const translations = {
    jp: {
        // Header
        appName: 'AI Daily',
        appSubtitle: 'Intelligence Feed',
        navToday: 'Today',
        navTimeline: 'Timeline',
        navIndex: 'Index',

        // Homepage
        pageTitle: "Today's AI Highlights",
        pageSubtitle: '最新の生成AI関連ニュースを毎日お届けします',
        dailyMemo: 'Daily Industry Memo',
        viewTimeline: 'View Full Timeline',
        topStories: 'Top Stories',
        sortLatest: '最新',
        sortImportance: '重要度',
        loading: 'ニュースを読み込んでいます...',

        // Timeline
        timelineTitle: 'Timeline',
        timelineSubtitle: '過去のニュースを時系列で確認できます',
        filterAll: 'すべて',
        noResults: 'フィルター条件に一致するニュースが見つかりませんでした',

        // Index
        indexTitle: 'AI Index',
        indexSubtitle: '主要なAIモデルとツールの一覧',
        tabModels: 'Models',
        tabTools: 'Tools',

        // NewsCard
        readMore: 'Read more',
        score: 'Score',
        hot: 'Hot',
        updated: 'Updated',
        developer: 'Developer',

        // Categories
        categoryModel: 'モデル',
        categoryTool: 'ツール',
        categoryBusiness: 'ビジネス',
        categoryResearch: '研究',
        categoryRegulation: '規制',

        // Filters
        filters: 'フィルター',
        category: 'カテゴリー',
        company: '企業',
        all: 'すべて',
    },
    en: {
        // Header
        appName: 'AI Daily',
        appSubtitle: 'Intelligence Feed',
        navToday: 'Today',
        navTimeline: 'Timeline',
        navIndex: 'Index',

        // Homepage
        pageTitle: "Today's AI Highlights",
        pageSubtitle: 'Daily updates on the latest generative AI news',
        dailyMemo: 'Daily Industry Memo',
        viewTimeline: 'View Full Timeline',
        topStories: 'Top Stories',
        sortLatest: 'Latest',
        sortImportance: 'Importance',
        loading: 'Loading news...',

        // Timeline
        timelineTitle: 'Timeline',
        timelineSubtitle: 'Browse past news in chronological order',
        filterAll: 'All',
        noResults: 'No news found matching your filters',

        // Index
        indexTitle: 'AI Index',
        indexSubtitle: 'Directory of major AI models and tools',
        tabModels: 'Models',
        tabTools: 'Tools',

        // NewsCard
        readMore: 'Read more',
        score: 'Score',
        hot: 'Hot',
        updated: 'Updated',
        developer: 'Developer',

        // Categories
        categoryModel: 'Model',
        categoryTool: 'Tool',
        categoryBusiness: 'Business',
        categoryResearch: 'Research',
        categoryRegulation: 'Regulation',

        // Filters
        filters: 'Filters',
        category: 'Category',
        company: 'Company',
        all: 'All',
    },
    kr: {
        // Header
        appName: 'AI Daily',
        appSubtitle: 'Intelligence Feed',
        navToday: '오늘',
        navTimeline: '타임라인',
        navIndex: '인덱스',

        // Homepage
        pageTitle: '오늘의 AI 하이라이트',
        pageSubtitle: '최신 생성형 AI 뉴스를 매일 제공합니다',
        dailyMemo: '일일 산업 메모',
        viewTimeline: '전체 타임라인 보기',
        topStories: '주요 뉴스',
        sortLatest: '최신순',
        sortImportance: '중요도순',
        loading: '뉴스를 불러오는 중...',

        // Timeline
        timelineTitle: '타임라인',
        timelineSubtitle: '과거 뉴스를 시간순으로 확인할 수 있습니다',
        filterAll: '전체',
        noResults: '필터 조건에 맞는 뉴스가 없습니다',

        // Index
        indexTitle: 'AI 인덱스',
        indexSubtitle: '주요 AI 모델 및 도구 목록',
        tabModels: '모델',
        tabTools: '도구',

        // NewsCard
        readMore: '더 읽기',
        score: '점수',
        hot: '인기',
        updated: '업데이트',
        developer: '개발자',

        // Categories
        categoryModel: '모델',
        categoryTool: '도구',
        categoryBusiness: '비즈니스',
        categoryResearch: '연구',
        categoryRegulation: '규제',

        // Filters
        filters: '필터',
        category: '카테고리',
        company: '회사',
        all: '전체',
    },
    cn: {
        // Header
        appName: 'AI Daily',
        appSubtitle: 'Intelligence Feed',
        navToday: '今日',
        navTimeline: '时间线',
        navIndex: '索引',

        // Homepage
        pageTitle: '今日AI要闻',
        pageSubtitle: '每日提供最新生成式AI新闻',
        dailyMemo: '每日行业备忘录',
        viewTimeline: '查看完整时间线',
        topStories: '热门新闻',
        sortLatest: '最新',
        sortImportance: '重要性',
        loading: '正在加载新闻...',

        // Timeline
        timelineTitle: '时间线',
        timelineSubtitle: '按时间顺序浏览过去的新闻',
        filterAll: '全部',
        noResults: '未找到符合筛选条件的新闻',

        // Index
        indexTitle: 'AI索引',
        indexSubtitle: '主要AI模型和工具目录',
        tabModels: '模型',
        tabTools: '工具',

        // NewsCard
        readMore: '阅读更多',
        score: '评分',
        hot: '热门',
        updated: '更新',
        developer: '开发者',

        // Categories
        categoryModel: '模型',
        categoryTool: '工具',
        categoryBusiness: '商业',
        categoryResearch: '研究',
        categoryRegulation: '监管',

        // Filters
        filters: '筛选',
        category: '类别',
        company: '公司',
        all: '全部',
    },
};

export function getTranslation(lang: Language) {
    return translations[lang];
}
