'use client';

export default function ProfileTabs({ activeTab, setActiveTab }) {
    return (
        <div className="tabs">
            <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab ${activeTab === 'signals' ? 'active' : ''}`} onClick={() => setActiveTab('signals')}>Signals</button>
            <button className={`tab ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Notes</button>
        </div>
    );
}
