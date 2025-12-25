import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';

import type { AppDispatch } from './redux/store';
import { toggleTheme } from './redux/theme/themeSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        toggle theme
      </div>
      <Outlet />
    </>
  );
};

export default App;
