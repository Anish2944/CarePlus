import React from "react";

const SearchFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  const specialties = ["Cardiology", "Neurology", "Diabetes", "Hypertension"];

  return (
    <div className="search-filter">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search by name"
        className="search-input"
      />

      {/* Dropdown Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        aria-label="Filter by specialty"
        className="filter-select"
      >
        <option value="">All Specialties</option>
        {specialties.map((specialty) => (
          <option key={specialty} value={specialty}>
            {specialty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
