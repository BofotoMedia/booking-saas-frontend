'use client'

import { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import CategorySection from './CategorySection'
import ServiceItem from './ServiceItem'
import SidebarSection from './SidebarSection'
import { ServicesData } from '../types'
import { useServicesStore } from '../_store/servicesStore'

interface ServicesListProps {
    data: ServicesData
}

const ServicesList = ({ data }: ServicesListProps) => {
    const { 
        categories, 
        disabledServices, 
        serviceAddons, 
        bookingAddons, 
        additionalInfo,
        setServicesData,
        addAddonToService,
        addAddonToCategory,
        moveServiceToCategory,
    } = useServicesStore()

    useEffect(() => {
        setServicesData(data)
    }, [data, setServicesData])

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId, type } = result

        // Dropped outside a valid droppable
        if (!destination) {
            return
        }

        // Dropped in the same location
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        // Handle SERVICE drag (moving services between categories/disabled)
        if (type === 'SERVICE') {
            const serviceId = draggableId.split('-')[2] // Extract from "service-drag-{id}-{categoryId}"
            
            // Moving from disabled to category
            if (source.droppableId === 'disabled-services' && destination.droppableId.startsWith('category-services-')) {
                const targetCategoryId = destination.droppableId.replace('category-services-', '')
                moveServiceToCategory(serviceId, targetCategoryId)
                return
            }

            // Moving from category to disabled
            if (source.droppableId.startsWith('category-services-') && destination.droppableId === 'disabled-services') {
                // This is handled by the disable button in ServiceItem
                return
            }

            // Moving between categories
            if (source.droppableId.startsWith('category-services-') && destination.droppableId.startsWith('category-services-')) {
                const targetCategoryId = destination.droppableId.replace('category-services-', '')
                moveServiceToCategory(serviceId, targetCategoryId)
                return
            }
        }

        // Handle ADDON drag (existing functionality)
        if (type === 'ADDON') {
            // Extract addon name from draggableId
            // Format: "addon-{type}-{index}-{addonName}"
            const addonName = draggableId.split('-').slice(3).join('-')

            // Dropped on a service
            if (destination.droppableId.startsWith('service-')) {
                const parts = destination.droppableId.split('-')
                const serviceId = parts[1]
                const categoryId = parts[2]
                
                if (categoryId && categoryId !== 'disabled') {
                    addAddonToService(categoryId, serviceId, addonName)
                }
            }

            // Dropped on a category
            if (destination.droppableId.startsWith('category-') && !destination.droppableId.includes('services')) {
                const categoryId = destination.droppableId.replace('category-', '')
                addAddonToCategory(categoryId, addonName)
            }
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Categories */}
                    <div className="mb-8">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <CategorySection key={category.id} category={category} />
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                No categories available
                            </div>
                        )}
                    </div>

                    {/* Disabled Services Section */}
                    {disabledServices.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Disabled Services
                            </h3>
                            <Droppable droppableId="disabled-services" type="SERVICE">
                                {(provided, snapshot) => (
                                    <div 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`space-y-2 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''}`}
                                    >
                                        {disabledServices.map((service, index) => (
                                            <ServiceItem 
                                                key={service.id} 
                                                service={service} 
                                                showDragger={true}
                                                index={index}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="w-72 shrink-0">
                    <div className="sticky top-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-4 pb-3 border-b border-gray-200">
                                Drag addons to services or categories to assign them
                            </p>
                            
                            <Droppable droppableId="sidebar-service-addons" type="ADDON">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <SidebarSection 
                                            title="Service Add-ons" 
                                            items={serviceAddons} 
                                            type="service"
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="sidebar-booking-addons" type="ADDON">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <SidebarSection 
                                            title="Booking Add-ons" 
                                            items={bookingAddons} 
                                            type="booking"
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="sidebar-additional-info" type="ADDON">
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        <SidebarSection 
                                            title="Additional Information" 
                                            items={additionalInfo} 
                                            type="info"
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default ServicesList