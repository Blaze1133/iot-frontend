import { MapPin } from 'lucide-react';
import { Device } from '../data/mockData';

interface MapViewProps {
  devices: Device[];
}

export function MapView({ devices }: MapViewProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Map Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Device Markers */}
      {devices.map((device, index) => {
        // Distribute devices across the map area
        const positions = [
          { top: '20%', left: '15%' },
          { top: '35%', left: '70%' },
          { top: '60%', left: '25%' },
          { top: '45%', left: '85%' },
          { top: '75%', left: '50%' },
          { top: '25%', left: '45%' },
          { top: '65%', left: '75%' },
          { top: '40%', left: '35%' },
        ];
        
        const position = positions[index % positions.length];
        
        return (
          <div
            key={device.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={position}
          >
            {/* Pulse Animation for Online Devices */}
            {device.status === 'online' && (
              <div className="absolute inset-0 -m-2">
                <div className="w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping" />
              </div>
            )}
            
            {/* Marker */}
            <div className={`relative z-10 p-2 rounded-full ${
              device.status === 'online' ? 'bg-blue-600' : 'bg-gray-400'
            } shadow-lg`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                <div className="font-semibold">{device.name}</div>
                <div className="text-gray-300">{device.location.address}</div>
                <div className="text-gray-300">{device.status}</div>
              </div>
              <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        );
      })}
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-1">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">
          +
        </button>
        <div className="h-px bg-gray-200" />
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">
          −
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-xs font-medium text-gray-900 mb-2">Device Status</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-xs text-gray-600">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
