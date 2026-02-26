'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mockCompanies from '@/data/mock-companies.json';
import { getCachedEnrichment, cacheEnrichment, saveList, getNotes, saveNote } from '@/utils/storage';

export default function CompanyProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [enriching, setEnriching] = useState(false);
  const [enrichmentData, setEnrichmentData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [note, setNote] = useState('');

  useEffect(() => {
    const found = mockCompanies.find(c => c.id === id);
    if (found) {
      setCompany(found);
      const cached = getCachedEnrichment(id);
      if (cached) setEnrichmentData(cached);

      const savedNote = getNotes(id);
      setNote(savedNote);
    } else {
      router.push('/');
    }
  }, [id, router]);

  const handleSaveNote = () => {
    saveNote(id, note);
    alert('Note saved!');
  };

  const handleEnrich = async () => {
    if (!company) return;
    setEnriching(true);

    try {
      const response = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: id, website: company.website })
      });

      const data = await response.json();
      setEnrichmentData(data);
      cacheEnrichment(id, data);
    } catch (error) {
      console.error('Enrichment failed:', error);
    } finally {
      setEnriching(false);
    }
  };

  const handleAddToList = () => {
    const listName = prompt('Enter list name:');
    if (listName) {
      saveList({
        name: listName,
        companies: [company.id]
      });
      alert(`Added ${company.name} to list ${listName}`);
    }
  };

  if (!company) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="breadcrumb" onClick={() => router.push('/')}>← Back to Discovery</div>
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
              onClick={handleEnrich}
              disabled={enriching}
            >
              {enriching ? 'Enriching...' : '✨ Enrich with AI'}
            </button>
            <button className="btn-secondary" onClick={handleAddToList}>Add to List</button>
          </div>
        </div>
      </div>

      <div className="profile-content-layout">
        <div className="profile-main">
          <div className="tabs">
            <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab ${activeTab === 'signals' ? 'active' : ''}`} onClick={() => setActiveTab('signals')}>Signals</button>
            <button className={`tab ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Notes</button>
          </div>

          <div className="tab-content card">
            {activeTab === 'overview' && (
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
            )}

            {activeTab === 'signals' && (
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
            )}

            {activeTab === 'notes' && (
              <div className="notes-tab">
                <h3>Internal Notes</h3>
                <textarea
                  placeholder="Add a note about this company..."
                  className="notes-area"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button
                  className="btn-primary"
                  style={{ marginTop: '1rem' }}
                  onClick={handleSaveNote}
                >
                  Save Note
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="profile-sidebar">
          <div className="card">
            <h4>Quick Actions</h4>
            <div className="action-list">
              <button className="action-link">Follow Company</button>
              <button className="action-link">Export as PDF</button>
              <button className="action-link">Share with Team</button>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
