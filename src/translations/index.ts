// Translation system that can be easily extended to support more languages
import { Language } from '@/common/constants';

export interface Translations {
    // Page titles and descriptions
    offerTitle: string;
    reviewsDescription: string;
    aPost: string;

    // Loading and error states
    loadingMerchant: string;
    merchantNotFound: string;
    merchantNotFoundTitle: string;
    noStoreIdentifier: string;
    merchantNotFoundDescription: string;

    // Form sections
    howWasYourMeal: string;
    whatDishesYouOrdered: string;

    // Form labels and placeholders
    dishName: string;
    dishNamePlaceholder: string;
    rating: string;
    ratingPlaceholder: string;
    review: string;
    reviewPlaceholder: string;
    required: string;

    // Buttons
    addAnotherDish: string;
    generatePost: string;
    postGenerated: string;
    copyToClipboard: string;
    makeInstagramPost: string;
    makeTikTokPost: string;
    makeRedNotePost: string;
    remove: string;

    // Meal experience questions
    visitType: string;
    dinedWith: string;
    firstImpression: string;
    paceWait: string;
    serviceFeel: string;
    value: string;

    // Social media post
    generatedSocialMediaPost: string;
    characterCount: string;
    postCopiedToClipboard: string;

    // Validation messages
    pleaseAnswerAllQuestions: string;
    missing: string;
    fillOutOneDish: string;
    completeAllDishes: string;

    // Success/Error messages
    successfullyGenerated: string;
    characters: string;
    errorGenerating: string;
    errorSubmitting: string;
    failedToCopy: string;

    // Dish accordion
    dish: string;
    submitting: string;
    submitReviews: string;

    // Generation language selector
    generationLanguage: string;
    selectGenerationLanguage: string;
    generateInEnglish: string;
    generateInChinese: string;
}

const translations: Record<Language, Translations> = {
    [Language.ENGLISH]: {
        // Page titles and descriptions
        offerTitle: 'Offer',
        reviewsDescription: 'Guava AI helps generate a post with a few clicks',
        aPost: 'a Post',

        // Loading and error states
        loadingMerchant: 'Loading merchant information...',
        merchantNotFound: 'Merchant Not Found',
        merchantNotFoundTitle: 'Merchant Not Found',
        noStoreIdentifier: 'No store identifier provided in the URL.',
        merchantNotFoundDescription: 'The merchant with the provided identifier could not be found.',

        // Form sections
        howWasYourMeal: '🍽️ How was your meal',
        whatDishesYouOrdered: '🥘 What dishes you ordered',

        // Form labels and placeholders
        dishName: 'Dish Name',
        dishNamePlaceholder: 'e.g., Grilled Salmon',
        rating: 'Rating (1-10)',
        ratingPlaceholder: '8',
        review: 'Review',
        reviewPlaceholder: 'Share your thoughts about this dish...',
        required: '*',

        // Buttons
        addAnotherDish: 'Add Another Dish',
        generatePost: 'Generate Post',
        postGenerated: 'Post Generated',
        copyToClipboard: 'Copy to Clipboard',
        makeInstagramPost: 'Make a Instagram Post',
        makeTikTokPost: 'Make a TikTok Post',
        makeRedNotePost: 'Make a RedNote Post',
        remove: 'Remove',

        // Meal experience questions
        visitType: '🚶 Visit type',
        dinedWith: '👥 Who you dined with',
        firstImpression: '🚪 First impression at the door',
        paceWait: '⏰ Pace & wait',
        serviceFeel: '🙋 Service feel',
        value: '💰 Value',

        // Social media post
        generatedSocialMediaPost: 'Generated Social Media Post',
        characterCount: 'Character count',
        postCopiedToClipboard: '✓ Post copied to clipboard!',

        // Validation messages
        pleaseAnswerAllQuestions: 'Please answer all meal experience questions. Missing:',
        missing: 'Missing:',
        fillOutOneDish:
            'Please fill out at least one complete dish review (dish name, rating, and review are required).',
        completeAllDishes:
            'Please complete all dish reviews. All fields (dish name, rating, and review) are required for each dish.',

        // Success/Error messages
        successfullyGenerated: 'Successfully generated social media post!',
        characters: 'characters',
        errorGenerating: 'Error generating social media post. Please try again.',
        errorSubmitting: 'Error submitting review. Please check your connection and try again.',
        failedToCopy: 'Failed to copy to clipboard',

        // Dish accordion
        dish: 'Dish',
        submitting: 'Submitting...',
        submitReviews: 'Submit Reviews',

        // Generation language selector
        generationLanguage: 'Post Language',
        selectGenerationLanguage: 'Select the language for your generated post',
        generateInEnglish: 'Generate in English',
        generateInChinese: 'Generate in Chinese'
    },

    [Language.CHINESE]: {
        // Page titles and descriptions
        offerTitle: '给',
        reviewsDescription: 'Guava AI帮您小小点击就能获得大大文案',
        aPost: '写一篇帖子',

        // Loading and error states
        loadingMerchant: '正在加载商家信息...',
        merchantNotFound: '未找到商家',
        merchantNotFoundTitle: '未找到商家',
        noStoreIdentifier: 'URL中未提供商家标识符。',
        merchantNotFoundDescription: '无法找到具有所提供标识符的商家。',

        // Form sections
        howWasYourMeal: '🍽️ 您的用餐体验如何',
        whatDishesYouOrdered: '🥘 您点了什么菜',

        // Form labels and placeholders
        dishName: '菜品名称',
        dishNamePlaceholder: '例如：烤三文鱼',
        rating: '评分 (1-10)',
        ratingPlaceholder: '8',
        review: '评价',
        reviewPlaceholder: '分享您对这道菜的想法...',
        required: '*',

        // Buttons
        addAnotherDish: '添加另一道菜',
        generatePost: '生成帖子',
        postGenerated: '帖子已生成',
        copyToClipboard: '复制到剪贴板',
        makeInstagramPost: '发布到 Instagram',
        makeTikTokPost: '发布到 TikTok',
        makeRedNotePost: '发布到小红书',
        remove: '删除',

        // Meal experience questions
        visitType: '🚶 到访类型',
        dinedWith: '👥 用餐伙伴',
        firstImpression: '🚪 进门第一印象',
        paceWait: '⏰ 节奏和等待',
        serviceFeel: '🙋 服务感受',
        value: '💰 性价比',

        // Social media post
        generatedSocialMediaPost: '生成的社交媒体帖子',
        characterCount: '字符数',
        postCopiedToClipboard: '✓ 帖子已复制到剪贴板！',

        // Validation messages
        pleaseAnswerAllQuestions: '请回答所有用餐体验问题。缺少：',
        missing: '缺少：',
        fillOutOneDish: '请至少填写一个完整的菜品评价（菜品名称、评分和评价都是必需的）。',
        completeAllDishes: '请完成所有菜品评价。每道菜的所有字段（菜品名称、评分和评价）都是必需的。',

        // Success/Error messages
        successfullyGenerated: '成功生成社交媒体帖子！',
        characters: '个字符',
        errorGenerating: '生成社交媒体帖子时出错。请重试。',
        errorSubmitting: '提交评价时出错。请检查您的连接并重试。',
        failedToCopy: '复制到剪贴板失败',

        // Dish accordion
        dish: '菜品',
        submitting: '提交中...',
        submitReviews: '提交评价',

        // Generation language selector
        generationLanguage: '帖子语言',
        selectGenerationLanguage: '选择生成帖子的语言',
        generateInEnglish: '用英语生成',
        generateInChinese: '用中文生成'
    }
};

// Meal experience options translations
export const mealExperienceOptions: Record<Language, Record<string, Record<string, string>>> = {
    [Language.ENGLISH]: {
        visitType: {
            'First time': 'First time',
            Regular: 'Regular',
            Tourist: 'Tourist',
            'Date night': 'Date night',
            'Work lunch': 'Work lunch',
            Celebration: 'Celebration'
        },
        dinedWith: {
            Solo: 'Solo',
            Partner: 'Partner',
            Friends: 'Friends',
            Family: 'Family',
            Coworkers: 'Coworkers'
        },
        firstImpression: {
            Cozy: 'Cozy',
            Lively: 'Lively',
            Modern: 'Modern',
            Welcoming: 'Welcoming',
            Bright: 'Bright',
            Dim: 'Dim'
        },
        paceWait: {
            'No wait': 'No wait',
            '10–20 min': '10–20 min',
            '20+ min': '20+ min'
        },
        serviceFeel: {
            'Super friendly': 'Super friendly',
            Professional: 'Professional',
            Efficient: 'Efficient',
            Slow: 'Slow',
            Rude: 'Rude',
            Useless: 'Useless'
        },
        value: {
            'Great value': 'Great value',
            Fair: 'Fair',
            'A bit pricey': 'A bit pricey',
            'Pricey but worth it': 'Pricey but worth it'
        }
    },
    [Language.CHINESE]: {
        visitType: {
            'First time': '初次光临',
            Regular: '常客',
            Tourist: '游客',
            'Date night': '约会',
            'Work lunch': '工作午餐',
            Celebration: '庆祝'
        },
        dinedWith: {
            Solo: '独自',
            Partner: '伴侣',
            Friends: '朋友',
            Family: '家人',
            Coworkers: '同事'
        },
        firstImpression: {
            Cozy: '温馨',
            Lively: '热闹',
            Modern: '现代',
            Welcoming: '亲切',
            Bright: '明亮',
            Dim: '昏暗'
        },
        paceWait: {
            'No wait': '无需等待',
            '10–20 min': '10-20分钟',
            '20+ min': '20+分钟'
        },
        serviceFeel: {
            'Super friendly': '超级友好',
            Professional: '专业',
            Efficient: '高效',
            Slow: '缓慢',
            Rude: '粗鲁',
            Useless: '屁用没有'
        },
        value: {
            'Great value': '超值',
            Fair: '公平',
            'A bit pricey': '略贵',
            'Pricey but worth it': '贵但值得'
        }
    }
};

export function getTranslations(language: Language): Translations {
    return translations[language];
}

export function getMealExperienceOptions(language: Language) {
    return mealExperienceOptions[language];
}

// Generate meal questions structure from the translation data
export function getMealQuestions(language: Language) {
    const options = mealExperienceOptions[language];
    const labels = getTranslations(language);

    return {
        visitType: {
            label: labels.visitType,
            options: Object.keys(options.visitType)
        },
        dinedWith: {
            label: labels.dinedWith,
            options: Object.keys(options.dinedWith)
        },
        firstImpression: {
            label: labels.firstImpression,
            options: Object.keys(options.firstImpression)
        },
        paceWait: {
            label: labels.paceWait,
            options: Object.keys(options.paceWait)
        },
        serviceFeel: {
            label: labels.serviceFeel,
            options: Object.keys(options.serviceFeel)
        },
        value: {
            label: labels.value,
            options: Object.keys(options.value)
        }
    };
}

export default translations;
