'use client'

import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ScrollBar from '@/components/ui/ScrollBar'
import { TbPencil, TbTrash, TbPlus } from 'react-icons/tb'
import { AddonType } from '../types'
import classNames from 'classnames'

interface AddonsDialogProps {
    isOpen: boolean
    onClose: () => void
    serviceAddons: string[]
    bookingAddons: string[]
    additionalInfo: string[]
    onAddServiceAddon: (addon: string) => void
    onUpdateServiceAddon: (oldAddon: string, newAddon: string) => void
    onDeleteServiceAddon: (addon: string) => void
    onAddBookingAddon: (addon: string) => void
    onUpdateBookingAddon: (oldAddon: string, newAddon: string) => void
    onDeleteBookingAddon: (addon: string) => void
    onAddAdditionalInfo: (info: string) => void
    onUpdateAdditionalInfo: (oldInfo: string, newInfo: string) => void
    onDeleteAdditionalInfo: (info: string) => void
}

const AddonsDialog = ({
    isOpen,
    onClose,
    serviceAddons,
    bookingAddons,
    additionalInfo,
    onAddServiceAddon,
    onUpdateServiceAddon,
    onDeleteServiceAddon,
    onAddBookingAddon,
    onUpdateBookingAddon,
    onDeleteBookingAddon,
    onAddAdditionalInfo,
    onUpdateAdditionalInfo,
    onDeleteAdditionalInfo,
}: AddonsDialogProps) => {
    const [activeTab, setActiveTab] = useState<AddonType>('service')
    const [newItem, setNewItem] = useState('')
    const [editingItem, setEditingItem] = useState<{ old: string; new: string } | null>(null)

    const handleAdd = () => {
        if (!newItem.trim()) return

        if (activeTab === 'service') {
            onAddServiceAddon(newItem)
        } else if (activeTab === 'booking') {
            onAddBookingAddon(newItem)
        } else {
            onAddAdditionalInfo(newItem)
        }

        setNewItem('')
    }

    const handleUpdate = () => {
        if (!editingItem || !editingItem.new.trim()) return

        if (activeTab === 'service') {
            onUpdateServiceAddon(editingItem.old, editingItem.new)
        } else if (activeTab === 'booking') {
            onUpdateBookingAddon(editingItem.old, editingItem.new)
        } else {
            onUpdateAdditionalInfo(editingItem.old, editingItem.new)
        }

        setEditingItem(null)
    }

    const handleDelete = (item: string) => {
        if (!window.confirm(`Are you sure you want to delete "${item}"?`)) return

        if (activeTab === 'service') {
            onDeleteServiceAddon(item)
        } else if (activeTab === 'booking') {
            onDeleteBookingAddon(item)
        } else {
            onDeleteAdditionalInfo(item)
        }
    }

    const getCurrentItems = () => {
        if (activeTab === 'service') return serviceAddons
        if (activeTab === 'booking') return bookingAddons
        return additionalInfo
    }

    const getTabTitle = () => {
        if (activeTab === 'service') return 'Service Add-ons'
        if (activeTab === 'booking') return 'Booking Add-ons'
        return 'Additional Information'
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={600}
            onClose={onClose}
            onRequestClose={onClose}
        >
            <div>
                <div className="text-center mb-6">
                    <h4 className="mb-1">Manage Add-ons</h4>
                    <p className="text-gray-500">Add, edit, or remove add-ons and information fields</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 border-b">
                    <button
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'service'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                        onClick={() => setActiveTab('service')}
                    >
                        Service Add-ons
                    </button>
                    <button
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'booking'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                        onClick={() => setActiveTab('booking')}
                    >
                        Booking Add-ons
                    </button>
                    <button
                        className={classNames(
                            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                            activeTab === 'info'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        )}
                        onClick={() => setActiveTab('info')}
                    >
                        Additional Info
                    </button>
                </div>

                {/* Add New Item */}
                <div className="mb-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder={`Enter new ${getTabTitle().toLowerCase().slice(0, -1)}`}
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleAdd()
                            }}
                        />
                        <Button
                            icon={<TbPlus />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </div>
                </div>

                {/* Items List */}
                <div className="mb-4">
                    <p className="font-semibold uppercase text-xs mb-3 text-gray-600">
                        {getCurrentItems().length} {getTabTitle().toLowerCase()}
                    </p>
                    <ScrollBar className={classNames('overflow-y-auto h-80')}>
                        {getCurrentItems().length > 0 ? (
                            <div className="space-y-2">
                                {getCurrentItems().map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="py-3 px-4 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50"
                                    >
                                        {editingItem?.old === item ? (
                                            <div className="flex-1 flex gap-2">
                                                <Input
                                                    value={editingItem.new}
                                                    onChange={(e) =>
                                                        setEditingItem({
                                                            ...editingItem,
                                                            new: e.target.value,
                                                        })
                                                    }
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') handleUpdate()
                                                        if (e.key === 'Escape') setEditingItem(null)
                                                    }}
                                                    autoFocus
                                                />
                                                <Button size="xs" onClick={handleUpdate}>
                                                    Save
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    variant="outline"
                                                    onClick={() => setEditingItem(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-gray-900">{item}</span>
                                                <div className="flex gap-1">
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        icon={<TbPencil size={14} />}
                                                        onClick={() =>
                                                            setEditingItem({ old: item, new: item })
                                                        }
                                                    />
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        customColorClass={() =>
                                                            'hover:border-red-500 hover:ring-red-500'
                                                        }
                                                        icon={<TbTrash size={14} />}
                                                        onClick={() => handleDelete(item)}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No {getTabTitle().toLowerCase()} yet
                            </div>
                        )}
                    </ScrollBar>
                </div>

                <Button block variant="solid" onClick={onClose}>
                    Done
                </Button>
            </div>
        </Dialog>
    )
}

export default AddonsDialog