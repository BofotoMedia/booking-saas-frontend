'use client'

import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { TbChevronDown, TbChevronUp, TbX } from 'react-icons/tb'
import { MdDragIndicator } from 'react-icons/md'
import ServiceItem from './ServiceItem'
import { Category } from '../types'
import { useServicesStore } from '../_store/servicesStore'

interface CategorySectionProps {
    category: Category
}

const CategorySection = ({ category }: CategorySectionProps) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const { name, count, step, addons, services, id } = category
    const { removeAddonFromCategory } = useServicesStore()

    const handleRemoveAddon = (addon: string) => {
        removeAddonFromCategory(id, addon)
    }

    const addonDroppableId = `category-${id}`
    const serviceDroppableId = `category-services-${id}`

    return (
        <div className="mb-6">
            <Droppable droppableId={addonDroppableId} type="ADDON">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`
                            flex items-start justify-between py-3 px-2 rounded-lg cursor-pointer transition-colors
                            ${snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-blue-500 border-dashed' : 'hover:bg-gray-50'}
                        `}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-start gap-3 flex-1">
                            <span className="text-gray-400 cursor-grab hover:text-gray-600 mt-0.5">
                                <MdDragIndicator size={20} />
                            </span>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-gray-900 text-base">{name}</span>
                                    
                                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                                        {count}
                                    </span>
                                    
                                    {step && (
                                        <span className="text-gray-500 text-sm">
                                            {step}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Addons below category name */}
                                {addons && addons.length > 0 && (
                                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                        {addons.map((addon, idx) => (
                                            <span 
                                                key={idx} 
                                                className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded flex items-center gap-1.5"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {addon}
                                                <button
                                                    onClick={() => handleRemoveAddon(addon)}
                                                    className="text-purple-400 hover:text-purple-600"
                                                >
                                                    <TbX size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <button 
                            className="text-gray-400 hover:text-gray-600 p-1"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsExpanded(!isExpanded)
                            }}
                        >
                            {isExpanded ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
                        </button>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {isExpanded && (
                <Droppable droppableId={serviceDroppableId} type="SERVICE">
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`ml-8 mt-2 ${snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''}`}
                        >
                            {services && services.length > 0 ? (
                                services.map((service, index) => (
                                    <ServiceItem 
                                        key={service.id} 
                                        service={service} 
                                        categoryId={id}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <div className="text-gray-400 text-sm py-4 text-center border border-dashed border-gray-300 rounded">
                                    No services in this category
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
        </div>
    )
}

export default CategorySection