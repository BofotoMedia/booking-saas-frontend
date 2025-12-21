'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { TbPlus } from 'react-icons/tb'
import CategoryDialog from './CategoryDialog'
import ServiceDialog from './ServiceDialog'
import AddonsDialog from './AddonsDialog'
import { useServicesStore } from '../_store/servicesStore'

const ServicesHeader = () => {
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
    const [addonsDialogOpen, setAddonsDialogOpen] = useState(false)

    const {
        categories,
        serviceAddons,
        bookingAddons,
        additionalInfo,
        addCategory,
        addService,
        addServiceAddon,
        updateServiceAddon,
        deleteServiceAddon,
        addBookingAddon,
        updateBookingAddon,
        deleteBookingAddon,
        addAdditionalInfo,
        updateAdditionalInfo,
        deleteAdditionalInfo,
    } = useServicesStore()

    const handleAddCategory = (data: Parameters<typeof addCategory>[0]) => {
        addCategory(data)
        setCategoryDialogOpen(false)
    }

    const handleAddService = (categoryId: string, data: Parameters<typeof addService>[1]) => {
        addService(categoryId, data)
        setServiceDialogOpen(false)
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Services</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your service categories and offerings
                    </p>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        icon={<TbPlus />}
                        onClick={() => setCategoryDialogOpen(true)}
                        variant="outline"
                    >
                        Add Category
                    </Button>
                    <Button
                        size="sm"
                        icon={<TbPlus />}
                        onClick={() => setServiceDialogOpen(true)}
                    >
                        Add Service
                    </Button>
                    <Button
                        size="sm"
                        icon={<TbPlus />}
                        onClick={() => setAddonsDialogOpen(true)}
                        variant="outline"
                    >
                        Manage Add-ons
                    </Button>
                </div>
            </div>

            <CategoryDialog
                isOpen={categoryDialogOpen}
                onClose={() => setCategoryDialogOpen(false)}
                onSave={handleAddCategory}
            />

            <ServiceDialog
                isOpen={serviceDialogOpen}
                onClose={() => setServiceDialogOpen(false)}
                onSave={handleAddService}
                categories={categories}
            />

            <AddonsDialog
                isOpen={addonsDialogOpen}
                onClose={() => setAddonsDialogOpen(false)}
                serviceAddons={serviceAddons}
                bookingAddons={bookingAddons}
                additionalInfo={additionalInfo}
                onAddServiceAddon={addServiceAddon}
                onUpdateServiceAddon={updateServiceAddon}
                onDeleteServiceAddon={deleteServiceAddon}
                onAddBookingAddon={addBookingAddon}
                onUpdateBookingAddon={updateBookingAddon}
                onDeleteBookingAddon={deleteBookingAddon}
                onAddAdditionalInfo={addAdditionalInfo}
                onUpdateAdditionalInfo={updateAdditionalInfo}
                onDeleteAdditionalInfo={deleteAdditionalInfo}
            />
        </>
    )
}

export default ServicesHeader