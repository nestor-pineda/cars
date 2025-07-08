import React, { useState, useEffect } from 'react';

function CarSorting({ cars, onSort }) {
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    filterAndSortCars();
  }, [cars, sortBy]);

  const filterAndSortCars = () => {
    let filtered = [...cars];

    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'year-new':
            return b.year - a.year;
          case 'year-old':
            return a.year - b.year;
          case 'mileage-low':
            return a.mileage - b.mileage;
          case 'mileage-high':
            return b.mileage - a.mileage;
          case 'brand-az':
            return a.brand.localeCompare(b.brand);
          case 'brand-za':
            return b.brand.localeCompare(a.brand);
          default:
            return 0;
        }
      });
    }

    onSort(filtered);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="car-sorting">
      <h3>Sort Cars</h3>
      
      <div className="sort-controls">
        <div className="sort-row">
          <div className="sort-group">
            <label htmlFor="sort-by">Sort By:</label>
            <select
              id="sort-by"
              name="sortBy"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">No Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
              <option value="mileage-high">Mileage: High to Low</option>
              <option value="brand-az">Brand: A to Z</option>
              <option value="brand-za">Brand: Z to A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarSorting;