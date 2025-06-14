import './CarCard.scss';

const CarCard = ({ car, showActions = false, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage) + ' miles';
  };

  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={`${car.make} ${car.model}`} />
      </div>
      
      <div className="car-content">
        <div className="car-header">
          <h3 className="car-title">{car.year} {car.make} {car.model}</h3>
          <div className="car-price">{formatPrice(car.price)}</div>
        </div>
        
        <div className="car-details">
          <div className="detail-item">
            <span className="label">Mileage:</span>
            <span className="value">{formatMileage(car.mileage)}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Fuel:</span>
            <span className="value">{car.fuelType}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Transmission:</span>
            <span className="value">{car.transmission}</span>
          </div>
          
          <div className="detail-item">
            <span className="label">Location:</span>
            <span className="value">{car.location}</span>
          </div>
        </div>
        
        {car.description && (
          <p className="car-description">{car.description}</p>
        )}
        
        <div className="car-contact">
          <span className="contact-label">Contact:</span>
          <span className="contact-info">{car.contact}</span>
        </div>
        
        {showActions && (
          <div className="car-actions">
            <button 
              onClick={() => onEdit(car)} 
              className="btn btn-outline"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(car.id)} 
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;