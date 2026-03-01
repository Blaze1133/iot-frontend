import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { DeviceTable } from '../components/DeviceTable';
import { AddDeviceModal } from '../components/AddDeviceModal';
import { DeviceDetailsModal } from '../components/DeviceDetailsModal';
import { useAuth } from '../context/AuthContext';
import { Device, getAvailableRouteDates, getVisibleDevicesForUser } from '../data/mockData';
import { Plus, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Devices() {
  const { user } = useAuth();
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const availableDates = getAvailableRouteDates();
  const [selectedDate, setSelectedDate] = useState(availableDates[0] ?? '2026-02-22');

  const listedDevices = getVisibleDevicesForUser(user);

  const searchedDevices = listedDevices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trackerTitle = user?.role === 'user' ? 'My Tracker' : 'All Employee Trackers';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Employee Trackers</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Daily routes with coordinate sampling every 10 minutes
                </p>
              </div>
              {user?.role === 'admin' && (
                <Button className="self-start sm:self-auto" onClick={() => setShowAddDevice(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tracker
                </Button>
              )}
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by employee, tracker ID, or latest location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{trackerTitle} ({searchedDevices.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <DeviceTable
                  devices={searchedDevices}
                  showActions={user?.role === 'admin'}
                  onViewDetails={setSelectedDevice}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <AddDeviceModal
        open={showAddDevice}
        onClose={() => setShowAddDevice(false)}
        onSubmit={(deviceData) => {
          console.log('New tracker:', deviceData);
        }}
      />

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
