'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import mockCompanies from '@/data/mock-companies.json';
import { saveSearch, saveList, getLists } from '@/utils/storage';
import { exportToCSV } from '@/utils/export';

const ListModal = dynamic(() => import('@/app/components/ListModal'), {
  loading: () => null,
  ssr: false
});

export default function DiscoveryPage() {
  // ... existing state ...
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // List Modal state
  const [showListModal, setShowListModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [availableLists, setAvailableLists] = useState([]);

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
    setCurrentPage(1); // Reset to first page on filter change
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

  const handleOpenListModal = (company) => {
    setSelectedCompany(company);
    setAvailableLists(getLists());
    setShowListModal(true);
  };

  const handleAddToList = (listName) => {
    if (listName) {
      saveList({
        name: listName,
        companies: [selectedCompany.id]
      });
      setShowListModal(false);
      alert(`Added ${selectedCompany.name} to list ${listName}`);
    }
  };

  const handleAddToExisting = (listId, listName) => {
    const lists = getLists();
    const updatedLists = lists.map(l => {
      if (l.id === listId) {
        return { ...l, companies: [...new Set([...(l.companies || []), selectedCompany.id])] };
      }
      return l;
    });
    localStorage.setItem('vc_scout_lists', JSON.stringify(updatedLists));
    setShowListModal(false);
    alert(`Added ${selectedCompany.name} to list ${listName}`);
  };

  const handleExport = () => {
    exportToCSV(companies, `discovery_export_${new Date().toISOString().split('T')[0]}`);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  return (
    <div className="discovery-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">Discovery</h2>
          <p className="page-subtitle">Sourcing high-signal startups from {mockCompanies.length} tracked companies.</p>
        </div>
        <div className="header-buttons">
          <button className="btn-primary" onClick={handleSaveSearch}>Save Search</button>
          <button className="btn-secondary" onClick={handleExport}>Export CSV</button>
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
                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); handleOpenListModal(company); }}>+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {companies.length > 0 && (
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

        {companies.length === 0 && (
          <div className="empty-state">
            <p>No companies match your filters.</p>
          </div>
        )}
      </div>

      <ListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        selectedCompany={selectedCompany}
        availableLists={availableLists}
        onAddToList={handleAddToList}
        onAddToExisting={handleAddToExisting}
      />

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
