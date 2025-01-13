import { useSelector, useDispatch } from 'react-redux';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={onMenuClick}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <img
                className="h-8 w-auto ml-2"
                src="/api/placeholder/32/32"
                alt="Smart Agriculture"
              />
            </div>
          </div>

          <div className="flex items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>

            <div className="ml-3 relative flex items-center space-x-3">
              <span className="text-gray-700">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;