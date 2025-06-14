import { useState } from 'react';
import CarCard from '../../components/CarCard/CarCard';
import './ProfilePage.scss';

const ProfilePage = ({ user, cars, onUpdateCar, onDeleteCar }) => {
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({});

  // Mock user data if no user is logged in
  const currentUser = user || {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    memberSince: 'January 2023'
  };

  const userCars = cars.filter(car => car.sellerId === currentUser.id);

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData(car);
  };

  const handleDelete = (carId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      onDeleteCar(carId);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdateCar(editingCar.id, formData);
    setEditingCar(null);
    setFormData({});
    alert('Car updated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingCar(null);
    setFormData({});
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {currentUser.name.charAt(0)}
              </div>
            </div>
            <div className="profile-details">
              <h1>{currentUser.name}</h1>
              <p className="email">{currentUser.email}</p>
              <div className="profile-meta">
                <span>📱 {currentUser.phone}</span>
                <span>📍 {currentUser.location}</span>
                <span>📅 Member since {currentUser.memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="section-header">
            <h2>My Listings</h2>
            <span className="listings-count">{userCars.length} car{userCars.length !== 1 ? 's' : ''} listed</span>
          </div>

          {userCars.length === 0 ? (
            <div className="no-listings">
              <h3>No cars listed yet</h3>
              <p>Start selling by listing your first car!</p>
              <a href="/sell" className="btn btn-primary">List a Car</a>
            </div>
          ) : (
            <div className="cars-grid">
              {userCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  showActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingCar && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Edit Car Listing</h3>
                <button onClick={handleCancelEdit} className="modal-close">×</button>
              </div>
              
              <form onSubmit={handleUpdateSubmit} className="modal-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>Make</label>
                    <select 
                      name="make" 
                      value={formData.make || ''} 
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Make</option>
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
                      value={formData.model || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Year</label>
                    <input 
                      type="number" 
                      name="year" 
                      value={formData.year || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Price</label>
                    <input 
                      type="number" 
                      name="price" 
                      value={formData.price || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mileage</label>
                    <input 
                      type="number" 
                      name="mileage" 
                      value={formData.mileage || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input 
                      type="text" 
                      name="location" 
                      value={formData.location || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description || ''} 
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={handleCancelEdit} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Car
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;