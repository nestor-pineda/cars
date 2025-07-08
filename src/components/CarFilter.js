import React, { useState, useEffect } from 'react';

// CarFilter Component - Demonstrates:
// - useState for managing filter state
// - useEffect for reacting to prop changes
// - Array filtering methods
// - Multiple event handlers
// - Controlled inputs
function CarFilter({ cars, onFilter }) {
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    mileage: ''
  });

  // useEffect to apply filters whenever cars or filters change
  useEffect(() => {
    filterCars();
  }, [cars, filters]); // Dependency array includes cars and filters

  // Main filtering logic
  const filterCars = () => {
    let filtered = [...cars]; // Create a copy to avoid mutating original array

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(car => 
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Filter by fuel type
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }

    // Filter by transmission
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseFloat(filters.minPrice));
    }

    // Filter by max price
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseFloat(filters.maxPrice));
    }

    // Filter by mileage
    if (filters.mileage) {
      filtered = filtered.filter(car => car.mileage >= parseFloat(filters.mileage));
    }

    // Call parent component's filter handler
    onFilter(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brand: '',
      fuelType: '',
      minPrice: '',
      maxPrice: '',
      transmission: '',
      mileage: ''
    });
  };

  // Get unique values for dropdown options
  const getUniqueValues = (key) => {
    return [...new Set(cars.map(car => car[key]))].sort();
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="car-filter">
      <h3>Filter Cars</h3>
      
      <div className="filter-controls">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="brand-filter">Brand:</label>
            <input
              type="text"
              id="brand-filter"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Search by brand..."
            />
          </div>

          <div className="filter-group">
            <label htmlFor="fuel-filter">Fuel Type:</label>
            <select
              id="fuel-filter"
              name="fuelType"
              value={filters.fuelType}
              onChange={handleFilterChange}
            >
              <option value="">All Fuel Types</option>
              {getUniqueValues('fuelType').map(fuelType => (
                <option key={fuelType} value={fuelType}>
                  {fuelType}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="transmission-filter">Transmission:</label>
            <select
              id="transmission-filter"
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
            >
              <option value="">All Transmissions</option>
              {getUniqueValues('transmission').map(transmission => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="min-price">Min Price ($):</label>
            <input
              type="number"
              id="min-price"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="max-price">Max Price ($):</label>
            <input
              type="number"
              id="max-price"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="100000"
              min="0"
              step="1000"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="mileage">Mileage:</label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={filters.mileage}
              onChange={handleFilterChange}
              placeholder="0"
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="clear-filters-btn"
                title="Clear all filters"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <h4>Active Filters:</h4>
          <div className="filter-tags">
            {filters.brand && (
              <span className="filter-tag">
                Brand: {filters.brand}
              </span>
            )}
            {filters.fuelType && (
              <span className="filter-tag">
                Fuel: {filters.fuelType}
              </span>
            )}
            {filters.transmission && (
              <span className="filter-tag">
                Transmission: {filters.transmission}
              </span>
            )}
            {filters.minPrice && (
              <span className="filter-tag">
                Min Price: ${filters.minPrice}
              </span>
            )}
            {filters.maxPrice && (
              <span className="filter-tag">
                Max Price: ${filters.maxPrice}
              </span>
            )}
            {filters.mileage && (
              <span className="filter-tag">
                Mileage: {filters.mileage}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CarFilter; 