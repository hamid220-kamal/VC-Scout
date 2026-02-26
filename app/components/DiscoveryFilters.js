'use client';

export default function DiscoveryFilters({
    searchTerm,
    setSearchTerm,
    filterSector,
    setFilterSector,
    filterStage,
    setFilterStage,
    sortBy,
    setSortBy,
    sectors,
    stages
}) {
    return (
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
    );
}
