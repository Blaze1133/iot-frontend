import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { mockEmployeeMaster } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../components/StatusBadge';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

interface NewEmployeeForm {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
}

export default function EmployeeMaster() {
  const [employees, setEmployees] = useState(mockEmployeeMaster);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmployee, setNewEmployee] = useState<NewEmployeeForm>({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
  });

  const searchedEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.employeeId.toLowerCase().includes(query) ||
      (employee.assignedTrackerId ?? '').toLowerCase().includes(query)
    );
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployees((prev) => [
      {
        id: `EMP-${Date.now()}`,
        employeeId: newEmployee.employeeId,
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        assignedTrackerId: null,
        status: 'active',
      },
      ...prev,
    ]);
    setNewEmployee({ employeeId: '', name: '', email: '', phone: '' });
    setShowAddEmployee(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">Employee Master</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Create employees first, then map tracker chips to employee IDs
                </p>
              </div>
              <Button className="self-start sm:self-auto" onClick={() => setShowAddEmployee(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Input
                  placeholder="Search by employee ID, name, email, or chip ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Employees ({searchedEmployees.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white overflow-x-auto">
                  <Table className="min-w-[700px]">
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Assigned Chip</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchedEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-mono text-sm">{employee.employeeId}</TableCell>
                          <TableCell className="font-medium text-slate-900">{employee.name}</TableCell>
                          <TableCell className="text-sm text-slate-600">{employee.email}</TableCell>
                          <TableCell className="text-sm text-slate-600">{employee.phone}</TableCell>
                          <TableCell>
                            {employee.assignedTrackerId ? (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
                                {employee.assignedTrackerId}
                              </Badge>
                            ) : (
                              <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-0">Unassigned</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={employee.status} />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddEmployee}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input
                  id="employee-id"
                  placeholder="EMP-009"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, employeeId: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-name">Full Name</Label>
                <Input
                  id="employee-name"
                  placeholder="Employee full name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-email">Email</Label>
                <Input
                  id="employee-email"
                  type="email"
                  placeholder="employee@iot.com"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-phone">Phone</Label>
                <Input
                  id="employee-phone"
                  placeholder="+91 90000 10009"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddEmployee(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Employee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
