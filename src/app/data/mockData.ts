export interface RoutePoint {
  x: number;
  y: number;
  timestamp: string;
  location: string;
}

export interface DailyRouteRecord {
  date: string;
  status: 'online' | 'offline';
  lastSeen: string;
  routeDistanceKm: number;
  coordinatesCount: number;
  lat: number;
  lng: number;
  locationAddress: string;
  routePoints: RoutePoint[];
}

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastSeen: string;
  battery: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  assignedTo?: string;
  samplingRateMinutes: 10;
  routeDistanceKm: number;
  coordinatesToday: number;
  routePoints: RoutePoint[];
  routeHistory: DailyRouteRecord[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  assignedDevices: string[];
  status: 'active' | 'inactive';
}

export interface EmployeeMasterData {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  assignedTrackerId: string | null;
  status: 'active' | 'inactive';
}

export interface RouteActivity {
  id: string;
  employeeName: string;
  trackerId: string;
  message: string;
  time: string;
  type: 'update' | 'alert' | 'route';
  assignedTo?: string;
}

export const mockDevices: Device[] = [
  {
    id: 'TRK-001',
    name: 'Aarav Kumar',
    status: 'online',
    lastSeen: '8 mins ago',
    battery: 87,
    location: { lat: 17.7239, lng: 83.3034, address: 'Dwaraka Nagar, Visakhapatnam' },
    assignedTo: 'manager@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 16.8,
    coordinatesToday: 25,
    routePoints: [
      { x: 10, y: 80, timestamp: '08:00', location: 'Madhurawada' },
      { x: 22, y: 72, timestamp: '08:40', location: 'PM Palem' },
      { x: 36, y: 64, timestamp: '09:20', location: 'MVP Colony' },
      { x: 50, y: 56, timestamp: '10:00', location: 'Siripuram' },
      { x: 66, y: 48, timestamp: '10:40', location: 'Jagadamba Junction' },
      { x: 80, y: 42, timestamp: '11:20', location: 'Dwaraka Bus Complex' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '8 mins ago',
        routeDistanceKm: 16.8,
        coordinatesCount: 25,
        lat: 17.7239,
        lng: 83.3034,
        locationAddress: 'Dwaraka Nagar, Visakhapatnam',
        routePoints: [
          { x: 10, y: 80, timestamp: '08:00', location: 'Madhurawada' },
          { x: 22, y: 72, timestamp: '08:40', location: 'PM Palem' },
          { x: 36, y: 64, timestamp: '09:20', location: 'MVP Colony' },
          { x: 50, y: 56, timestamp: '10:00', location: 'Siripuram' },
          { x: 66, y: 48, timestamp: '10:40', location: 'Jagadamba Junction' },
          { x: 80, y: 42, timestamp: '11:20', location: 'Dwaraka Bus Complex' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 14.9,
        coordinatesCount: 22,
        lat: 17.7191,
        lng: 83.3112,
        locationAddress: 'Asilmetta, Visakhapatnam',
        routePoints: [
          { x: 12, y: 82, timestamp: '08:05', location: 'Madhurawada' },
          { x: 24, y: 74, timestamp: '08:45', location: 'Hanumanthawaka' },
          { x: 38, y: 66, timestamp: '09:25', location: 'MVP Colony' },
          { x: 54, y: 58, timestamp: '10:05', location: 'Siripuram' },
          { x: 72, y: 50, timestamp: '10:55', location: 'Asilmetta' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 11.6,
        coordinatesCount: 18,
        lat: 17.7142,
        lng: 83.3090,
        locationAddress: 'Dabagardens, Visakhapatnam',
        routePoints: [
          { x: 14, y: 84, timestamp: '08:10', location: 'PM Palem' },
          { x: 30, y: 74, timestamp: '08:50', location: 'Maddilapalem' },
          { x: 46, y: 66, timestamp: '09:30', location: 'RTC Complex' },
          { x: 62, y: 58, timestamp: '10:10', location: 'Dabagardens' }
        ]
      }
    ]
  },
  {
    id: 'TRK-002',
    name: 'Priya Sharma',
    status: 'online',
    lastSeen: '10 mins ago',
    battery: 92,
    location: { lat: 17.6920, lng: 83.2076, address: 'Gajuwaka, Visakhapatnam' },
    assignedTo: 'manager@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 14.2,
    coordinatesToday: 22,
    routePoints: [
      { x: 12, y: 82, timestamp: '08:10', location: 'Kurmannapalem' },
      { x: 24, y: 74, timestamp: '08:50', location: 'Old Gajuwaka' },
      { x: 38, y: 66, timestamp: '09:30', location: 'Scindia' },
      { x: 54, y: 58, timestamp: '10:10', location: 'Mindi' },
      { x: 70, y: 50, timestamp: '10:50', location: 'Gajuwaka Junction' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '10 mins ago',
        routeDistanceKm: 14.2,
        coordinatesCount: 22,
        lat: 17.6920,
        lng: 83.2076,
        locationAddress: 'Gajuwaka, Visakhapatnam',
        routePoints: [
          { x: 12, y: 82, timestamp: '08:10', location: 'Kurmannapalem' },
          { x: 24, y: 74, timestamp: '08:50', location: 'Old Gajuwaka' },
          { x: 38, y: 66, timestamp: '09:30', location: 'Scindia' },
          { x: 54, y: 58, timestamp: '10:10', location: 'Mindi' },
          { x: 70, y: 50, timestamp: '10:50', location: 'Gajuwaka Junction' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 12.3,
        coordinatesCount: 19,
        lat: 17.6996,
        lng: 83.2145,
        locationAddress: 'Mindi, Visakhapatnam',
        routePoints: [
          { x: 14, y: 80, timestamp: '08:00', location: 'Auto Nagar' },
          { x: 28, y: 72, timestamp: '08:40', location: 'Kurmannapalem' },
          { x: 44, y: 64, timestamp: '09:20', location: 'Old Gajuwaka' },
          { x: 60, y: 56, timestamp: '10:00', location: 'Mindi' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 9.7,
        coordinatesCount: 15,
        lat: 17.7043,
        lng: 83.2241,
        locationAddress: 'Scindia, Visakhapatnam',
        routePoints: [
          { x: 16, y: 84, timestamp: '08:15', location: 'Gajuwaka' },
          { x: 32, y: 76, timestamp: '08:55', location: 'Scindia' },
          { x: 50, y: 66, timestamp: '09:35', location: 'Mindi' }
        ]
      }
    ]
  },
  {
    id: 'TRK-003',
    name: 'Rohan Mehta',
    status: 'offline',
    lastSeen: '1 hour ago',
    battery: 45,
    location: { lat: 17.7440, lng: 83.2640, address: 'NAD Junction, Visakhapatnam' },
    assignedTo: 'user@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 8.1,
    coordinatesToday: 12,
    routePoints: [
      { x: 16, y: 78, timestamp: '08:30', location: 'Marripalem' },
      { x: 30, y: 70, timestamp: '09:10', location: 'NAD Junction' },
      { x: 44, y: 62, timestamp: '09:50', location: 'Kancharapalem' },
      { x: 60, y: 56, timestamp: '10:20', location: 'Convent Junction' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'offline',
        lastSeen: '1 hour ago',
        routeDistanceKm: 8.1,
        coordinatesCount: 12,
        lat: 17.7440,
        lng: 83.2640,
        locationAddress: 'NAD Junction, Visakhapatnam',
        routePoints: [
          { x: 16, y: 78, timestamp: '08:30', location: 'Marripalem' },
          { x: 30, y: 70, timestamp: '09:10', location: 'NAD Junction' },
          { x: 44, y: 62, timestamp: '09:50', location: 'Kancharapalem' },
          { x: 60, y: 56, timestamp: '10:20', location: 'Convent Junction' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 10.2,
        coordinatesCount: 16,
        lat: 17.7392,
        lng: 83.2724,
        locationAddress: 'Kancharapalem, Visakhapatnam',
        routePoints: [
          { x: 14, y: 82, timestamp: '08:05', location: 'NAD Junction' },
          { x: 30, y: 74, timestamp: '08:45', location: 'Maddilapalem' },
          { x: 46, y: 66, timestamp: '09:25', location: 'Kancharapalem' },
          { x: 62, y: 58, timestamp: '10:05', location: 'Convent Junction' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'online',
        lastSeen: '2 days ago',
        routeDistanceKm: 9.1,
        coordinatesCount: 14,
        lat: 17.7463,
        lng: 83.2588,
        locationAddress: 'Marripalem, Visakhapatnam',
        routePoints: [
          { x: 18, y: 84, timestamp: '08:20', location: 'NAD Junction' },
          { x: 34, y: 76, timestamp: '09:00', location: 'Marripalem' },
          { x: 50, y: 68, timestamp: '09:40', location: 'Old Gopalapatnam' }
        ]
      }
    ]
  },
  {
    id: 'TRK-004',
    name: 'Neha Verma',
    status: 'online',
    lastSeen: '9 mins ago',
    battery: 78,
    location: { lat: 17.7315, lng: 83.3042, address: 'Akkayyapalem, Visakhapatnam' },
    assignedTo: 'manager@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 12.9,
    coordinatesToday: 20,
    routePoints: [
      { x: 10, y: 84, timestamp: '08:15', location: 'Maddilapalem' },
      { x: 24, y: 76, timestamp: '08:55', location: 'Akkayyapalem' },
      { x: 38, y: 66, timestamp: '09:35', location: 'Asilmetta' },
      { x: 52, y: 58, timestamp: '10:15', location: 'Dabagardens' },
      { x: 68, y: 50, timestamp: '10:55', location: 'RTC Complex' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '9 mins ago',
        routeDistanceKm: 12.9,
        coordinatesCount: 20,
        lat: 17.7315,
        lng: 83.3042,
        locationAddress: 'Akkayyapalem, Visakhapatnam',
        routePoints: [
          { x: 10, y: 84, timestamp: '08:15', location: 'Maddilapalem' },
          { x: 24, y: 76, timestamp: '08:55', location: 'Akkayyapalem' },
          { x: 38, y: 66, timestamp: '09:35', location: 'Asilmetta' },
          { x: 52, y: 58, timestamp: '10:15', location: 'Dabagardens' },
          { x: 68, y: 50, timestamp: '10:55', location: 'RTC Complex' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 11.8,
        coordinatesCount: 18,
        lat: 17.7274,
        lng: 83.3007,
        locationAddress: 'Asilmetta, Visakhapatnam',
        routePoints: [
          { x: 12, y: 82, timestamp: '08:05', location: 'MVP Colony' },
          { x: 28, y: 74, timestamp: '08:45', location: 'Akkayyapalem' },
          { x: 44, y: 66, timestamp: '09:25', location: 'Asilmetta' },
          { x: 60, y: 58, timestamp: '10:05', location: 'Dwaraka Nagar' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 9.4,
        coordinatesCount: 14,
        lat: 17.7211,
        lng: 83.2952,
        locationAddress: 'Dabagardens, Visakhapatnam',
        routePoints: [
          { x: 14, y: 84, timestamp: '08:20', location: 'Maddilapalem' },
          { x: 30, y: 76, timestamp: '09:00', location: 'Dabagardens' },
          { x: 46, y: 68, timestamp: '09:40', location: 'RTC Complex' }
        ]
      }
    ]
  },
  {
    id: 'TRK-005',
    name: 'Vikram Rao',
    status: 'online',
    lastSeen: '7 mins ago',
    battery: 95,
    location: { lat: 17.7420, lng: 83.3415, address: 'MVP Colony, Visakhapatnam' },
    assignedTo: 'user@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 11.4,
    coordinatesToday: 18,
    routePoints: [
      { x: 14, y: 80, timestamp: '08:05', location: 'Rushikonda' },
      { x: 28, y: 72, timestamp: '08:45', location: 'Yendada' },
      { x: 42, y: 64, timestamp: '09:25', location: 'MVP Double Road' },
      { x: 58, y: 56, timestamp: '10:05', location: 'Beach Road' },
      { x: 74, y: 48, timestamp: '10:45', location: 'Siripuram' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '7 mins ago',
        routeDistanceKm: 11.4,
        coordinatesCount: 18,
        lat: 17.7420,
        lng: 83.3415,
        locationAddress: 'MVP Colony, Visakhapatnam',
        routePoints: [
          { x: 14, y: 80, timestamp: '08:05', location: 'Rushikonda' },
          { x: 28, y: 72, timestamp: '08:45', location: 'Yendada' },
          { x: 42, y: 64, timestamp: '09:25', location: 'MVP Double Road' },
          { x: 58, y: 56, timestamp: '10:05', location: 'Beach Road' },
          { x: 74, y: 48, timestamp: '10:45', location: 'Siripuram' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 10.1,
        coordinatesCount: 16,
        lat: 17.7368,
        lng: 83.3389,
        locationAddress: 'Yendada, Visakhapatnam',
        routePoints: [
          { x: 16, y: 82, timestamp: '08:10', location: 'Rushikonda' },
          { x: 32, y: 74, timestamp: '08:50', location: 'Yendada' },
          { x: 50, y: 66, timestamp: '09:30', location: 'MVP Colony' },
          { x: 66, y: 58, timestamp: '10:10', location: 'Siripuram' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 8.9,
        coordinatesCount: 13,
        lat: 17.7312,
        lng: 83.3336,
        locationAddress: 'Beach Road, Visakhapatnam',
        routePoints: [
          { x: 18, y: 84, timestamp: '08:15', location: 'MVP Colony' },
          { x: 36, y: 76, timestamp: '08:55', location: 'Beach Road' },
          { x: 54, y: 68, timestamp: '09:35', location: 'Siripuram' }
        ]
      }
    ]
  },
  {
    id: 'TRK-006',
    name: 'Sneha Iyer',
    status: 'offline',
    lastSeen: '2 hours ago',
    battery: 22,
    location: { lat: 17.7412, lng: 83.3133, address: 'Seethammadhara, Visakhapatnam' },
    samplingRateMinutes: 10,
    routeDistanceKm: 6.2,
    coordinatesToday: 9,
    routePoints: [
      { x: 12, y: 82, timestamp: '08:20', location: 'HB Colony' },
      { x: 26, y: 74, timestamp: '09:00', location: 'Seethammadhara' },
      { x: 40, y: 66, timestamp: '09:40', location: 'Eenadu Junction' },
      { x: 54, y: 58, timestamp: '10:10', location: 'Maddilapalem' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'offline',
        lastSeen: '2 hours ago',
        routeDistanceKm: 6.2,
        coordinatesCount: 9,
        lat: 17.7412,
        lng: 83.3133,
        locationAddress: 'Seethammadhara, Visakhapatnam',
        routePoints: [
          { x: 12, y: 82, timestamp: '08:20', location: 'HB Colony' },
          { x: 26, y: 74, timestamp: '09:00', location: 'Seethammadhara' },
          { x: 40, y: 66, timestamp: '09:40', location: 'Eenadu Junction' },
          { x: 54, y: 58, timestamp: '10:10', location: 'Maddilapalem' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 8.4,
        coordinatesCount: 13,
        lat: 17.7362,
        lng: 83.3095,
        locationAddress: 'Maddilapalem, Visakhapatnam',
        routePoints: [
          { x: 14, y: 84, timestamp: '08:05', location: 'HB Colony' },
          { x: 30, y: 76, timestamp: '08:45', location: 'Eenadu Junction' },
          { x: 46, y: 68, timestamp: '09:25', location: 'Maddilapalem' },
          { x: 62, y: 60, timestamp: '10:05', location: 'Akkayyapalem' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 5.1,
        coordinatesCount: 8,
        lat: 17.7308,
        lng: 83.3049,
        locationAddress: 'Akkayyapalem, Visakhapatnam',
        routePoints: [
          { x: 18, y: 86, timestamp: '08:20', location: 'Seethammadhara' },
          { x: 34, y: 78, timestamp: '09:00', location: 'Akkayyapalem' },
          { x: 50, y: 70, timestamp: '09:40', location: 'Dwaraka Nagar' }
        ]
      }
    ]
  },
  {
    id: 'TRK-007',
    name: 'Karan Singh',
    status: 'online',
    lastSeen: '10 mins ago',
    battery: 88,
    location: { lat: 17.7149, lng: 83.3237, address: 'RK Beach, Visakhapatnam' },
    assignedTo: 'manager@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 9.8,
    coordinatesToday: 16,
    routePoints: [
      { x: 10, y: 78, timestamp: '08:10', location: 'Kailasagiri Foothills' },
      { x: 24, y: 70, timestamp: '08:50', location: 'Tenneti Park' },
      { x: 38, y: 62, timestamp: '09:30', location: 'RK Beach' },
      { x: 54, y: 54, timestamp: '10:10', location: 'YMCA' },
      { x: 70, y: 46, timestamp: '10:50', location: 'Aquarium Junction' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '10 mins ago',
        routeDistanceKm: 9.8,
        coordinatesCount: 16,
        lat: 17.7149,
        lng: 83.3237,
        locationAddress: 'RK Beach, Visakhapatnam',
        routePoints: [
          { x: 10, y: 78, timestamp: '08:10', location: 'Kailasagiri Foothills' },
          { x: 24, y: 70, timestamp: '08:50', location: 'Tenneti Park' },
          { x: 38, y: 62, timestamp: '09:30', location: 'RK Beach' },
          { x: 54, y: 54, timestamp: '10:10', location: 'YMCA' },
          { x: 70, y: 46, timestamp: '10:50', location: 'Aquarium Junction' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 8.6,
        coordinatesCount: 14,
        lat: 17.7103,
        lng: 83.3201,
        locationAddress: 'Beach Road, Visakhapatnam',
        routePoints: [
          { x: 12, y: 80, timestamp: '08:00', location: 'Kailasagiri' },
          { x: 28, y: 72, timestamp: '08:40', location: 'Tenneti Park' },
          { x: 44, y: 64, timestamp: '09:20', location: 'RK Beach' },
          { x: 62, y: 56, timestamp: '10:00', location: 'Beach Road' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 7.4,
        coordinatesCount: 11,
        lat: 17.7055,
        lng: 83.3170,
        locationAddress: 'Lawsons Bay, Visakhapatnam',
        routePoints: [
          { x: 14, y: 84, timestamp: '08:20', location: 'RK Beach' },
          { x: 32, y: 76, timestamp: '09:00', location: 'Lawsons Bay' },
          { x: 50, y: 68, timestamp: '09:40', location: 'Tenneti Park' }
        ]
      }
    ]
  },
  {
    id: 'TRK-008',
    name: 'Meera Nair',
    status: 'online',
    lastSeen: '9 mins ago',
    battery: 71,
    location: { lat: 17.7815, lng: 83.2134, address: 'Pendurthi, Visakhapatnam' },
    assignedTo: 'user@iot.com',
    samplingRateMinutes: 10,
    routeDistanceKm: 13.1,
    coordinatesToday: 19,
    routePoints: [
      { x: 16, y: 82, timestamp: '08:00', location: 'Pendurthi' },
      { x: 30, y: 74, timestamp: '08:40', location: 'Sujatha Nagar' },
      { x: 44, y: 66, timestamp: '09:20', location: 'Chinamushidiwada' },
      { x: 58, y: 58, timestamp: '10:00', location: 'NAD Junction' },
      { x: 74, y: 50, timestamp: '10:40', location: 'Maddilapalem' }
    ],
    routeHistory: [
      {
        date: '2026-02-22',
        status: 'online',
        lastSeen: '9 mins ago',
        routeDistanceKm: 13.1,
        coordinatesCount: 19,
        lat: 17.7815,
        lng: 83.2134,
        locationAddress: 'Pendurthi, Visakhapatnam',
        routePoints: [
          { x: 16, y: 82, timestamp: '08:00', location: 'Pendurthi' },
          { x: 30, y: 74, timestamp: '08:40', location: 'Sujatha Nagar' },
          { x: 44, y: 66, timestamp: '09:20', location: 'Chinamushidiwada' },
          { x: 58, y: 58, timestamp: '10:00', location: 'NAD Junction' },
          { x: 74, y: 50, timestamp: '10:40', location: 'Maddilapalem' }
        ]
      },
      {
        date: '2026-02-21',
        status: 'online',
        lastSeen: '1 day ago',
        routeDistanceKm: 12.0,
        coordinatesCount: 17,
        lat: 17.7722,
        lng: 83.2268,
        locationAddress: 'Sujatha Nagar, Visakhapatnam',
        routePoints: [
          { x: 18, y: 84, timestamp: '08:05', location: 'Pendurthi' },
          { x: 34, y: 76, timestamp: '08:45', location: 'Sujatha Nagar' },
          { x: 50, y: 68, timestamp: '09:25', location: 'Chinamushidiwada' },
          { x: 66, y: 60, timestamp: '10:05', location: 'NAD Junction' }
        ]
      },
      {
        date: '2026-02-20',
        status: 'offline',
        lastSeen: '2 days ago',
        routeDistanceKm: 9.6,
        coordinatesCount: 13,
        lat: 17.7590,
        lng: 83.2401,
        locationAddress: 'NAD Junction, Visakhapatnam',
        routePoints: [
          { x: 20, y: 86, timestamp: '08:20', location: 'Pendurthi' },
          { x: 38, y: 78, timestamp: '09:00', location: 'Chinamushidiwada' },
          { x: 56, y: 70, timestamp: '09:40', location: 'NAD Junction' }
        ]
      }
    ]
  }
];

export const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@iot.com',
    role: 'admin',
    assignedDevices: [],
    status: 'active'
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@iot.com',
    role: 'manager',
    assignedDevices: ['TRK-001', 'TRK-002', 'TRK-004', 'TRK-007'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Employee User',
    email: 'user@iot.com',
    role: 'user',
    assignedDevices: ['TRK-003', 'TRK-005', 'TRK-008'],
    status: 'active'
  }
];

export const mockEmployeeMaster: EmployeeMasterData[] = [
  {
    id: 'EMP-1',
    employeeId: 'EMP-001',
    name: 'Aarav Kumar',
    email: 'aarav.kumar@iot.com',
    phone: '+91 90000 10001',
    assignedTrackerId: 'TRK-001',
    status: 'active',
  },
  {
    id: 'EMP-2',
    employeeId: 'EMP-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@iot.com',
    phone: '+91 90000 10002',
    assignedTrackerId: 'TRK-002',
    status: 'active',
  },
  {
    id: 'EMP-3',
    employeeId: 'EMP-003',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@iot.com',
    phone: '+91 90000 10003',
    assignedTrackerId: 'TRK-003',
    status: 'active',
  },
  {
    id: 'EMP-4',
    employeeId: 'EMP-004',
    name: 'Neha Verma',
    email: 'neha.verma@iot.com',
    phone: '+91 90000 10004',
    assignedTrackerId: 'TRK-004',
    status: 'active',
  },
  {
    id: 'EMP-5',
    employeeId: 'EMP-005',
    name: 'Vikram Rao',
    email: 'vikram.rao@iot.com',
    phone: '+91 90000 10005',
    assignedTrackerId: 'TRK-005',
    status: 'active',
  },
  {
    id: 'EMP-6',
    employeeId: 'EMP-006',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@iot.com',
    phone: '+91 90000 10006',
    assignedTrackerId: 'TRK-006',
    status: 'active',
  },
  {
    id: 'EMP-7',
    employeeId: 'EMP-007',
    name: 'Karan Singh',
    email: 'karan.singh@iot.com',
    phone: '+91 90000 10007',
    assignedTrackerId: 'TRK-007',
    status: 'active',
  },
  {
    id: 'EMP-8',
    employeeId: 'EMP-008',
    name: 'Meera Nair',
    email: 'meera.nair@iot.com',
    phone: '+91 90000 10008',
    assignedTrackerId: 'TRK-008',
    status: 'active',
  },
];

export const routeActivities: RouteActivity[] = [
  {
    id: 'ACT-001',
    employeeName: 'Aarav Kumar',
    trackerId: 'TRK-001',
    message: 'Latest ping received near Dwaraka Bus Complex',
    time: '11:20 AM',
    type: 'update',
    assignedTo: 'manager@iot.com'
  },
  {
    id: 'ACT-002',
    employeeName: 'Priya Sharma',
    trackerId: 'TRK-002',
    message: 'Visited Gajuwaka Junction checkpoint',
    time: '11:10 AM',
    type: 'route',
    assignedTo: 'manager@iot.com'
  },
  {
    id: 'ACT-003',
    employeeName: 'Rohan Mehta',
    trackerId: 'TRK-003',
    message: 'No coordinate update for 60+ minutes',
    time: '10:40 AM',
    type: 'alert',
    assignedTo: 'user@iot.com'
  },
  {
    id: 'ACT-004',
    employeeName: 'Vikram Rao',
    trackerId: 'TRK-005',
    message: 'Moved from MVP Colony to Siripuram corridor',
    time: '10:55 AM',
    type: 'route',
    assignedTo: 'user@iot.com'
  },
  {
    id: 'ACT-005',
    employeeName: 'Karan Singh',
    trackerId: 'TRK-007',
    message: 'Coordinate sync delayed by 4 minutes near RK Beach',
    time: '10:50 AM',
    type: 'alert',
    assignedTo: 'manager@iot.com'
  },
  {
    id: 'ACT-006',
    employeeName: 'Meera Nair',
    trackerId: 'TRK-008',
    message: 'Latest checkpoint logged at Maddilapalem',
    time: '10:40 AM',
    type: 'update',
    assignedTo: 'user@iot.com'
  }
];

export function getAvailableRouteDates(): string[] {
  const dates = new Set<string>();
  mockDevices.forEach((device) => {
    device.routeHistory.forEach((record) => dates.add(record.date));
  });
  return Array.from(dates).sort((a, b) => b.localeCompare(a));
}

export function getRouteRecordByDate(device: Device, date: string): DailyRouteRecord | null {
  const direct = device.routeHistory.find((record) => record.date === date);
  if (direct) return direct;
  return device.routeHistory[0] ?? null;
}
