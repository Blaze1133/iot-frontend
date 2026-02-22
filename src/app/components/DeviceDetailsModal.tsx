import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Device, getRouteRecordByDate } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { Badge } from './ui/badge';
import { MapPin, Clock, Route } from 'lucide-react';

interface DeviceDetailsModalProps {
  device: Device | null;
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  availableDates: string[];
}

function formatDateLabel(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function DeviceDetailsModal({
  device,
  open,
  onClose,
  selectedDate,
  onDateChange,
  availableDates,
}: DeviceDetailsModalProps) {
  if (!device) return null;

  const record = getRouteRecordByDate(device, selectedDate);
  const mapPoints = record?.routePoints ?? [];
  const polyline = mapPoints.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg">{device.name}</DialogTitle>
              <p className="text-xs text-gray-500 mt-1">{device.id}</p>
            </div>
            <StatusBadge status={record?.status ?? device.status} />
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-600">Viewing Route Date</span>
            <select
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
            >
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {formatDateLabel(date)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative h-52 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            {mapPoints.length > 0 ? (
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-3">
                <polyline
                  points={polyline}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {mapPoints.map((point, index) => (
                  <circle
                    key={`${device.id}-${selectedDate}-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r={index === mapPoints.length - 1 ? 2.8 : 1.7}
                    fill={index === mapPoints.length - 1 ? '#1d4ed8' : '#60a5fa'}
                  />
                ))}
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                No route points for this date
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Distance</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {(record?.routeDistanceKm ?? 0).toFixed(1)} km
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Coordinates</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {record?.coordinatesCount ?? 0}
              </p>
            </div>
            <div className="rounded-md bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Sampling</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                Every {device.samplingRateMinutes} min
              </p>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{record?.locationAddress ?? device.location.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Last ping: {record?.lastSeen ?? device.lastSeen}</span>
              </div>
              <Badge variant="outline">
                <Route className="w-3 h-3 mr-1" />
                {mapPoints.length} points
              </Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
