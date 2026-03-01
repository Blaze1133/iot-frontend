import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Device } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { Clock, MapPin, MoreVertical, Route } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface DeviceTableProps {
  devices: Device[];
  onEdit?: (device: Device) => void;
  onDelete?: (deviceId: string) => void;
  onViewDetails?: (device: Device) => void;
  showActions?: boolean;
}

export function DeviceTable({ devices, onEdit, onDelete, onViewDetails, showActions = true }: DeviceTableProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Tracker ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Latest Location</TableHead>
            <TableHead>Today&apos;s Route</TableHead>
            <TableHead>Sampling</TableHead>
            <TableHead>Last Coordinate</TableHead>
            {showActions && <TableHead className="w-[50px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-mono text-sm">{device.id}</TableCell>
              <TableCell className="font-medium">{device.name}</TableCell>
              <TableCell>
                <StatusBadge status={device.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {device.location.address}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Route className="w-4 h-4 text-blue-600" />
                  {device.routeDistanceKm.toFixed(1)} km
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                Every {device.samplingRateMinutes} min
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {device.lastSeen}
                </div>
              </TableCell>
              {showActions && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails?.(device)}>
                        View Route Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(device)}>
                        Reassign Tracker
                      </DropdownMenuItem>
                      <DropdownMenuItem>Route History</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete?.(device.id)}
                      >
                        Deactivate Tracker
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
