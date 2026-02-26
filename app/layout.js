import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'VC Scout | precision AI scout for VC sourcing and triage',
  description: 'Streamline startup discovery, profile enrichment, and investment pipeline management with VC Scout. A precision AI scout for Venture Capital firms.',
  keywords: ['venture capital', 'startup sourcing', 'AI enrichment', 'investment triage', 'deal flow management', 'startups', 'VC intelligence', 'Harmonic alternative'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'VC Scout | Venture Intelligence Interface',
    description: 'Precision AI scout for VC sourcing and triage.',
    url: 'https://vc-scout.ai',
    siteName: 'VC Scout',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VC Scout | precision AI scout',
    description: 'The intelligence layer for your VC fund.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <aside className="sidebar glass">
            <div className="logo-container">
              <div className="logo-icon"></div>
              <h1 className="logo-text">VC Scout</h1>
            </div>

            <nav className="nav-menu">
              <Link href="/" className="nav-item active">
                <span className="icon">🔍</span> Discovery
              </Link>
              <Link href="/lists" className="nav-item">
                <span className="icon">📋</span> My Lists
              </Link>
              <Link href="/saved" className="nav-item">
                <span className="icon">💾</span> Saved Searches
              </Link>
            </nav>

            <div className="sidebar-footer">
              <div className="user-profile">
                <div className="avatar">HK</div>
                <div className="user-info">
                  <p className="user-name">Hamid Kamal</p>
                  <p className="user-role">Analyst</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="main-content">
            <header className="top-bar">
              <div className="search-container glass">
                <input type="text" placeholder="Search companies, sectors, or signals..." className="global-search" />
                <kbd className="search-kbd">⌘K</kbd>
              </div>
              <div className="header-actions">
                <button className="btn-secondary">Feedback</button>
                <div className="notification-icon">🔔</div>
              </div>
            </header>

            <div className="content-area">
              {children}
            </div>
          </main>
        </div>

      </body>
    </html>
  );
}
