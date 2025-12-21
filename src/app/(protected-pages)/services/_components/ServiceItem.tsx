'use client'

import { useState, useRef, useEffect } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { TbClock, TbRepeat, TbCopy, TbPencil, TbX, TbDots, TbTrash } from 'react-icons/tb'
import { MdDragIndicator } from 'react-icons/md'
import { Service } from '../types'
import { useServicesStore } from '../_store/servicesStore'

interface ServiceItemProps {
    service: Service
    categoryId?: string
    showDragger?: boolean
    index: number
}

const ServiceItem = ({ service, categoryId, showDragger = true, index }: ServiceItemProps) => {
    const { name, duration, hasRecurring, prices, addons, disabled, noCategory } = service
    const { removeAddonFromService, moveServiceToDisabled, deleteService } = useServicesStore()
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleRemoveAddon = (addon: string) => {
        if (categoryId) {
            removeAddonFromService(categoryId, service.id, addon)
        }
    }

    const handleDisableService = () => {
        if (categoryId) {
            moveServiceToDisabled(categoryId, service.id)
        }
        setShowMenu(false)
    }

    const handleDeleteService = () => {
        if (categoryId && window.confirm(`Are you sure you want to delete "${name}"?`)) {
            deleteService(categoryId, service.id)
        }
        setShowMenu(false)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showMenu])

    const droppableId = `service-${service.id}-${categoryId || 'disabled'}`
    const draggableId = `service-drag-${service.id}-${categoryId || 'disabled'}`

    const ServiceContent = (
        <Droppable droppableId={droppableId} type="ADDON">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                        border rounded-lg mb-2 transition-colors
                        ${disabled ? 'bg-gray-50 opacity-60' : 'bg-white'}
                        ${snapshot.isDraggingOver ? 'border-blue-500 bg-blue-50 border-2' : 'border-gray-200'}
                    `}
                >
                    <div className="flex items-start justify-between py-3 px-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            {showDragger && (
                                <span className="text-gray-400 cursor-grab hover:text-gray-600 mt-0.5">
                                    <MdDragIndicator />
                                </span>
                            )}
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`font-medium ${disabled ? 'text-gray-500' : 'text-gray-900'}`}>
                                        {name}
                                    </span>
                                    
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <TbClock className="text-base" />
                                        <span>{duration} min</span>
                                    </div>
                                    
                                    {hasRecurring && (
                                        <TbRepeat className="text-gray-400" title="Recurring service" />
                                    )}
                                    
                                    {noCategory && (
                                        <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded">
                                            No category assigned
                                        </span>
                                    )}
                                    
                                    {disabled && !noCategory && (
                                        <span className="text-orange-500 text-xs bg-orange-50 px-2 py-1 rounded">
                                            Disabled service
                                        </span>
                                    )}
                                </div>

                                {/* Addons below service name */}
                                {addons && addons.length > 0 && (
                                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                        {addons.map((addon, idx) => (
                                            <span 
                                                key={idx} 
                                                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1.5"
                                            >
                                                {addon}
                                                {!disabled && categoryId && (
                                                    <button
                                                        onClick={() => handleRemoveAddon(addon)}
                                                        className="text-blue-400 hover:text-blue-600"
                                                    >
                                                        <TbX size={12} />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 ml-4">
                            {(prices.A || prices.B || prices.C) && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-500 text-xs">EUR</span>
                                    {prices.A && (
                                        <div className="text-center min-w-[45px]">
                                            <div className="text-[10px] text-gray-400 mb-0.5">A</div>
                                            <div className="font-medium">{prices.A.toFixed(2)}</div>
                                        </div>
                                    )}
                                    {prices.B && (
                                        <div className="text-center min-w-[45px]">
                                            <div className="text-[10px] text-gray-400 mb-0.5">B</div>
                                            <div className="font-medium">{prices.B.toFixed(2)}</div>
                                        </div>
                                    )}
                                    {prices.C && (
                                        <div className="text-center min-w-[45px]">
                                            <div className="text-[10px] text-gray-400 mb-0.5">C</div>
                                            <div className="font-medium">{prices.C.toFixed(2)}</div>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {!disabled && (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <button className="p-1.5 hover:bg-gray-100 rounded hover:text-gray-600 transition-colors">
                                        <TbCopy size={16} />
                                    </button>
                                    <button className="p-1.5 hover:bg-gray-100 rounded hover:text-gray-600 transition-colors">
                                        <TbPencil size={16} />
                                    </button>
                                    <div className="relative" ref={menuRef}>
                                        <button 
                                            className="p-1.5 hover:bg-gray-100 rounded hover:text-gray-600 transition-colors"
                                            onClick={() => setShowMenu(!showMenu)}
                                        >
                                            <TbDots size={16} />
                                        </button>
                                        {showMenu && (
                                            <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    onClick={handleDisableService}
                                                >
                                                    <TbX size={14} />
                                                    Disable
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    onClick={handleDeleteService}
                                                >
                                                    <TbTrash size={14} />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )

    // If it's a disabled service or no dragger needed, return without Draggable
    if (disabled || !showDragger) {
        return ServiceContent
    }

    // Wrap with Draggable for active services
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? 'opacity-50' : ''}
                >
                    {ServiceContent}
                </div>
            )}
        </Draggable>
    )
}

export default ServiceItem