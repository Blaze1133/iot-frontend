import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isOnline = status === 'online' || status === 'active';
  
  return (
    <Badge 
      className={`${
        isOnline 
          ? 'bg-green-100 text-green-700 hover:bg-green-100' 
          : 'bg-red-100 text-red-700 hover:bg-red-100'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        isOnline ? 'bg-green-500' : 'bg-red-500'
      }`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
