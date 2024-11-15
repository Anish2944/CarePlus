// src/components/SearchFilter.js
import React from "react";

const SearchFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="">All</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Neurology">Neurology</option>
        <option value="Diabetes">Diabetes</option>
        <option value="Hypertension">Hypertension</option>
      </select>
    </div>
  );
};

export default SearchFilter;
