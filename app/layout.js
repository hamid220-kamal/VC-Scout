import './globals.css';

export const metadata = {
  title: 'VC Scout | Intelligence Interface',
  description: 'Precision AI scout for venture capital sourcing and triage.',
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
              <a href="/" className="nav-item active">
                <span className="icon">🔍</span> Discovery
              </a>
              <a href="/lists" className="nav-item">
                <span className="icon">📋</span> My Lists
              </a>
              <a href="/saved" className="nav-item">
                <span className="icon">💾</span> Saved Searches
              </a>
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
