export type ServiceItem = {
    id: string
    name: string
    duration: number // in minutes
    prices: number[] // array of prices
    addons: string[]
    image?: string
    checked: boolean
    currency?: string
}

export type ServiceCategory = {
    id: string
    name: string
    items: ServiceItem[]
    expanded: boolean
}

export type AddonItem = {
    id: string
    name: string
    step2: boolean
}

export const serviceAddons: AddonItem[] = [
    {
        id: '1',
        name: 'Extra Time on Location',
        step2: false,
    },
    {
        id: '2',
        name: 'Waste Removal',
        step2: false,
    },
    {
        id: '3',
        name: 'Sunset',
        step2: false,
    },
    {
        id: '4',
        name: 'Dusk',
        step2: false,
    },
    {
        id: '5',
        name: 'Night',
        step2: false,
    },
    {
        id: '6',
        name: 'Drone Photography',
        step2: false,
    },
]

export const bookingAddons: AddonItem[] = [
    {
        id: '1',
        name: 'Key Pickup / Key Return',
        step2: false,
    },
    {
        id: '2',
        name: 'Item Relocation',
        step2: false,
    },
    {
        id: '3',
        name: 'Express Service',
        step2: false,
    },
]

export const additionalInfo: AddonItem[] = [
    {
        id: '1',
        name: 'Model name',
        step2: true,
    },
    {
        id: '2',
        name: 'Model Nr.',
        step2: true,
    },
    {
        id: '3',
        name: 'Description issue',
        step2: true,
    },
]

export const serviceCategories: ServiceCategory[] = [
    {
        id: 'home-cleaning-1',
        name: 'Home Cleaning Service Primary',
        expanded: true,
        items: [
            {
                id: 'window-cleaning-1',
                name: 'Window Cleaning Service Primary',
                duration: 40,
                prices: [18.00, 14.00, 13.00],
                addons: ['Item Relocation', 'Waste Removal'],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
                currency: 'EUR',
            },
            {
                id: 'window-cleaning-2',
                name: 'Window Cleaning',
                duration: 40,
                prices: [18.00],
                addons: [],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
                currency: 'EUR',
            },
            {
                id: 'window-cleaning-3',
                name: 'Window Cleaning',
                duration: 40,
                prices: [18.00, 14.00, 13.00],
                addons: ['Item Relocation', 'Waste Removal'],
                image: '/img/logo/logo-light-streamline-backup.png',
                checked: false,
                currency: 'EUR',
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
                currency: 'EUR',
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
        currency: 'EUR',
    },
    {
        id: 'disabled-window-2',
        name: 'Window Cleaning',
        duration: 40,
        prices: [18.00, 14.00, 13.00],
        addons: [],
        checked: false,
        currency: 'EUR',
    },
]

export const servicesData = {
    categories: serviceCategories,
    disabledServices: disabledServices,
}