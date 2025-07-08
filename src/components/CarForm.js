import React, { useState, useEffect } from 'react';

// CarForm Component - Demonstrates:
// - Controlled components (inputs controlled by React state)
// - Form handling and validation
// - useState for form state management
// - useEffect for initializing form with existing data
// - Event handling (onChange, onSubmit)
function CarForm({ car, onSubmit, onCancel }) {
  // State for form data - each input is controlled by React state
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: '',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    mileage: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect to populate form when editing an existing car
  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  // Handle input changes - demonstrates controlled components
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data using functional state update
    setFormData(prev => ({
      ...prev, // Spread operator to keep existing data
      [name]: value // Computed property name to update specific field
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    if (!formData.mileage || formData.mileage <= 0) {
      newErrors.mileage = 'Mileage must be greater than 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert price to number before submitting
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        year: parseInt(formData.year)
      };

      if (car) {
        await onSubmit(car.id, submitData);
      } else {
        await onSubmit(submitData);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save car. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="car-form-container">
      <h2>{car ? 'Edit Car' : 'Add New Car'}</h2>
      
      <form onSubmit={handleSubmit} className="car-form">
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={errors.brand ? 'error' : ''}
              placeholder="Enter car brand"
            />
            {errors.brand && <span className="field-error">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={errors.model ? 'error' : ''}
              placeholder="Enter car model"
            />
            {errors.model && <span className="field-error">{errors.model}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'error' : ''}
              min="1900"
              max={new Date().getFullYear() + 1}
            />
            {errors.year && <span className="field-error">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={errors.color ? 'error' : ''}
              placeholder="Enter car color"
            />
            {errors.color && <span className="field-error">{errors.color}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'error' : ''}
              min="0"
              step="100"
              placeholder="Enter price"
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fuelType">Fuel Type:</label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="transmission">Transmission:</label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (car ? 'Update Car' : 'Add Car')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarForm; 