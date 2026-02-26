'use client';

export default function OverviewTab({ company, enrichmentData }) {
    return (
        <div className="overview-tab">
            <h3>About {company.name}</h3>
            <p className="description">{company.description}</p>

            <div className="meta-grid">
                <div className="meta-item">
                    <label>Sector</label>
                    <p>{company.sector}</p>
                </div>
                <div className="meta-item">
                    <label>Stage</label>
                    <p>{company.stage}</p>
                </div>
                <div className="meta-item">
                    <label>Funding</label>
                    <p>{company.funding}</p>
                </div>
                <div className="meta-item">
                    <label>Founded</label>
                    <p>{company.founded}</p>
                </div>
                <div className="meta-item">
                    <label>Location</label>
                    <p>{company.location}</p>
                </div>
            </div>

            {enrichmentData && (
                <div className="enrichment-results">
                    <div className="enrichment-header">
                        <h3>AI Enrichment Result</h3>
                        <span className="timestamp">Last Enriched: {new Date(enrichmentData.timestamp).toLocaleString()}</span>
                    </div>

                    <div className="enrichment-card">
                        <div className="enrichment-section">
                            <h4>Summary</h4>
                            <p>{enrichmentData.summary}</p>
                        </div>

                        <div className="enrichment-section">
                            <h4>What they do</h4>
                            <ul>
                                {enrichmentData.whatTheyDo.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>

                        <div className="enrichment-section">
                            <h4>Derived Signals</h4>
                            <div className="signals-chips">
                                {enrichmentData.derivedSignals.map((signal, i) => (
                                    <span key={i} className="signal-chip">✓ {signal}</span>
                                ))}
                            </div>
                        </div>

                        <div className="enrichment-footer">
                            <p>Sources: {enrichmentData.sources.join(', ')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
