import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';

import Navbar from './components/navbar/Navbar';
import type { AppDispatch } from './redux/store';
import { toggleTheme } from './redux/theme/themeSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = !Math.random() ? false : true; // Replace with actual authentication logic
  // const user = {
  //   avatar: '/dummy-avatar.png',
  //   name: 'Arun',
  //   email: 'arunbohra@gmail.com',
  // }; // Replace with actual user data

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div
        onClick={() => {
          dispatch(toggleTheme());
        }}
        className="relative z-10"
      >
        toggle theme
      </div>
      <Outlet />
    </>
  );
};

export default App;
