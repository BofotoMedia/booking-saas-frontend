import classNames from '@/utils/classNames'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarOptions } from '@fullcalendar/core'
import { Select } from '@/components/ui/Select'
import { useState, useRef, useEffect } from 'react'
import {useTranslations} from 'next-intl';

type EventColors = Record<
    string,
    {
        bg: string
        text: string
    }
>

interface CalendarViewProps extends CalendarOptions {
    wrapperClass?: string
    eventColors?: (colors: EventColors) => EventColors
    onViewChange?: (view: string) => void
    selectOptions?: Array<{ value: string; label: string }>
}

const defaultColorList: Record<
    string,
    {
        bg: string
        text: string
    }
> = {
    red: {
        bg: 'bg-[#fbddd9]',
        text: 'text-gray-900',
    },
    orange: {
        bg: 'bg-[#ffc6ab]',
        text: 'text-gray-900',
    },
    yellow: {
        bg: 'bg-[#ffd993]',
        text: 'text-gray-900',
    },
    green: {
        bg: 'bg-[#bee9d3]',
        text: 'text-gray-900',
    },
    blue: {
        bg: 'bg-[#bce9fb]',
        text: 'text-gray-900',
    },
    purple: {
        bg: 'bg-[#ccbbfc]',
        text: 'text-gray-900',
    },
}

const defaultSelectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
]

const CalendarView = (props: CalendarViewProps) => {
    const {
        wrapperClass,
        eventColors = () => defaultColorList,
        onViewChange,
        selectOptions = defaultSelectOptions,
        ...rest
    } = props

    const [selectedOption, setSelectedOption] = useState(selectOptions[0])
    const selectContainerRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<FullCalendar>(null)

    useEffect(() => {
        const toolbar = document.querySelector('.fc-toolbar-chunk:first-child')
        if (toolbar && selectContainerRef.current) {
            toolbar.innerHTML = ''
            toolbar.appendChild(selectContainerRef.current)
        }
    }, [])

    const handleSelectChange = (option: any) => {
        setSelectedOption(option)
        if (onViewChange) {
            onViewChange(option.value)
        }
        console.log('Selected option:', option)
    }
    
    const t = useTranslations();

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <div ref={selectContainerRef} style={{ display: 'inline-block', minWidth: '200px' }}>
                <Select
                    options={selectOptions}
                    onChange={handleSelectChange}
                    placeholder={t('protected.calendar.allEmployees')}
                    size="sm"
                    className="w-full"
                />
            </div>

            <FullCalendar
                initialView="dayGridMonth"
                ref={calendarRef}
                headerToolbar={{
                    left: '',
                    center: '',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next',
                }}
                eventContent={(arg) => {
                    const { extendedProps } = arg.event
                    const { isEnd, isStart } = arg
                    return (
                        <div
                            className={classNames(
                                'custom-calendar-event',
                                extendedProps.eventColor
                                    ? (eventColors(defaultColorList) ||
                                          defaultColorList)[
                                          extendedProps.eventColor
                                      ]?.bg
                                    : '',
                                extendedProps.eventColor
                                    ? (eventColors(defaultColorList) ||
                                          defaultColorList)[
                                          extendedProps.eventColor
                                      ]?.text
                                    : '',
                                isEnd &&
                                    !isStart &&
                                    'rounded-tl-none! rounded-bl-none! !rtl:rounded-tr-none !rtl:rounded-br-none',
                                !isEnd &&
                                    isStart &&
                                    'rounded-tr-none! rounded-br-none! !rtl:rounded-tl-none !rtl:rounded-bl-none',
                            )}
                        >
                            {!(isEnd && !isStart) && (
                                <span>{arg.timeText}</span>
                            )}
                            <span className="font-bold ml-1 rtl:mr-1">
                                {arg.event.title}
                            </span>
                        </div>
                    )
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                {...rest}
            />
        </div>
    )
}

export default CalendarView
