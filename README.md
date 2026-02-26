# VC Intelligence Interface

A precision AI scout for VC sourcing and triage. Build with Next.js and Vanilla CSS.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open the Application**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## Core Features

- **Discovery**: Search and filter startups using a faceted intelligence interface.
- **Enrichment**: Click "Enrich" on any company profile to trigger a server-side AI scrape and analysis.
- **Lists**: Create and manage lists of interesting companies for your fund.
- **Saved Searches**: Save your frequent filter configurations for one-click discovery.

## Technical Details

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Vanilla CSS with CSS Variables for design tokens.
- **Data**: Seeded with `data/mock-companies.json`.
- **Enrichment**: Logic handled in `app/api/enrich/route.js`.
- **Persistence**: `localStorage` used for user-specific data and enrichment caching.

## Design Philosophy

The interface follows a "clean, fast, and professional" philosophy, heavily inspired by modern workflow tools like Harmonic.ai and Linear. It uses a dark-themed glassmorphism aesthetic with vibrant indigo accents.
