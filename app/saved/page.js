'use client';

import { useState, useEffect } from 'react';
import { getSavedSearches } from '@/utils/storage';

export default function SavedSearchesPage() {
    const [searches, setSearches] = useState([]);

    useEffect(() => {
        setSearches(getSavedSearches());
    }, []);

    return (
        <div className="saved-container">
            <div className="page-header">
                <div>
                    <h2 className="page-title">Saved Searches</h2>
                    <p className="page-subtitle">Quickly re-run your frequent scouting filters.</p>
                </div>
            </div>

            <div className="searches-list">
                {searches.length > 0 ? (
                    searches.map(search => (
                        <div key={search.id} className="card search-card">
                            <div className="search-info">
                                <h3>{search.name || 'Untitled Search'}</h3>
                                <div className="search-filters">
                                    <span className="badge">Sector: {search.filters?.sector || 'All'}</span>
                                    <span className="badge">Stage: {search.filters?.stage || 'All'}</span>
                                </div>
                            </div>
                            <div className="search-actions">
                                <button className="btn-primary">Run Search</button>
                                <button className="btn-secondary">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state card">
                        <div className="empty-icon">💾</div>
                        <p>You haven't saved any searches yet.</p>
                        <p className="hint">Use the "Save Search" button on the Discovery page.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .saved-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .page-header {
          margin-bottom: 1rem;
        }

        .page-title {
          font-size: 2rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
        }

        .searches-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .search-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }

        .search-info h3 {
          margin-bottom: 0.5rem;
        }

        .search-filters {
          display: flex;
          gap: 0.5rem;
        }

        .badge {
          background: var(--bg-primary);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .search-actions {
          display: flex;
          gap: 1rem;
        }

        .empty-state {
          padding: 5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          opacity: 0.5;
        }

        .hint {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .btn-primary {
          background: var(--accent-gradient);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .btn-secondary {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
        }
      `}</style>
        </div>
    );
}
