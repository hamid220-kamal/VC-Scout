'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mockCompanies from '@/data/mock-companies.json';
import { getCachedEnrichment, cacheEnrichment, saveList, getNotes, saveNote } from '@/utils/storage';

// Core Components
import ProfileHeader from '@/app/components/ProfileHeader';
import ProfileTabs from '@/app/components/ProfileTabs';
import OverviewTab from '@/app/components/OverviewTab';
import SignalsTab from '@/app/components/SignalsTab';
import NotesTab from '@/app/components/NotesTab';

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
      <ProfileHeader
        company={company}
        enriching={enriching}
        onEnrich={handleEnrich}
        onAddToList={handleAddToList}
        onBack={() => router.push('/')}
      />

      <div className="profile-content-layout">
        <div className="profile-main">
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="tab-content card">
            {activeTab === 'overview' && (
              <OverviewTab company={company} enrichmentData={enrichmentData} />
            )}

            {activeTab === 'signals' && (
              <SignalsTab company={company} />
            )}

            {activeTab === 'notes' && (
              <NotesTab note={note} setNote={setNote} onSaveNote={handleSaveNote} />
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
