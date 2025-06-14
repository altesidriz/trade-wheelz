import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './SellCarPage.scss';

const SellCarPage = ({ onAddCar }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm();

  const onSubmit = (data) => {
    const carData = {
      ...data,
      price: parseInt(data.price),
      year: parseInt(data.year),
      mileage: parseInt(data.mileage),
      image: imagePreview || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400'
    };
    
    onAddCar(carData);
    alert('Car listed successfully!');
    navigate('/cars');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="sell-car-page">
      <div className="container">
        <div className="page-header">
          <h1>Sell Your Car</h1>
          <p>Fill out the form below to list your car for sale</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="sell-car-form">
            <div className="form-section">
              <h3>Car Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Make *</label>
                  <select 
                    {...register('make', { required: 'Make is required' })}
                    className={errors.make ? 'error' : ''}
                  >
                    <option value="">Select Make</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Audi">Audi</option>
                    <option value="Ford">Ford</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                  {errors.make && (
                    <span className="error-message">{errors.make.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Model *</label>
                  <input 
                    type="text"
                    {...register('model', { required: 'Model is required' })}
                    className={errors.model ? 'error' : ''}
                    placeholder="Enter car model"
                  />
                  {errors.model && (
                    <span className="error-message">{errors.model.message}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <input 
                    type="number"
                    {...register('year', { 
                      required: 'Year is required',
                      min: { value: 1990, message: 'Year must be 1990 or later' },
                      max: { value: currentYear, message: `Year cannot be later than ${currentYear}` }
                    })}
                    className={errors.year ? 'error' : ''}
                    placeholder="e.g. 2020"
                  />
                  {errors.year && (
                    <span className="error-message">{errors.year.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Mileage *</label>
                  <input 
                    type="number"
                    {...register('mileage', { 
                      required: 'Mileage is required',
                      min: { value: 0, message: 'Mileage must be positive' }
                    })}
                    className={errors.mileage ? 'error' : ''}
                    placeholder="Enter mileage"
                  />
                  {errors.mileage && (
                    <span className="error-message">{errors.mileage.message}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fuel Type *</label>
                  <select 
                    {...register('fuelType', { required: 'Fuel type is required' })}
                    className={errors.fuelType ? 'error' : ''}
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                  </select>
                  {errors.fuelType && (
                    <span className="error-message">{errors.fuelType.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Transmission *</label>
                  <select 
                    {...register('transmission', { required: 'Transmission is required' })}
                    className={errors.transmission ? 'error' : ''}
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                  </select>
                  {errors.transmission && (
                    <span className="error-message">{errors.transmission.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Price *</label>
                <input 
                  type="number"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 1, message: 'Price must be greater than 0' }
                  })}
                  className={errors.price ? 'error' : ''}
                  placeholder="Enter price in USD"
                />
                {errors.price && (
                  <span className="error-message">{errors.price.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  {...register('description')}
                  placeholder="Describe your car's condition, features, maintenance history, etc."
                  rows="4"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Location & Contact</h3>
              
              <div className="form-group">
                <label>Location *</label>
                <input 
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className={errors.location ? 'error' : ''}
                  placeholder="City, State"
                />
                {errors.location && (
                  <span className="error-message">{errors.location.message}</span>
                )}
              </div>

              <div className="form-group">
                <label>Contact Information *</label>
                <input 
                  type="email"
                  {...register('contact', { 
                    required: 'Contact information is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={errors.contact ? 'error' : ''}
                  placeholder="Your email address"
                />
                {errors.contact && (
                  <span className="error-message">{errors.contact.message}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Car Image</h3>
              
              <div className="form-group">
                <label>Upload Image</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <p className="file-help">Upload a clear photo of your car (optional)</p>
                
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Car preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                List My Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellCarPage;