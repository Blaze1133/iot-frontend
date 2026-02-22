import { Activity, Bell, LogOut, Menu, Search, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import { routeActivities } from '../data/mockData';
import { useNavigate } from 'react-router';

export function TopNav() {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useLayout();
  const navigate = useNavigate();

  const visibleActivities = routeActivities
    .filter((activity) => {
      if (!user) return false;
      if (user.role === 'admin') return true;
      return activity.assignedTo === user.email;
    })
    .slice(0, 8);

  const alertCount = visibleActivities.filter((activity) => activity.type === 'alert').length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const roleLabel = !user
    ? 'Guest'
    : user.role === 'user'
    ? 'Employee'
    : user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" onClick={toggleSidebar}>
            <Menu className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="relative w-full max-w-[760px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search employees, trackers, or Visakhapatnam checkpoints..."
              className="h-11 pl-10 pr-4 w-full border-slate-300 bg-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pl-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Activity className="w-5 h-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600 text-white text-xs">
                  {visibleActivities.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[360px] p-0">
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500 mt-1">Employee routes and coordinate updates</p>
              </div>
              <div className="max-h-[360px] overflow-y-auto p-2">
                {visibleActivities.length === 0 ? (
                  <p className="text-sm text-slate-500 p-3">No route activity available.</p>
                ) : (
                  visibleActivities.map((activity) => (
                    <div key={activity.id} className="p-3 rounded-md hover:bg-slate-50">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">{activity.employeeName}</p>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{activity.message}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{activity.trackerId}</p>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="relative h-10 w-10">
            <Bell className="w-5 h-5 text-slate-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {alertCount}
            </Badge>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-10 px-2 sm:px-3 border border-transparent hover:border-slate-200">
                <User className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:flex sm:flex-col sm:items-start ml-2">
                  <span className="text-xs leading-none text-slate-900">{user?.name ?? 'Account'}</span>
                  <span className="text-[11px] text-slate-500 leading-none mt-1">{roleLabel}</span>
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <p className="text-xs text-blue-600">{roleLabel}</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50 mt-3"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
