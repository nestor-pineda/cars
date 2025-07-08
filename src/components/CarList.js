import React from 'react';
import CarCard from './CarCard';

// CarList Component - Demonstrates:
// - Props receiving and usage
// - Lists and Keys (React's key prop)
// - Component composition
// - Conditional rendering for empty state
function CarList({ cars, onEdit, onDelete }) {
  // Conditional rendering - show different content based on data
  if (!cars || cars.length === 0) {
    return (
      <div className="car-list">
        <div className="empty-state">
          <h3>No cars found</h3>
          <p>Add a new car to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list">
      <h2>Cars ({cars.length})</h2>
      <div className="car-grid">
        {/* 
          Mapping over arrays - One of React's most common patterns
          Each item needs a unique 'key' prop for React's reconciliation
        */}
        {cars.map(car => (
          <CarCard
            key={car.id} // Important: unique key for each list item
            car={car}     // Passing car data as props
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CarList; 