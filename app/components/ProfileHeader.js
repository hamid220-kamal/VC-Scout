import Link from 'next/link';
import 'react';

export default function ProfileHeader({ company, enriching, onEnrich, onAddToList, onBack }) {
    return (
        <div className="profile-header">
            <Link href="/" className="breadcrumb">← Back to Discovery</Link>
            <div className="header-main">
                <div className="company-info-large">
                    <div className="logo-box">{company.name[0]}</div>
                    <div>
                        <h1 className="profile-name">{company.name}</h1>
                        <p className="profile-website">{company.website}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className={`btn-enrich ${enriching ? 'loading' : ''}`}
                        onClick={onEnrich}
                        disabled={enriching}
                    >
                        {enriching ? 'Enriching...' : '✨ Enrich with AI'}
                    </button>
                    <button className="btn-secondary" onClick={onAddToList}>Add to List</button>
                </div>
            </div>
        </div>
    );
}
