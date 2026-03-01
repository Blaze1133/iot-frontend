import { Link, useLocation, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Radio, 
  Users, 
  FileText, 
  Settings,
  LogOut,
  X
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
  const { isSidebarCollapsed, isMobile, isMobileSidebarOpen, setMobileSidebarOpen } = useLayout();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = () => {
    if (isMobile) setMobileSidebarOpen(false);
  };

  const roleLabel = user?.role === 'user' ? 'employee' : user?.role;

  const showExpanded = isMobile ? true : !isSidebarCollapsed;

  const sidebarContent = (
    <div
      className={`${
        isMobile ? 'w-72' : isSidebarCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-slate-200 h-screen flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className={`border-b border-slate-200 ${!showExpanded ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-center ${!showExpanded ? 'justify-center' : 'justify-between'}`}>
          <div className={`flex items-center ${!showExpanded ? '' : 'gap-3'}`}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Radio className="w-6 h-6 text-white" />
            </div>
            {showExpanded && (
              <div>
                <h1 className="font-semibold text-lg text-slate-900">IOT Tracker</h1>
                <p className="text-xs text-slate-500">Employee Route Tracking</p>
              </div>
            )}
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-5 h-5 text-slate-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path} onClick={handleNavClick}>
              <div
                className={`flex items-center py-3 rounded-lg transition-colors ${
                  !showExpanded ? 'justify-center px-2' : 'gap-3 px-4'
                } ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {showExpanded && <span className="font-medium text-sm">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      {user?.role !== 'admin' && (
        <div className="p-4 border-t border-slate-200">
          {showExpanded && (
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
              !showExpanded ? 'w-10 h-10 p-0 mx-auto' : 'w-full justify-start'
            } text-slate-700 hover:text-red-600 hover:bg-red-50`}
            onClick={handleLogout}
          >
            <LogOut className={`w-4 h-4 ${!showExpanded ? '' : 'mr-3'}`} />
            {showExpanded && 'Logout'}
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
        )}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </>
    );
  }

  return sidebarContent;
}
