'use client';

export default function ListModal({
    isOpen,
    onClose,
    selectedCompany,
    availableLists,
    onAddToList,
    onAddToExisting
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass card" onClick={(e) => e.stopPropagation()}>
                <h3>Add {selectedCompany?.name} to List</h3>
                <div className="modal-body">
                    {availableLists.length > 0 && (
                        <div className="existing-lists">
                            <p className="section-label">Existing Lists</p>
                            <div className="lists-stack">
                                {availableLists.map(list => (
                                    <button
                                        key={list.id}
                                        className="list-option"
                                        onClick={() => onAddToExisting(list.id, list.name)}
                                    >
                                        {list.name}
                                        <span className="count">{list.companies?.length || 0}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="new-list-form">
                        <p className="section-label">Create New List</p>
                        <div className="input-group">
                            <input type="text" id="newListInput" placeholder="List name..." className="input-field" />
                            <button
                                className="btn-primary"
                                onClick={() => onAddToList(document.getElementById('newListInput').value)}
                            >
                                Create &amp; Add
                            </button>
                        </div>
                    </div>
                </div>
                <button className="btn-close" onClick={onClose}>Close</button>
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    width: 400px;
                    padding: 2rem;
                    position: relative;
                }
                .modal-body {
                    margin-top: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .section-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--text-tertiary);
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    letter-spacing: 0.05em;
                }
                .lists-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    max-height: 200px;
                    overflow-y: auto;
                }
                .list-option {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem 1rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--glass-border);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    text-align: left;
                }
                .list-option:hover {
                    border-color: var(--accent-primary);
                    background: rgba(99, 102, 241, 0.1);
                }
                .list-option .count {
                    color: var(--text-tertiary);
                    font-size: 0.75rem;
                }
                .input-group {
                    display: flex;
                    gap: 0.5rem;
                }
                .btn-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: var(--text-tertiary);
                    font-size: 0.875rem;
                }
                .btn-primary {
                    background: var(--accent-gradient);
                    color: white;
                    padding: 0.625rem 1.25rem;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 0.875rem;
                }
                .input-field {
                    background: var(--bg-primary);
                    border: 1px solid var(--glass-border);
                    color: var(--text-primary);
                    padding: 0.625rem;
                    border-radius: var(--radius-md);
                    font-size: 0.875rem;
                    outline: none;
                    flex-grow: 1;
                }
            `}</style>
        </div>
    );
}
