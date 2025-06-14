import { useState } from 'react';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CarCard from '../../components/CarCard/CarCard';
import './CarsListPage.scss';

const CarsListPage = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [sortBy, setSortBy] = useState('newest');

  const handleFilter = (filters) => {
    let filtered = cars;

    if (filters.make) {
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      );
    }

    if (filters.model) {
      filtered = filtered.filter(car => 
        car.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    if (filters.yearMin) {
      filtered = filtered.filter(car => car.year >= parseInt(filters.yearMin));
    }

    if (filters.yearMax) {
      filtered = filtered.filter(car => car.year <= parseInt(filters.yearMax));
    }

    if (filters.priceMin) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.priceMin));
    }

    if (filters.priceMax) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.priceMax));
    }

    if (filters.location) {
      filtered = filtered.filter(car => 
        car.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = sortCars(filtered, sortBy);
    setFilteredCars(sorted);
  };

  const sortCars = (carsArray, sortType) => {
    const sortedCars = [...carsArray];
    
    switch (sortType) {
      case 'price-low':
        return sortedCars.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedCars.sort((a, b) => b.price - a.price);
      case 'year-new':
        return sortedCars.sort((a, b) => b.year - a.year);
      case 'year-old':
        return sortedCars.sort((a, b) => a.year - b.year);
      case 'mileage-low':
        return sortedCars.sort((a, b) => a.mileage - b.mileage);
      case 'mileage-high':
        return sortedCars.sort((a, b) => b.mileage - a.mileage);
      default:
        return sortedCars;
    }
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const sorted = sortCars(filteredCars, newSortBy);
    setFilteredCars(sorted);
  };

  return (
    <div className="cars-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Cars</h1>
          <p>Find your perfect car from our extensive collection</p>
        </div>

        <SearchFilters onFilter={handleFilter} showTitle={false} />

        <div className="results-header">
          <div className="results-count">
            <span>{filteredCars.length} cars found</span>
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort" 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
              <option value="mileage-high">Mileage: High to Low</option>
            </select>
          </div>
        </div>

        {filteredCars.length === 0 ? (
          <div className="no-results">
            <h3>No cars found</h3>
            <p>Try adjusting your search filters to see more results.</p>
          </div>
        ) : (
          <div className="cars-grid">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsListPage;