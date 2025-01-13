import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { 
  LayoutDashboard,
  Map,
  LineChart,
  ClipboardList,
  CreditCard,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Fields', to: '/fields', icon: Map },
  { name: 'Analysis', to: '/analysis', icon: LineChart },
  { name: 'Reports', to: '/reports', icon: ClipboardList },
  { name: 'Subscription', to: '/subscription', icon: CreditCard },
  { name: 'Settings', to: '/settings', icon: Settings },
];

const Sidebar = ({ open, setOpen }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <>
     
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

     
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
         
          <div className="h-16 flex items-center justify-between px-4 bg-green-600">
            <span className="text-white font-semibold text-lg">
              Smart Agriculture
            </span>
            <button
              className="md:hidden text-white"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

      
          <div className="p-4 border-b">
            <div className="text-sm font-medium text-gray-700">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>

        
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;