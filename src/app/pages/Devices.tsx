import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { DeviceTable } from '../components/DeviceTable';
import { AddDeviceModal } from '../components/AddDeviceModal';
import { DeviceDetailsModal } from '../components/DeviceDetailsModal';
import { useAuth } from '../context/AuthContext';
import { Device, getAvailableRouteDates, mockDevices } from '../data/mockData';
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

  const listedDevices = user?.role === 'admin'
    ? mockDevices
    : mockDevices.filter((d) => d.assignedTo === user?.email);

  const searchedDevices = listedDevices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Employee Trackers</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Daily routes with coordinate sampling every 10 minutes
                </p>
              </div>
              {user?.role === 'admin' && (
                <Button onClick={() => setShowAddDevice(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tracker
                </Button>
              )}
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by employee, tracker ID, or latest location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Employee Trackers ({searchedDevices.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
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
