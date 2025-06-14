import { useState } from 'react';
import './SearchFilters.scss';

const SearchFilters = ({ onFilter, showTitle = true }) => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      make: '',
      model: '',
      yearMin: '',
      yearMax: '',
      priceMin: '',
      priceMax: '',
      location: ''
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  return (
    <div className="search-filters">
      {showTitle && (
        <div className="search-header">
          <h3>Find Your Perfect Car</h3>
          <p>Use the filters below to narrow down your search</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="filters-grid">
          <div className="form-group">
            <label>Make</label>
            <select name="make" value={filters.make} onChange={handleChange}>
              <option value="">Any Make</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Audi">Audi</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
            </select>
          </div>

          <div className="form-group">
            <label>Model</label>
            <input 
              type="text" 
              name="model" 
              value={filters.model}
              onChange={handleChange}
              placeholder="Enter model"
            />
          </div>

          <div className="form-group">
            <label>Year Range</label>
            <div className="year-range">
              <input 
                type="number" 
                name="yearMin" 
                value={filters.yearMin}
                onChange={handleChange}
                placeholder="Min"
                min="1990"
                max="2024"
              />
              <span>to</span>
              <input 
                type="number" 
                name="yearMax" 
                value={filters.yearMax}
                onChange={handleChange}
                placeholder="Max"
                min="1990"
                max="2024"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Price Range</label>
            <div className="price-range">
              <input 
                type="number" 
                name="priceMin" 
                value={filters.priceMin}
                onChange={handleChange}
                placeholder="Min ($)"
              />
              <span>to</span>
              <input 
                type="number" 
                name="priceMax" 
                value={filters.priceMax}
                onChange={handleChange}
                placeholder="Max ($)"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={filters.location}
              onChange={handleChange}
              placeholder="Enter city or state"
            />
          </div>
        </div>

        <div className="filters-actions">
          <button type="button" onClick={clearFilters} className="btn btn-outline">
            Clear Filters
          </button>
          <button type="submit" className="btn btn-primary">
            Search Cars
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;