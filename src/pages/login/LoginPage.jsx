import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './LoginPage.scss';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock authentication - in real app, this would be an API call
      if (data.email === 'test@example.com' && data.password === 'password') {
        const user = {
          id: 1,
          name: 'John Doe',
          email: data.email,
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          memberSince: 'January 2023'
        };
        setUser(user);
        navigate('/profile');
      } else {
        setError('root', {
          message: 'Invalid email or password'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your CarMarket account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {errors.root && (
              <div className="error-banner">
                {errors.root.message}
              </div>
            )}

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
                  }
                })}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="demo-info">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: test@example.com</p>
              <p>Password: password</p>
            </div>
          </form>

          <div className="login-footer">
            <p>
              Don&apos;t have an account? 
              <Link to="/signup" className="signup-link"> Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;