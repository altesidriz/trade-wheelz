import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CarCard from '../../components/CarCard/CarCard';
import './Home.scss';

const Home = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState(cars.slice(0, 6)); // Show only first 6 cars

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

    setFilteredCars(filtered.slice(0, 6));
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200" 
            alt="Cars"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Find Your Dream Car</h1>
              <p>Discover thousands of quality used cars from trusted dealers and private sellers</p>
              <div className="hero-buttons">
                <Link to="/cars" className="btn btn-primary">
                  Browse Cars
                </Link>
                <Link to="/sell" className="btn btn-outline">
                  Sell Your Car
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <SearchFilters onFilter={handleFilter} />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="featured-cars section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Check out some of our most popular listings</p>
          </div>
          
          <div className="cars-grid">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/cars" className="btn btn-primary">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to buy or sell your car</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Search</h3>
              <p>Use our advanced filters to find cars that match your criteria</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Contact</h3>
              <p>Get in touch with sellers directly through our platform</p>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Buy</h3>
              <p>Complete your purchase and drive away in your new car</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Why Choose CarMarket?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div>
                    <h4>Trusted Sellers</h4>
                    <p>All our sellers are verified for your peace of mind</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div>
                    <h4>Best Prices</h4>
                    <p>Compare prices from multiple sellers to get the best deal</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div>
                    <h4>Easy Process</h4>
                    <p>Simple and straightforward buying and selling process</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="benefits-image">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500" 
                alt="Happy customer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;