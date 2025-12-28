'use client'

import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { useServicesStore } from '../_store/servicesStore'
import { Droppable, DragDropContext, Draggable } from '@hello-pangea/dnd'
import { MdDragIndicator } from 'react-icons/md'
import { TbChevronDown, TbChevronUp, TbX, TbPencil, TbTrash } from 'react-icons/tb'
import { HiOutlineClock } from 'react-icons/hi'
import classNames from '@/utils/classNames'
import type { DropResult } from '@hello-pangea/dnd'
import type { ServiceItem } from '../types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import {useTranslations} from 'next-intl'

const ServiceList = () => {
    const t = useTranslations();

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
        updateService,
        deleteService,
    } = useServicesStore()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editingService, setEditingService] = useState<ServiceItem | null>(null)
    const [editingCategoryId, setEditingCategoryId] = useState<string>('')
    const [editName, setEditName] = useState('')
    const [editDuration, setEditDuration] = useState(0)
    const [editPrices, setEditPrices] = useState<string>('')
    const [editCurrency, setEditCurrency] = useState('EUR')

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

    const removeAddon = (categoryId: string, serviceId: string, addon: any) => {
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

    const handleEditService = (service: ServiceItem, categoryId: string) => {
        setEditingService(service)
        setEditingCategoryId(categoryId)
        setEditName(service.name)
        setEditDuration(service.duration)
        setEditPrices(service.prices.join(', '))
        setEditCurrency(service.currency || 'EUR')
        setEditDialogOpen(true)
    }

    const handleSaveEdit = () => {
        if (!editingService || !editName.trim()) return

        const pricesArray = editPrices
            .split(',')
            .map(p => parseFloat(p.trim()))
            .filter(p => !isNaN(p))

        const updatedService = {
            name: editName,
            duration: editDuration,
            prices: pricesArray,
            currency: editCurrency,
        }

        updateService(editingCategoryId, editingService.id, updatedService)
        setEditDialogOpen(false)
        setEditingService(null)
    }

    const handleDeleteService = (categoryId: string, serviceId: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return
        deleteService(categoryId, serviceId)
    }

    return (
        <>
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
                                                    className="flex items-center justify-between cursor-pointer group mb-4"
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
                                                                className="text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
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
                                                                    'px-2 md:px-4 pb-4 space-y-2 min-w-0 overflow-x-hidden',
                                                                    snapshot.isDraggingOver && 'bg-gray-50 dark:bg-gray-700/30'
                                                                )}
                                                            >
                                                                {category.items.length === 0 ? (
                                                                    <div className="text-center py-8 text-gray-400 text-sm">
                                                                        {t('protected.services.noServiceItems')}
                                                                    </div>
                                                                ) : (
                                                                    category.items.map((item, itemIndex) => (
                                                                    <Draggable
                                                                        key={item.id}
                                                                        draggableId={item.id}
                                                                        index={itemIndex}
                                                                    >
                                                                        {(provided) => (
                                                                            <div className="group flex items-center min-w-0">
                                                                                <span
                                                                                    {...provided.dragHandleProps}
                                                                                    className="cursor-grab active:cursor-grabbing flex-shrink-0"
                                                                                >
                                                                                    <span
                                                                                        className="text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                                                                    >
                                                                                        <MdDragIndicator />
                                                                                    </span>
                                                                                </span>
                                                                                
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    className="flex-1 flex items-start md:items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-w-0"
                                                                                    onDrop={(e) => handleDrop(e, category.id, item.id)}
                                                                                    onDragOver={handleDragOver}
                                                                                >

                                                                                    <div className="flex-1 min-w-0">
                                                                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-5 mb-1">
                                                                                            <div className="flex items-center gap-2 md:gap-3">
                                                                                                {item.image ? (
                                                                                                    <Avatar
                                                                                                        size={65}
                                                                                                        src={item.image}
                                                                                                        shape="round"
                                                                                                        className="flex-shrink-0"
                                                                                                    />
                                                                                                ) : (
                                                                                                    <div className="w-8 h-8 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0" />
                                                                                                )}
                                                                                                
                                                                                                <div className="flex flex-col min-w-0">
                                                                                                    <span className="heading-text font-bold text-sm md:text-base truncate">
                                                                                                        {item.name}
                                                                                                    </span>
                                                                                            
                                                                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                                                        <HiOutlineClock className="text-base md:text-lg" />
                                                                                                        <span>
                                                                                                            {item.duration} 
                                                                                                            {t('protected.services.min')}
                                                                                                        </span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        
                                                                                            <div className="flex gap-4 md:gap-4 mt-2">
                                                                                                {item.addons.length > 0 && (
                                                                                                    <div className="grid grid-cols-2 gap-1 mb-1">
                                                                                                        {item.addons.map((addon, i) => (
                                                                                                            <span
                                                                                                                key={i}
                                                                                                                className="inline-flex items-center gap-1 py-0.5 rounded text-xs"
                                                                                                            >
                                                                                                                <Badge className="bg-sky-200" />
                                                                                                                <span className="truncate flex-1 min-w-0">
                                                                                                                    {addon}
                                                                                                                </span>
                                                                                                                <button
                                                                                                                    onClick={() =>
                                                                                                                        removeAddon(
                                                                                                                            category.id,
                                                                                                                            item.id,
                                                                                                                            addon
                                                                                                                        )
                                                                                                                    }
                                                                                                                    className="hover:text-amber-900 dark:hover:text-amber-200 flex-shrink-0"
                                                                                                                >
                                                                                                                    <TbX size={12} />
                                                                                                                </button>
                                                                                                            </span>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            
                                                                                            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 md:ml-auto">
                                                                                                <span className="heading-text text-xs md:text-sm">
                                                                                                    {item.currency || 'EUR'}
                                                                                                </span>
                                                                                                {item.prices.map((price, i) => (
                                                                                                    <span
                                                                                                        key={i}
                                                                                                        className="heading-text font-bold text-sm md:text-base"
                                                                                                    >
                                                                                                        {price.toFixed(2)}
                                                                                                    </span>
                                                                                                ))}
                                                                                                <Button
                                                                                                    size="xs"
                                                                                                    variant="plain"
                                                                                                    className="text-lg md:text-xl cursor-pointer select-none font-semibold"
                                                                                                    icon={<TbPencil />}
                                                                                                    onClick={() => handleEditService(item, category.id)}
                                                                                                />
                                                                                                {/* <Button
                                                                                                    size="xs"
                                                                                                    variant="plain"
                                                                                                    className="text-lg md:text-xl cursor-pointer select-none font-semibold text-red-500 hover:text-red-600"
                                                                                                    icon={<TbTrash />}
                                                                                                    onClick={() => handleDeleteService(category.id, item.id)}
                                                                                                /> */}
                                                                                            </div>
                                                                                        </div>
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
                                            {t('protected.services.disabledServices')}
                                        </h4>
                                    </div>
                                    <Droppable droppableId="disabled" type="SERVICE">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={classNames(
                                                    'px-2 md:px-4 pb-4 space-y-2 min-h-[100px] min-w-0 overflow-x-hidden',
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
                                                            <div className="group flex items-center min-w-0">
                                                                <span
                                                                    {...provided.dragHandleProps}
                                                                    className="cursor-grab active:cursor-grabbing flex-shrink-0"
                                                                >
                                                                    <span
                                                                        className="text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                                                                    >
                                                                        <MdDragIndicator />
                                                                    </span>
                                                                </span>
                                                                
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className="flex-1 flex items-start md:items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 opacity-60 group min-w-0"
                                                                >
                                                                    {item.image ? (
                                                                        <Avatar
                                                                            size={65}
                                                                            src={item.image}
                                                                            shape="round"
                                                                            className="flex-shrink-0"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-8 h-8 md:w-16 md:h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0" />
                                                                    )}

                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-1">
                                                                            <h5 className="font-medium text-xs md:text-sm truncate">
                                                                                {item.name}
                                                                            </h5>
                                                                            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                                                                                <span className="text-xs text-gray-500">
                                                                                    {item.currency || 'EUR'}
                                                                                </span>
                                                                                {item.prices.map((price, i) => (
                                                                                    <span
                                                                                        key={i}
                                                                                        className="text-xs md:text-sm font-semibold"
                                                                                    >
                                                                                        {price.toFixed(2)}
                                                                                    </span>
                                                                                ))}
                                                                                <Button
                                                                                    size="xs"
                                                                                    variant="plain"
                                                                                    className="text-lg md:text-xl font-semibold"
                                                                                    disabled
                                                                                    icon={<TbPencil />}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                            <HiOutlineClock className="text-base md:text-lg" />
                                                                            <span>{item.duration} {t('protected.services.min')}</span>
                                                                        </div>
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

            {/* Edit Service Dialog */}
            <Dialog
                isOpen={editDialogOpen}
                width={400}
                onClose={() => setEditDialogOpen(false)}
                onRequestClose={() => setEditDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">{t('protected.services.editService')}</h4>
                        <p className="text-sm text-gray-500">
                            {t('protected.services.updateServiceInformation')}
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <Input
                            placeholder="Service name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />

                        <Input
                            type="number"
                            placeholder="Duration (minutes)"
                            value={editDuration}
                            onChange={(e) => setEditDuration(parseInt(e.target.value) || 0)}
                        />

                        <Input
                            placeholder="Prices (comma separated)"
                            value={editPrices}
                            onChange={(e) => setEditPrices(e.target.value)}
                        />

                        <Input
                            placeholder="Currency"
                            value={editCurrency}
                            onChange={(e) => setEditCurrency(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 mt-6">
                        <Button
                            block
                            variant="default"
                            onClick={() => setEditDialogOpen(false)}
                        >
                            {t('protected.services.cancel')}
                        </Button>
                        <Button 
                            block 
                            variant="solid" 
                            onClick={handleSaveEdit}
                        >
                            {t('protected.services.save')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ServiceList