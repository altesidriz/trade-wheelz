import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignupPage.scss';

const SignupPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: data.username,
        email: data.email,
        phone: '+1 (555) 000-0000',
        location: 'Not specified',
        memberSince: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        })
      };
      
      setUser(user);
      alert('Account created successfully!');
      navigate('/profile');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Join CarMarket</h1>
            <p>Create your account to start buying and selling cars</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text"
                {...register('username', { 
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                className={errors.username ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.username && (
                <span className="error-message">{errors.username.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                  }
                })}
                className={errors.password ? 'error' : ''}
                placeholder="Create a password"
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match'
                })}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword.message}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  {...register('acceptTerms', {
                    required: 'You must accept the terms and conditions'
                  })}
                />
                <span>
                  I agree to the <a href="#" className="terms-link">Terms and Conditions</a>
                </span>
              </label>
              {errors.acceptTerms && (
                <span className="error-message">{errors.acceptTerms.message}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Send me updates about new cars and features</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary signup-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="password-requirements">
              <p><strong>Password Requirements:</strong></p>
              <ul>
                <li>At least 6 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
              </ul>
            </div>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="login-link"> Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;