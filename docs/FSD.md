# Functional Specification Document (FSD) - VC Scout

## 1. System Architecture
VC Scout is a Next.js application using the App Router. It follows a client-heavy architecture for low-latency interactions, while using server-side routes for sensitive data processing.

## 2. Component Architecture
### 2.1 Core Components
*   **DiscoveryPage (`app/page.js`)**: Main faceted search interface with client-side filtering and pagination.
*   **CompanyProfile (`app/companies/[id]/page.js`)**: Detailed view with tabbed navigation (Overview, Signals, Notes).
*   **ListModal (`app/components/ListModal.js`)**: Lazy-loaded modal for funneling companies into lists.

### 2.2 Shared Components
*   **Sidebar**: Navigational layout with glassmorphism styling.
*   **TopBar**: Global search and user profile access.

## 3. Data Management
### 3.1 Static Data
*   `data/mock-companies.json`: Seed data for the intelligence interface.

### 3.2 Persistent Data (`localStorage`)
*   `vc_scout_lists`: User-created company lists.
*   `vc_scout_searches`: Saved filter configurations.
*   `enrich_[id]`: Cached AI enrichment results per company.
*   `notes_[id]`: Persistent internal notes per company.

## 4. API Specification
### 4.1 Enrichment API (`POST /api/enrich`)
*   **Input**: `{ companyId: string, website: string }`
*   **Process**: Simulated AI scraping with a 2.5s delay to mock high-latency LLM/Scraper operations.
*   **Output**: Structured company analysis (summary, signals, keywords, sources).

## 5. Design System
*   **Tokens**: Located in `app/globals.css`.
*   **Aesthetics**: 
    *   Primary Background: `#0a0a0c`
    *   Accent: Indigo-to-Violet Gradient
    *   Blur: 12px (Glassmorphism)
    *   Radius: 10px-16px (Premium feel)

## 6. Performance Optimizations
*   **Lazy Loading**: Functality-heavy components like the `ListModal` are loaded on-demand using `next/dynamic`.
*   **Caching**: Enrichment results are cached on the client to prevent redundant API calls.
*   **Asset Optimization**: Google Fonts (Inter) preloaded for zero CLS.
