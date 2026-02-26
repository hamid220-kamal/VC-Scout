'use client';

export default function IntelligenceTable({
    currentItems,
    onOpenListModal,
    currentPage,
    totalPages,
    setCurrentPage,
    companiesLength
}) {
    return (
        <div className="table-container glass">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Sector</th>
                        <th>Stage</th>
                        <th>Funding</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(company => (
                        <tr key={company.id} onClick={() => window.location.href = `/companies/${company.id}`} className="clickable-row">
                            <td>
                                <div className="company-cell">
                                    <div className="company-logo-stub">{company.name[0]}</div>
                                    <div>
                                        <p className="company-name">{company.name}</p>
                                        <p className="company-web">{company.website.replace('https://', '')}</p>
                                    </div>
                                </div>
                            </td>
                            <td><span className="badge">{company.sector}</span></td>
                            <td>{company.stage}</td>
                            <td>{company.funding}</td>
                            <td>{company.location}</td>
                            <td>
                                <button
                                    className="btn-icon"
                                    onClick={(e) => { e.stopPropagation(); onOpenListModal(company); }}
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {companiesLength > 0 && (
                <div className="pagination">
                    <button
                        className="btn-pagination"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Previous
                    </button>
                    <span className="page-info">Page {currentPage} of {totalPages}</span>
                    <button
                        className="btn-pagination"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {companiesLength === 0 && (
                <div className="empty-state">
                    <p>No companies match your filters.</p>
                </div>
            )}

            <style jsx>{`
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }
        .btn-pagination {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
        }
        .btn-pagination:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .page-info {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
