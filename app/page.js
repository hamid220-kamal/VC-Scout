'use client';

import { useState, useEffect } from 'react';
import mockCompanies from '@/data/mock-companies.json';
import { saveSearch, saveList, getLists } from '@/utils/storage';

export default function DiscoveryPage() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const sectors = ['All', ...new Set(mockCompanies.map(c => c.sector))];
  const stages = ['All', ...new Set(mockCompanies.map(c => c.stage))];

  useEffect(() => {
    let filtered = mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = filterSector === 'All' || company.sector === filterSector;
      const matchesStage = filterStage === 'All' || company.stage === filterStage;
      return matchesSearch && matchesSector && matchesStage;
    });

    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    setCompanies(filtered);
  }, [searchTerm, filterSector, filterStage, sortBy]);

  const handleSaveSearch = () => {
    const name = prompt('Name this search:');
    if (name) {
      saveSearch({
        name,
        filters: { sector: filterSector, stage: filterStage, term: searchTerm }
      });
      alert('Search saved!');
    }
  };

  const handleAddToList = (company) => {
    const listName = prompt('Enter list name:');
    if (listName) {
      saveList({
        name: listName,
        companies: [company.id]
      });
      alert(`Added ${company.name} to list ${listName}`);
    }
  };

  return (
    <div className="discovery-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Discovery</h2>
          <p className="page-subtitle">Sourcing high-signal startups from {mockCompanies.length} tracked companies.</p>
        </div>
        <div className="header-buttons">
          <button className="btn-primary" onClick={handleSaveSearch}>Save Search</button>
          <button className="btn-secondary">Export</button>
        </div>
      </div>

      <div className="filters-bar card">
        <div className="search-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="filter-group">
          <label>Sector</label>
          <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)} className="select-field">
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Stage</label>
          <select value={filterStage} onChange={(e) => setFilterStage(e.target.value)} className="select-field">
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select-field">
            <option value="name">Name</option>
            <option value="sector">Sector</option>
            <option value="stage">Stage</option>
          </select>
        </div>
      </div>

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
            {companies.map(company => (
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
                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); handleAddToList(company); }}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && (
          <div className="empty-state">
            <p>No companies match your filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}
