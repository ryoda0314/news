# AI News Dashboard

A stylish, daily-updated dashboard for tracking the latest Generative AI news (GPT-5, Gemini 3, Claude Opus, etc.).
Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Today Digest**: A curated list of the most important AI news from the last 24-48 hours.
- **Timeline**: A chronological view of all news, filterable by category and company.
- **AI Index**: A quick reference for major models and tools.
- **Smart Summaries**: Uses OpenAI API to generate concise summaries (with fallback).
- **Automated Scoring**: Ranks news based on keywords and recency.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Fetching**: rss-parser
- **AI Integration**: OpenAI API

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anti-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   ```
   *Note: If no key is provided, the app will use simple text truncation for summaries.*

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (Header, NewsCard, FilterBar).
- `src/lib`: Utility functions (fetching, filtering, scoring, summarizing).
- `src/data`: Static data for models and tools.

## Customization

- **Add Feeds**: Edit `src/lib/fetchFeeds.ts` to add more RSS feed URLs.
- **Adjust Scoring**: Edit `src/lib/filterAndScore.ts` to change keywords and weights.
