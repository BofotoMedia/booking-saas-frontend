'use client'

import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { useServicesStore } from '../_store/servicesStore'
import { Droppable, DragDropContext, Draggable } from '@hello-pangea/dnd'
import { MdDragIndicator } from 'react-icons/md'
import { TbChevronDown, TbChevronUp, TbX, TbPencil } from 'react-icons/tb'
import { LuAlarmClock } from 'react-icons/lu'
import { HiOutlineClock } from 'react-icons/hi'
import classNames from '@/utils/classNames'
import type { DropResult } from '@hello-pangea/dnd'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

const ServiceList = () => {
    const { 
        categories, 
        disabledServices,
        updateCategories, 
        updateDisabledServices,
        toggleCategoryExpansion,
        moveServiceBetweenCategories,
        moveServiceToDisabled,
        moveServiceFromDisabled,
        addAddonToService,
        addAddonToCategory,
    } = useServicesStore()

    const handleDrop = (e: React.DragEvent, categoryId: string, serviceId?: string) => {
        e.preventDefault()
        const addon = e.dataTransfer.getData('addon')
        
        if (!addon) return

        if (serviceId) {
            // Add to specific service
            addAddonToService(categoryId, serviceId, addon)
        } else {
            // Add to all services in category
            addAddonToCategory(categoryId, addon)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return
        }

        const { source, destination, type } = result

        // Handle category reordering
        if (type === 'CATEGORY') {
            const newCategories = Array.from(categories)
            const [removed] = newCategories.splice(source.index, 1)
            newCategories.splice(destination.index, 0, removed)
            updateCategories(newCategories)
            return
        }

        // Handle service item movement
        if (type === 'SERVICE') {
            const sourceId = source.droppableId
            const destId = destination.droppableId

            // Move within disabled services
            if (sourceId === 'disabled' && destId === 'disabled') {
                const newDisabled = Array.from(disabledServices)
                const [removed] = newDisabled.splice(source.index, 1)
                newDisabled.splice(destination.index, 0, removed)
                updateDisabledServices(newDisabled)
                return
            }

            // Move from category to disabled
            if (sourceId !== 'disabled' && destId === 'disabled') {
                moveServiceToDisabled(sourceId, source.index)
                return
            }

            // Move from disabled to category
            if (sourceId === 'disabled' && destId !== 'disabled') {
                moveServiceFromDisabled(destId, source.index, destination.index)
                return
            }

            // Move between categories
            moveServiceBetweenCategories(
                sourceId,
                destId,
                source.index,
                destination.index
            )
        }
    }

    const removeAddon = (categoryId: string, serviceId: string, addon: string) => {
        const newCategories = categories.map((cat) =>
            cat.id === categoryId
                ? {
                      ...cat,
                      items: cat.items.map((item) =>
                          item.id === serviceId
                              ? {
                                    ...item,
                                    addons: item.addons.filter((a) => a !== addon),
                                }
                              : item
                      ),
                  }
                : cat
        )
        updateCategories(newCategories)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="categories" type="CATEGORY">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="my-0">
                        <div className="flex flex-col gap-4">
                            {categories.map((category, index) => (
                                <Draggable
                                    key={category.id}
                                    draggableId={category.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>
                                            <div
                                                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 group mb-4"
                                                onClick={() => toggleCategoryExpansion(category.id)}
                                                onDrop={(e) => handleDrop(e, category.id)}
                                                onDragOver={handleDragOver}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        {...provided.dragHandleProps}
                                                        className="cursor-grab active:cursor-grabbing"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span
                                                            className="text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <MdDragIndicator />
                                                        </span>
                                                    </span>
                                                    <h4>
                                                        {category.name}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {category.expanded ? (
                                                        <TbChevronUp className="text-lg font-bold" />
                                                    ) : (
                                                        <TbChevronDown className="text-lg font-bold" />
                                                    )}
                                                </div>
                                            </div>

                                            {category.expanded && (
                                                <Droppable
                                                    droppableId={category.id}
                                                    type="SERVICE"
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={classNames(
                                                                'px-4 pb-4 space-y-2',
                                                                snapshot.isDraggingOver && 'bg-gray-50 dark:bg-gray-700/30'
                                                            )}
                                                        >
                                                            {category.items.length === 0 ? (
                                                                <div className="text-center py-8 text-gray-400 text-sm">
                                                                    No service items
                                                                </div>
                                                            ) : (
                                                                category.items.map((item, itemIndex) => (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={itemIndex}
                                                                >
                                                                    {(provided) => (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                                            onDrop={(e) => handleDrop(e, category.id, item.id)}
                                                                            onDragOver={handleDragOver}
                                                                        >
                                                                            <span
                                                                                {...provided.dragHandleProps}
                                                                                className="cursor-grab active:cursor-grabbing"
                                                                            >
                                                                                <span
                                                                                    className="text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                                                >
                                                                                    <MdDragIndicator />
                                                                                </span>
                                                                            </span>
                                                                            
                                                                            {item.image ? (
                                                                                <Avatar
                                                                                    size={40}
                                                                                    src={item.image}
                                                                                    shape="round"
                                                                                />
                                                                            ) : (
                                                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded" />
                                                                            )}

                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between mb-1">
                                                                                    <span
                                                                                        className="heading-text font-bold"
                                                                                    >
                                                                                        {item.name}
                                                                                    </span>
                                                                                    {item.addons.length > 0 && (
                                                                                        <div className="flex flex-wrap gap-1">
                                                                                            {item.addons.map((addon, i) => (
                                                                                                <span
                                                                                                    key={i}
                                                                                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                                                                                                >
                                                                                                    <Badge
                                                                                                        className="bg-sky-500"
                                                                                                    />
                                                                                                    {addon}
                                                                                                    <button
                                                                                                        onClick={() =>
                                                                                                            removeAddon(
                                                                                                                category.id,
                                                                                                                item.id,
                                                                                                                addon
                                                                                                            )
                                                                                                        }
                                                                                                        className="hover:text-amber-900 dark:hover:text-amber-200"
                                                                                                    >
                                                                                                        <TbX size={12} />
                                                                                                    </button>
                                                                                                </span>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span
                                                                                            className="heading-text"
                                                                                        >
                                                                                            EUR
                                                                                        </span>
                                                                                        {item.prices.map((price, i) => (
                                                                                            <span
                                                                                                key={i}
                                                                                                className="heading-text font-bold"
                                                                                            >
                                                                                                {price.toFixed(2)}
                                                                                            </span>
                                                                                        ))}
                                                                                        <Button
                                                                                            size="xs"
                                                                                            variant="plain"
                                                                                            className="text-xl cursor-pointer select-none font-semibold"
                                                                                            icon={<TbPencil />}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                                    <HiOutlineClock className="text-lg" />
                                                                                    <span>{item.duration} min</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                            )}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            )}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* Disabled Services Section */}
                            <Card>
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span
                                            className="text-lg opacity-0"
                                        >
                                            <MdDragIndicator />
                                        </span>
                                    </span>
                                    <h4 className="opacity-60">
                                        Disabled services
                                    </h4>
                                </div>
                                <Droppable droppableId="disabled" type="SERVICE">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={classNames(
                                                'px-4 pb-4 space-y-2 min-h-[100px]',
                                                snapshot.isDraggingOver && 'bg-gray-50 dark:bg-gray-700/30'
                                            )}
                                        >
                                            {disabledServices.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={`disabled-${item.id}`}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 opacity-60 group"
                                                        >
                                                            <span
                                                                {...provided.dragHandleProps}
                                                                className="cursor-grab active:cursor-grabbing"
                                                            >
                                                                <span
                                                                    className="text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                                >
                                                                    <MdDragIndicator />
                                                                </span>
                                                            </span>
                                                            
                                                            {item.image ? (
                                                                <Avatar
                                                                    size={40}
                                                                    src={item.image}
                                                                    shape="round"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded" />
                                                            )}

                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <h5 className="font-medium text-sm">
                                                                        {item.name}
                                                                    </h5>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs text-gray-500">
                                                                            EUR
                                                                        </span>
                                                                        {item.prices.map((price, i) => (
                                                                            <span
                                                                                key={i}
                                                                                className="text-sm font-semibold"
                                                                            >
                                                                                {price.toFixed(2)}
                                                                            </span>
                                                                        ))}
                                                                        <Button
                                                                            size="xs"
                                                                            variant="plain"
                                                                            className="text-xl font-semibold"
                                                                            disabled
                                                                            icon={<TbPencil />}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                    <HiOutlineClock className="text-lg" />
                                                                    <span>{item.duration} min</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Card>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ServiceList