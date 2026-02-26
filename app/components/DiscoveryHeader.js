'use client';

export default function DiscoveryHeader({ count, onSaveSearch, onExport }) {
    return (
        <div className="page-header">
            <div>
                <h2 className="page-title">Discovery</h2>
                <p className="page-subtitle">Sourcing high-signal startups from {count} tracked companies.</p>
            </div>
            <div className="header-buttons">
                <button className="btn-primary" onClick={onSaveSearch}>Save Search</button>
                <button className="btn-secondary" onClick={onExport}>Export CSV</button>
            </div>
        </div>
    );
}
