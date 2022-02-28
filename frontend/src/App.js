import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { authActions } from './app/slices/authSlice';
import decode from 'jwt-decode';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const logout = useCallback(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(authActions.LOGOUT());
    navigate('/');
  }, [navigate, dispatch, user]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [user, logout]);

  return (
    <div>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
