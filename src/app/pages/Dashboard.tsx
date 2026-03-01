import { useMemo, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { OverviewCard } from '../components/OverviewCard';
import { EmployeeMapGrid } from '../components/EmployeeMapGrid';
import { DeviceDetailsModal } from '../components/DeviceDetailsModal';
import { useAuth } from '../context/AuthContext';
import { Device, getAvailableRouteDates, getRouteRecordByDate, getVisibleDevicesForUser } from '../data/mockData';
import { Users, MapPin, Radio, Clock, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';

function formatDateLabel(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [employeeFilter, setEmployeeFilter] = useState('');

  const availableDates = useMemo(() => getAvailableRouteDates(), []);
  const [selectedDate, setSelectedDate] = useState(availableDates[0] ?? '2026-02-22');

  const roleFilteredDevices = getVisibleDevicesForUser(user);

  const datedDevices = roleFilteredDevices.map((device) => {
    const record = getRouteRecordByDate(device, selectedDate);
    if (!record) {
      return {
        ...device,
        status: 'offline' as const,
        lastSeen: 'No data',
        routeDistanceKm: 0,
        coordinatesToday: 0,
        routePoints: [],
      };
    }
    return {
      ...device,
      status: record.status,
      lastSeen: record.lastSeen,
      routeDistanceKm: record.routeDistanceKm,
      coordinatesToday: record.coordinatesCount,
      routePoints: record.routePoints,
      location: {
        lat: record.lat,
        lng: record.lng,
        address: record.locationAddress,
      },
    };
  });

  const trackedEmployees = datedDevices.filter((d) => d.coordinatesToday > 0).length;
  const avgRouteDistance = trackedEmployees
    ? datedDevices.reduce((sum, d) => sum + d.routeDistanceKm, 0) / trackedEmployees
    : 0;
  const coordinatesReceivedToday = datedDevices.reduce((sum, d) => sum + d.coordinatesToday, 0);
  const onlineTrackers = datedDevices.filter((d) => d.status === 'online').length;

  const filteredEmployeeCards = datedDevices.filter((d) =>
    d.name.toLowerCase().includes(employeeFilter.toLowerCase()) ||
    d.id.toLowerCase().includes(employeeFilter.toLowerCase())
  );

  const routeCardTitle = user?.role === 'user' ? 'My Route Path' : 'Employee Route Paths';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Daily Route Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">
                Employee location history and 10-minute coordinate sampling
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <OverviewCard
                title="Employees Tracked"
                value={trackedEmployees}
                icon={Users}
                trend={`${onlineTrackers} currently online`}
                trendUp
              />
              <OverviewCard
                title="Locations Logged"
                value={coordinatesReceivedToday}
                icon={MapPin}
                trend={`For ${formatDateLabel(selectedDate)}`}
                trendUp
              />
              <OverviewCard
                title="Avg Route Distance"
                value={`${avgRouteDistance.toFixed(1)} km`}
                icon={Radio}
                trend={`For ${formatDateLabel(selectedDate)}`}
                trendUp
              />
              <OverviewCard
                title="Sampling Interval"
                value="10 min"
                icon={Clock}
                trend="Configured tracker update interval"
                trendUp
              />
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle>{routeCardTitle}</CardTitle>
                    <p className="mt-1 text-xs text-slate-500">Showing routes for {formatDateLabel(selectedDate)}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Input
                      value={employeeFilter}
                      onChange={(e) => setEmployeeFilter(e.target.value)}
                      placeholder="Filter employee cards by name or tracker ID..."
                      className="w-full sm:w-80"
                    />
                    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="h-9 bg-transparent text-sm text-slate-700 outline-none"
                        aria-label="Select date"
                      >
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {formatDateLabel(date)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EmployeeMapGrid
                  devices={filteredEmployeeCards}
                  onCardClick={setSelectedDevice}
                  selectedDeviceId={selectedDevice?.id ?? null}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <DeviceDetailsModal
        open={selectedDevice !== null}
        onClose={() => setSelectedDevice(null)}
        device={selectedDevice}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        availableDates={availableDates}
      />
    </div>
  );
}
