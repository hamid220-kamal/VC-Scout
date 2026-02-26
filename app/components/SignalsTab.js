'use client';

export default function SignalsTab({ company }) {
    return (
        <div className="signals-tab">
            <h3>Signals Timeline</h3>
            <div className="timeline">
                {company.signals.map((signal, i) => (
                    <div key={i} className="timeline-item">
                        <div className="timeline-date">{signal.date}</div>
                        <div className="timeline-content">
                            <span className={`signal-type-badge ${signal.type}`}>{signal.type}</span>
                            <p>{signal.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
