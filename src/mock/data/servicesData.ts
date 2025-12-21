export type Service = {
    id: string
    name: string
    duration: number
    hasRecurring: boolean
    prices: {
        A?: number
        B?: number
        C?: number
    }
    addons?: string[]
    disabled?: boolean
    noCategory?: boolean
}

export type Category = {
    id: string
    name: string
    count: number
    step?: string
    addons?: string[]
    services: Service[]
}

export type ServicesData = {
    categories: Category[]
    disabledServices: Service[]
    serviceAddons: string[]
    bookingAddons: string[]
    additionalInfo: string[]
}

export const servicesData: ServicesData = {
    categories: [
        {
            id: 'cat-1',
            name: 'Home Cleaning',
            count: 3,
            services: [
                {
                    id: 'srv-1',
                    name: 'Window Cleaning',
                    duration: 40,
                    hasRecurring: true,
                    prices: { A: 18.00, B: 14.00, C: 13.00 },
                },
                {
                    id: 'srv-2',
                    name: 'Room Cleaning',
                    duration: 40,
                    hasRecurring: true,
                    prices: { A: 18.00 },
                    addons: ['Item Relocation', 'Waste Removal'],
                },
                {
                    id: 'srv-3',
                    name: 'Floor Care',
                    duration: 40,
                    hasRecurring: true,
                    prices: { A: 25.00, B: 20.00 },
                },
            ],
        },
        {
            id: 'cat-2',
            name: 'Home Cleaning 2',
            count: 1,
            step: 'Step 2',
            addons: ['Extra Time on Location'],
            services: [
                {
                    id: 'srv-4',
                    name: 'Deep Cleaning',
                    duration: 120,
                    hasRecurring: false,
                    prices: { A: 45.00, B: 40.00, C: 35.00 },
                    addons: ['Extra Time on Location'],
                },
            ],
        },
        {
            id: 'cat-3',
            name: 'Business Cleaning',
            count: 0,
            services: [],
        },
        {
            id: 'cat-4',
            name: 'Moving Cleaning',
            count: 0,
            services: [],
        },
    ],
    disabledServices: [
        {
            id: 'dis-srv-1',
            name: 'Window Cleaning (Old)',
            duration: 40,
            hasRecurring: true,
            prices: { A: 18.00, B: 14.00, C: 13.00 },
            disabled: true,
            noCategory: true,
        },
        {
            id: 'dis-srv-2',
            name: 'Carpet Cleaning',
            duration: 60,
            hasRecurring: true,
            prices: { A: 30.00 },
            disabled: true,
        },
    ],
    serviceAddons: [
        'Extra Time on Location',
        'Waste Removal',
        'Sunset',
        'Dusk',
        'Night',
        'Drone Photography',
    ],
    bookingAddons: [
        'Key Pickup / Key Return',
        'Item Relocation',
        'Express Service',
    ],
    additionalInfo: [
        'Model name',
        'Model Nr.',
        'Description issue',
    ],
}