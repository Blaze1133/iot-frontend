import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface AddDeviceModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (device: {
    employeeId: string;
    deviceId: string;
    location: string;
  }) => void;
}

export function AddDeviceModal({ open, onClose, onSubmit }: AddDeviceModalProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    deviceId: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ employeeId: '', deviceId: '', location: '' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Tracker to Employee ID</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deviceId">Tracker ID</Label>
              <Input
                id="deviceId"
                placeholder="TRK-XXX"
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                placeholder="EMP-XXX"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Start Location</Label>
              <Input
                id="location"
                placeholder="Current working zone"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Assign Tracker</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
