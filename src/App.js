import React, { useState, useEffect } from 'react';
import './App.css';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import CarFilter from './components/CarFilter';
import CarSorting from './components/CarSorting';

// Main App Component - Demonstrates:
// - Functional Components
// - useState Hook for state management
// - useEffect Hook for side effects
// - Component composition
// - Props passing
function App() {
  // State management using useState hook
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortedCars, setSortedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  // API base URL
  const API_URL = 'http://localhost:3001/cars';

  // useEffect Hook - Demonstrates side effects and component lifecycle
  useEffect(() => {
    fetchCars();
  }, []); // Empty dependency array means this runs once on mount

  // useEffect to update filtered cars when cars change
  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  // useEffect to reset sorted cars when filtered cars change
  useEffect(() => {
    setSortedCars([]);
  }, [filteredCars]);

  // API Functions - Demonstrates async/await and error handling
  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addCar = async (carData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
      if (!response.ok) {
        throw new Error('Failed to add car');
      }
      const newCar = await response.json();
      setCars([...cars, newCar]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCar = async (id, carData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...carData, id }),
      });
      if (!response.ok) {
        throw new Error('Failed to update car');
      }
      const updatedCar = await response.json();
      setCars(cars.map(car => car.id === id ? updatedCar : car));
      setEditingCar(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Event handlers
  const handleAddCar = () => {
    setEditingCar(null);
    setShowForm(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCar(null);
  };

  const handleFilterCars = (filtered) => {
    setFilteredCars(filtered);
  };

  const handleSortCars = (sorted) => {
    setSortedCars(sorted);
  };

  // Conditional rendering - showing different UI based on state
  if (isLoading) {
    return <div className="loading">Loading cars...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error: {error}</h2>
        <button onClick={fetchCars}>Try Again</button>
      </div>
    );
  }

  // JSX - demonstrates HTML-like syntax in JavaScript
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚗 React Cars Demo</h1>
        <p>Learning React Basics with Car Management</p>
      </header>

      <main className="App-main">
        {/* Conditional rendering based on showForm state */}
        {showForm ? (
          <CarForm
            car={editingCar}
            onSubmit={editingCar ? updateCar : addCar}
            onCancel={handleCancelForm}
          />
        ) : (
          <>
            <div className="controls">
              <button onClick={handleAddCar} className="add-btn">
                Add New Car
              </button>
            </div>

            {/* Component composition - passing props to child components */}
            <CarFilter 
              cars={cars} 
              onFilter={handleFilterCars} 
            />

            <CarSorting 
              cars={filteredCars} 
              onSort={handleSortCars} 
            />

            <CarList
              cars={sortedCars.length > 0 ? sortedCars : filteredCars}
              onEdit={handleEditCar}
              onDelete={deleteCar}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
