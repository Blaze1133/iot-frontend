import { MapPin, Route, Clock } from 'lucide-react';
import { Device } from '../data/mockData';
import { Card, CardContent } from './ui/card';

interface EmployeeMapGridProps {
  devices: Device[];
  onCardClick?: (device: Device) => void;
  selectedDeviceId?: string | null;
}

function RouteMap({ device }: { device: Device }) {
  const polylinePoints = device.routePoints.map((point) => `${point.x},${point.y}`).join(' ');
  const firstPoint = device.routePoints[0];
  const lastPoint = device.routePoints[device.routePoints.length - 1];

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px'
        }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-3">
        <polyline
          points={polylinePoints}
          fill="none"
          stroke={device.status === 'online' ? '#2563eb' : '#6b7280'}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {device.routePoints.map((point, index) => (
          <circle
            key={`${device.id}-${index}`}
            cx={point.x}
            cy={point.y}
            r={index === device.routePoints.length - 1 ? 2.8 : 1.8}
            fill={index === device.routePoints.length - 1 ? '#1d4ed8' : '#60a5fa'}
          />
        ))}
      </svg>

      {firstPoint && (
        <div className="absolute left-2 top-2 bg-white/95 rounded px-2 py-1 text-[11px] text-gray-600 shadow-sm">
          Start {firstPoint.timestamp}
        </div>
      )}
      {lastPoint && (
        <div className="absolute right-2 bottom-2 bg-white/95 rounded px-2 py-1 text-[11px] text-gray-700 shadow-sm">
          Latest {lastPoint.timestamp}
        </div>
      )}
    </div>
  );
}

export function EmployeeMapGrid({ devices, onCardClick, selectedDeviceId }: EmployeeMapGridProps) {
  if (devices.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No employee routes available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {devices.map((device) => (
        <Card
          key={device.id}
          className={`overflow-hidden hover:shadow-lg transition-shadow ${
            onCardClick ? 'cursor-pointer' : ''
          } ${selectedDeviceId === device.id ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => onCardClick?.(device)}
        >
          <CardContent className="p-0">
            <div className="p-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{device.name}</h3>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  device.status === 'online'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  {device.status === 'online' ? 'Online' : 'Offline'}
                </div>
              </div>
              <p className="text-xs text-gray-600">{device.id}</p>
            </div>

            <RouteMap device={device} />

            <div className="p-4 bg-gray-50 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{device.location.address}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Route className="w-4 h-4 text-gray-400" />
                  <span>{device.routeDistanceKm.toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{device.samplingRateMinutes} min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
