import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangePickerProps {
  onDateChange?: (from: Date | undefined, to: Date | undefined) => void;
}

export function DateRangePicker({ onDateChange }: DateRangePickerProps) {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleFromChange = (date: Date | undefined) => {
    setDateFrom(date);
    onDateChange?.(date, dateTo);
  };

  const handleToChange = (date: Date | undefined) => {
    setDateTo(date);
    onDateChange?.(dateFrom, date);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[200px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateFrom ? format(dateFrom, 'PP') : 'Start date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateFrom}
            onSelect={handleFromChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <span className="text-gray-500 hidden sm:inline">to</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-[200px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTo ? format(dateTo, 'PP') : 'End date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateTo}
            onSelect={handleToChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
