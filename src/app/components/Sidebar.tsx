import { Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Radio, 
  Users, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'user'] },
  { name: 'Trackers', path: '/devices', icon: Radio, roles: ['admin', 'manager', 'user'] },
  { name: 'Employee Master', path: '/employee-master', icon: Users, roles: ['admin'] },
  { name: 'Users', path: '/users', icon: Users, roles: ['admin'] },
  { name: 'Reports', path: '/reports', icon: FileText, roles: ['admin'] },
  { name: 'Settings', path: '/settings', icon: Settings, roles: ['admin', 'manager', 'user'] },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isSidebarCollapsed } = useLayout();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabel = user?.role === 'user' ? 'employee' : user?.role;

  return (
    <div
      className={`${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-slate-200 h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className={`border-b border-slate-200 ${isSidebarCollapsed ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div>
              <h1 className="font-semibold text-lg text-slate-900">IOT Tracker</h1>
              <p className="text-xs text-slate-500">Employee Route Tracking</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center py-3 rounded-lg transition-colors ${
                  isSidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-4'
                } ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!isSidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {user?.role !== 'admin' && (
        <div className="p-4 border-t border-slate-200">
          {!isSidebarCollapsed && (
            <>
              <div className="mb-3 px-2">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <p className="text-xs text-blue-600 mt-1 capitalize">{roleLabel}</p>
              </div>
              <Separator className="mb-3" />
            </>
          )}
          <Button
            variant="ghost"
            className={`${
              isSidebarCollapsed ? 'w-10 h-10 p-0 mx-auto' : 'w-full justify-start'
            } text-slate-700 hover:text-red-600 hover:bg-red-50`}
            onClick={handleLogout}
          >
            <LogOut className={`w-4 h-4 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
            {!isSidebarCollapsed && 'Logout'}
          </Button>
        </div>
      )}
    </div>
  );
}
