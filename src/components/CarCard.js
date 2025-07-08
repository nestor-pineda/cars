import React from 'react';

// CarCard Component - Demonstrates:
// - Props destructuring
// - Event handling
// - Conditional rendering
// - Template literals
// - onClick event handlers
function CarCard({ car, onEdit, onDelete }) {
  // Event handlers - functions that respond to user interactions
  const handleEdit = () => {
    onEdit(car);
  };

  const handleDelete = () => {
    // Confirmation before delete - good UX practice
    if (window.confirm(`Are you sure you want to delete the ${car.brand} ${car.model}?`)) {
      onDelete(car.id);
    }
  };

  // Helper function for formatting price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Conditional styling based on fuel type
  const getCardClass = () => {
    let baseClass = 'car-card';
    if (car.fuelType === 'Electric') {
      baseClass += ' electric';
    }
    return baseClass;
  };

  return (
    <div className={getCardClass()}>
      {/* Conditional rendering for electric cars */}
      {car.fuelType === 'Electric' && (
        <div className="electric-badge">⚡ Electric</div>
      )}
      
      <div className="car-info">
        <h3>{car.brand} {car.model}</h3>
        <div className="car-details">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Price:</strong> {formatPrice(car.price)}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
        </div>
      </div>

      <div className="car-actions">
        {/* Event handlers attached to buttons */}
        <button 
          onClick={handleEdit}
          className="edit-btn"
          title="Edit this car"
        >
          ✏️ Edit
        </button>
        <button 
          onClick={handleDelete}
          className="delete-btn"
          title="Delete this car"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default CarCard; 