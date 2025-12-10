import { cn } from '@/lib/utils'
import { buttonVariants } from './button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn('rounded-lg bg-gray-900 p-4', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium text-cyan-400',
        nav: 'flex items-center gap-1 absolute inset-x-1 top-0 justify-between',
        button_previous:
          'size-7 bg-transparent text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-md transition-colors flex items-center justify-center',
        button_next:
          'size-7 bg-transparent text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-md transition-colors flex items-center justify-center',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 size-9',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-9 p-0 font-normal aria-selected:opacity-100 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors'
        ),
        range_start: 'day-range-start rounded-l-md bg-cyan-500/20',
        range_end: 'day-range-end rounded-r-md bg-cyan-500/20',
        selected:
          'bg-cyan-500 text-gray-900 hover:bg-cyan-600 focus:bg-cyan-600 rounded-md',
        today: 'bg-gray-800 text-cyan-400 font-semibold rounded-md',
        outside: 'text-gray-600 aria-selected:text-gray-400',
        disabled: 'text-gray-700 opacity-50 cursor-not-allowed',
        range_middle: 'aria-selected:bg-cyan-500/20 aria-selected:text-white',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
