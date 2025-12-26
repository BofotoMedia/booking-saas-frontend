export type ServiceItem = {
    id: string
    name: string
    duration: number // in minutes
    prices: number[] // array of prices
    addons: string[]
    image?: string
    checked: boolean
}

export type ServiceCategory = {
    id: string
    name: string
    items: ServiceItem[]
    expanded: boolean
}

export const serviceAddons = [
    'Extra Time on Location',
    'Waste Removal',
    'Sunset',
    'Dusk',
    'Night',
    'Drone Photography',
]

export const bookingAddons = [
    'Key Pickup / Key Return',
    'Item Relocation',
    'Express Service',
]

export const additionalInfo = [
    'Model name',
    'Model Nr.',
    'Description issue',
]

export const serviceCategories: ServiceCategory[] = [
    {
        id: 'home-cleaning-1',
        name: 'Home Cleaning',
        expanded: true,
        items: [
            {
                id: 'window-cleaning-1',
                name: 'Window Cleaning',
                duration: 40,
                prices: [18.00, 14.00, 13.00],
                addons: ['Item Relocation', 'Waste Removal'],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
            },
            {
                id: 'window-cleaning-2',
                name: 'Window Cleaning',
                duration: 40,
                prices: [18.00],
                addons: [],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
            },
            {
                id: 'window-cleaning-3',
                name: 'Window Cleaning',
                duration: 40,
                prices: [18.00, 14.00, 13.00],
                addons: ['Item Relocation', 'Waste Removal'],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
            },
        ],
    },
    {
        id: 'home-cleaning-2',
        name: 'Home Cleaning',
        expanded: false,
        items: [],
    },
    {
        id: 'repair-appliances',
        name: 'Repair of household appliances',
        expanded: false,
        items: [
            {
                id: 'repair-1',
                name: 'Appliance Repair',
                duration: 60,
                prices: [25.00],
                addons: ['Model Nr.', 'Description issue'],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
            },
        ],
    },
    {
        id: 'home-cleaning-3',
        name: 'Home Cleaning',
        expanded: false,
        items: [],
    },
]

export const disabledServices: ServiceItem[] = [
    {
        id: 'disabled-window-1',
        name: 'Window Cleaning',
        duration: 40,
        prices: [18.00, 14.00, 13.00],
        addons: [],
        image: '/img/logo/logo-light-streamline-backup.png',
        checked: false,
    },
    {
        id: 'disabled-window-2',
        name: 'Window Cleaning',
        duration: 40,
        prices: [18.00, 14.00, 13.00],
        addons: [],
        checked: false,
    },
]

export const servicesData = {
    categories: serviceCategories,
    disabledServices: disabledServices,
}