export interface ModelInfo {
    id: string;
    name: string;
    description: string;
    developer: string;
    lastUpdate: string;
    tags: string[];
}

export const MODELS: ModelInfo[] = [
    {
        id: 'gpt-5',
        name: 'GPT-5',
        description: 'OpenAI\'s next-generation frontier model. Expected to bring significant improvements in reasoning and multimodal capabilities.',
        developer: 'OpenAI',
        lastUpdate: '2025-11-15',
        tags: ['GPT-5', 'OpenAI', 'LLM'],
    },
    {
        id: 'gemini-3',
        name: 'Gemini 3.0',
        description: 'Google\'s most capable multimodal model yet. Features enhanced long-context understanding and agentic capabilities.',
        developer: 'Google DeepMind',
        lastUpdate: '2025-10-20',
        tags: ['Gemini', 'Google', 'Multimodal'],
    },
    {
        id: 'claude-opus-4-5',
        name: 'Claude 4.5 Opus',
        description: 'Anthropic\'s flagship model with superior coding and creative writing abilities. Now with 1M token context window.',
        developer: 'Anthropic',
        lastUpdate: '2025-12-01',
        tags: ['Claude', 'Anthropic', 'LLM'],
    },
    {
        id: 'llama-4',
        name: 'Llama 4',
        description: 'Meta\'s open-weights model, redefining what is possible with local inference. 400B parameters.',
        developer: 'Meta',
        lastUpdate: '2025-09-05',
        tags: ['Llama', 'Meta', 'Open Source'],
    },
];
