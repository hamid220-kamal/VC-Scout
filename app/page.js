import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import mockCompanies from '@/data/mock-companies.json';
import { saveSearch, saveList, getLists } from '@/utils/storage';
import { exportToCSV } from '@/utils/export';

// Core Components
import DiscoveryHeader from '@/app/components/DiscoveryHeader';
import DiscoveryFilters from '@/app/components/DiscoveryFilters';
import IntelligenceTable from '@/app/components/IntelligenceTable';

const ListModal = dynamic(() => import('@/app/components/ListModal'), {
  loading: () => null,
  ssr: false
});

export default function DiscoveryPage() {
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

  const sectors = useMemo(() => ['All', ...new Set(mockCompanies.map(c => c.sector))], []);
  const stages = useMemo(() => ['All', ...new Set(mockCompanies.map(c => c.stage))], []);

  const filteredCompanies = useMemo(() => {
    const filtered = mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = filterSector === 'All' || company.sector === filterSector;
      const matchesStage = filterStage === 'All' || company.stage === filterStage;
      return matchesSearch && matchesSector && matchesStage;
    });

    filtered.sort((a, b) => {
      const valA = a[sortBy] || '';
      const valB = b[sortBy] || '';
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    return filtered;
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
    exportToCSV(filteredCompanies, `discovery_export_${new Date().toISOString().split('T')[0]}`);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  return (
    <div className="discovery-container">
      <DiscoveryHeader
        count={mockCompanies.length}
        onSaveSearch={handleSaveSearch}
        onExport={handleExport}
      />

      <DiscoveryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterSector={filterSector}
        setFilterSector={setFilterSector}
        filterStage={filterStage}
        setFilterStage={setFilterStage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sectors={sectors}
        stages={stages}
      />

      <IntelligenceTable
        currentItems={currentItems}
        onOpenListModal={handleOpenListModal}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        companiesLength={filteredCompanies.length}
      />

      <ListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        selectedCompany={selectedCompany}
        availableLists={availableLists}
        onAddToList={handleAddToList}
        onAddToExisting={handleAddToExisting}
      />
    </div>
  );
}
