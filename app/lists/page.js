'use client';

import { useState, useEffect } from 'react';
import { getLists } from '@/utils/storage';

export default function ListsPage() {
  const [lists, setLists] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLists(getLists());
      setMounted(true);
    };
    loadData();
  }, []);

  if (!mounted) return null;

  return (
    <div className="lists-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">My Lists</h2>
          <p className="page-subtitle">Organize and export your shortlisted companies.</p>
        </div>
        <button className="btn-primary">+ Create New List</button>
      </div>

      <div className="lists-grid">
        {lists.length > 0 ? (
          lists.map(list => (
            <div key={list.id} className="card list-card">
              <div className="list-info">
                <h3>{list.name}</h3>
                <p>{list.companies?.length || 0} Companies</p>
              </div>
              <div className="list-actions">
                <button className="action-link">View List</button>
                <button className="action-link">Export CSV</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state card">
            <div className="empty-icon">📋</div>
            <p>You haven&apos;t created any lists yet.</p>
            <p className="hint">Go to Discovery to add companies to a list.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .lists-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .page-title {
          font-size: 2rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
        }

        .lists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .list-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .list-info h3 {
          margin-bottom: 0.25rem;
        }

        .list-info p {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .list-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
          border-top: 1px solid var(--glass-border);
          padding-top: 1rem;
        }

        .action-link {
          font-size: 0.875rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .empty-state {
          grid-column: 1 / -1;
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
          padding: 0.625rem 1.25rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .btn-primary {
            width: 100%;
          }
          .lists-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
