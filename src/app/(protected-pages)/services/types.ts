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

export type AddonType = 'service' | 'booking' | 'info'