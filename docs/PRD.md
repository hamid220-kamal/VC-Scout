# Product Requirements Document (PRD) - VC Scout

## 1. Executive Summary
VC Scout is a precision AI scout designed for Venture Capital firms to streamline startup sourcing and triage. It provides a modern intelligence interface for discovery, profile enrichment, and pipeline management.

## 2. Target Audience
*   VC Analysts and Associates
*   Deal Flow Managers
*   Managing Directors at Thesis-Driven Funds

## 3. Key Features
### 3.1 Discovery
*   **Faceted Search**: Search startups by name, description, or sectors.
*   **Advanced Filters**: Filter by industry sector and funding stage.
*   **Intelligence Table**: View high-level metrics (funding, location, sector) in a fast, sortable table.

### 3.2 AI Profile Enrichment
*   **On-Demand Scraping**: One-click enrichment to pull real-time data from company websites.
*   **AI Summary**: Automated generation of company summaries and core value propositions.
*   **Signal Extraction**: Identification of derived signals (hiring trends, product launches).
*   **Source Transparency**: List of all URLs used for enrichment with timestamps.

### 3.3 Pipeline Management
*   **Custom Lists**: Create and manage groups of startups for specific investment themes.
*   **Saved Searches**: Save complex filter configurations for one-click re-discovery.
*   **Internal Notes**: Persistent per-company notes for team collaboration.

### 3.4 Data Interoperability
*   **Export**: Export lists and discovery results to CSV for external analysis.

## 4. Technical Requirements
*   **Framework**: Next.js 14+ (App Router).
*   **Styling**: Vanilla CSS (CSS Variables) with Glassmorphism aesthetic.
*   **Persistence**: Client-side storage (`localStorage`) for low-latency user data.
*   **Security**: Server-side API endpoints for sensitive enrichment logic.
