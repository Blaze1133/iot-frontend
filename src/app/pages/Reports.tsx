import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { DateRangePicker } from '../components/DateRangePicker';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const distanceData = [
  { day: 'Mon', km: 184 },
  { day: 'Tue', km: 201 },
  { day: 'Wed', km: 193 },
  { day: 'Thu', km: 216 },
  { day: 'Fri', km: 208 },
  { day: 'Sat', km: 167 },
  { day: 'Sun', km: 176 },
];

const complianceData = [
  { month: 'Jan', samplingCompliance: 97.6 },
  { month: 'Feb', samplingCompliance: 97.9 },
  { month: 'Mar', samplingCompliance: 98.1 },
  { month: 'Apr', samplingCompliance: 97.3 },
  { month: 'May', samplingCompliance: 98.4 },
  { month: 'Jun', samplingCompliance: 98.2 },
];

export default function Reports() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Business Reports</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Business-level tracking KPIs for distance, utilization, and compliance
                </p>
              </div>
              <div className="flex gap-3">
                <DateRangePicker />
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Total Distance (Month)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">5,438 km</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+7.4% vs last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Avg Distance / Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">12.8 km</div>
                  <div className="text-sm text-slate-500 mt-1">Per active employee per day</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Sampling Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">98.2%</div>
                  <div className="text-sm text-slate-500 mt-1">10-minute interval adherence</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Active Employees (Avg)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">421</div>
                  <div className="text-sm text-slate-500 mt-1">Daily average this month</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distance Covered (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={distanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          color: '#111827',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="km" fill="#2563eb" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sampling Compliance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" domain={[95, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          color: '#111827',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="samplingCompliance" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Monthly Distance Performance - February 2026', date: 'Generated on Feb 21, 2026', size: '2.1 MB' },
                    { name: 'Sampling Compliance Executive Summary', date: 'Generated on Feb 18, 2026', size: '1.7 MB' },
                    { name: 'Employee Utilization and Coverage Report', date: 'Generated on Feb 15, 2026', size: '2.9 MB' },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
