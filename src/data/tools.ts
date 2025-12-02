export interface ToolInfo {
    id: string;
    name: string;
    description: string;
    developer: string;
    url: string;
    tags: string[];
}

export const TOOLS: ToolInfo[] = [
    {
        id: 'antigravity',
        name: 'Antigravity',
        description: 'The next-gen agentic IDE from Google DeepMind. Features autonomous coding agents and seamless workspace integration.',
        developer: 'Google DeepMind',
        url: 'https://deepmind.google/technologies/antigravity',
        tags: ['IDE', 'Agent', 'Google'],
    },
    {
        id: 'cursor',
        name: 'Cursor',
        description: 'An AI-first code editor built for pair programming with AI. Features codebase indexing and smart chat.',
        developer: 'Anysphere',
        url: 'https://cursor.sh',
        tags: ['IDE', 'Editor', 'Startup'],
    },
    {
        id: 'copilot-workspace',
        name: 'GitHub Copilot Workspace',
        description: 'A task-centric development environment that helps you go from issue to pull request.',
        developer: 'GitHub',
        url: 'https://githubnext.com/projects/copilot-workspace',
        tags: ['Tool', 'GitHub', 'Microsoft'],
    },
];
