import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onIdTokenChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebase-config';
import UnauthenticatedLayout from 'layouts/UnauthenticatedLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <UnauthenticatedLayout className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
          <h1 className="text-4xl font-bold text-center pt-6">Login</h1>
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                className="input input-bordered"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Login;
