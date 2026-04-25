import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/donations');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <div className="text-center mb-4">
              <i className="bi bi-basket2-fill display-4 text-primary"></i>
              <h3 className="fw-bold mt-2">Login</h3>
              <p className="text-muted">Masuk ke akun Food Rescue kamu</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" className="form-control"
                    value={form.password} onChange={handleChange} required
                  />
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <p className="text-center mt-3 mb-0">
              Belum punya akun? <Link to="/register" className="text-primary">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;