'use client'

import { useEffect } from 'react'
import { useServicesStore } from '../_store/servicesStore'
import type { ServicesData, ProjectMembers } from '../types'
import type { CommonProps } from '@/@types/common'

interface ServicesProviderProps extends CommonProps {
    data: ServicesData
    projectMembers: ProjectMembers
    serviceAddons: string[]
    bookingAddons: string[]
    additionalInfo: string[]
}

const ServicesProvider = ({
    children,
    data,
    projectMembers,
    serviceAddons,
    bookingAddons,
    additionalInfo,
}: ServicesProviderProps) => {
    const updateCategories = useServicesStore((state) => state.updateCategories)
    const updateDisabledServices = useServicesStore((state) => state.updateDisabledServices)
    const updateServiceAddons = useServicesStore((state) => state.updateServiceAddons)
    const updateBookingAddons = useServicesStore((state) => state.updateBookingAddons)
    const updateAdditionalInfo = useServicesStore((state) => state.updateAdditionalInfo)
    const updateBoardMembers = useServicesStore((state) => state.updateBoardMembers)
    const updateAllMembers = useServicesStore((state) => state.updateAllMembers)

    useEffect(() => {
        updateCategories(data.categories)
        updateDisabledServices(data.disabledServices)
        updateServiceAddons(serviceAddons)
        updateBookingAddons(bookingAddons)
        updateAdditionalInfo(additionalInfo)
        updateBoardMembers(projectMembers.participantMembers)
        updateAllMembers(projectMembers.allMembers)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, projectMembers, serviceAddons, bookingAddons, additionalInfo])

    return <>{children}</>
}

export default ServicesProvider