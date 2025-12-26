export interface Comment {
    id: string
    name: string
    src: string
    message: string
    date: number
}

export type Member = {
    id: string
    name: string
    img: string
}

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

export type Members = Member[]

export type ProjectMembers = {
    participantMembers: Members
    allMembers: Members
}

export type ServicesData = {
    categories: ServiceCategory[]
    disabledServices: ServiceItem[]
}