'use client'

import { useState } from 'react'
import { useServicesStore } from '../_store/servicesStore'
import { LuInfo, LuWrench, LuCalendarDays, LuPencil, LuNotepadText, LuArrowRightFromLine } from "react-icons/lu";
import { MdDragIndicator } from 'react-icons/md'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Checkbox from '@/components/ui/Checkbox'
import type { AddonItem } from '../types'
import {useTranslations} from 'next-intl'
import Step2Icon from '@/assets/svg/Step2';

const AddonsList = () => {
    const t = useTranslations();

    const { 
        serviceAddons, 
        bookingAddons, 
        additionalInfo,
        updateServiceAddon,
        deleteServiceAddon,
        updateBookingAddon,
        deleteBookingAddon,
        updateAdditionalInfoItem,
        deleteAdditionalInfoItem
    } = useServicesStore()

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editingAddon, setEditingAddon] = useState<AddonItem | null>(null)
    const [editingType, setEditingType] = useState('')
    const [editName, setEditName] = useState('')
    const [editStep2, setEditStep2] = useState(false)

    const handleDragStart = (e: React.DragEvent, addon: AddonItem, type: string) => {
        e.dataTransfer.setData('addon', addon.name)
        e.dataTransfer.setData('type', type)
        e.dataTransfer.effectAllowed = 'copy'
    }

    const handleEdit = (addon: AddonItem, type: string) => {
        setEditingAddon(addon)
        setEditingType(type)
        setEditName(addon.name)
        setEditStep2(addon.step2)
        setEditDialogOpen(true)
    }

    const handleSaveEdit = () => {
        if (!editingAddon || !editName.trim()) return

        const updatedAddon = {
            name: editName,
            step2: editStep2
        }

        switch (editingType) {
            case 'service':
                updateServiceAddon(editingAddon.id, updatedAddon)
                break
            case 'booking':
                updateBookingAddon(editingAddon.id, updatedAddon)
                break
            case 'info':
                updateAdditionalInfoItem(editingAddon.id, updatedAddon)
                break
        }

        setEditDialogOpen(false)
        setEditingAddon(null)
    }

    const handleDelete = (addonId: string, type: 'service' | 'booking' | 'info') => {
        if (!confirm('Are you sure you want to delete this addon?')) return

        switch (type) {
            case 'service':
                deleteServiceAddon(addonId)
                break
            case 'booking':
                deleteBookingAddon(addonId)
                break
            case 'info':
                deleteAdditionalInfoItem(addonId)
                break
        }
    }

    const AddonItem = ({ 
        addon, 
        type, 
        icon 
    }: { 
        addon: AddonItem
        type: string
        icon?: React.ReactNode 
    }) => (
        <>
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, addon, type)}
                className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-move transition-colors group py-3"
            >
                <div className="flex items-center gap-2">
                    <span
                        className="text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    >
                        <MdDragIndicator />
                    </span>
                    <span className="text-sm flex items-center">{addon.name}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    {addon.step2 && <div className="flex items-center opacity-60">
                        <span
                            className="text-sm"
                        >
                            {t('protected.services.step')}
                        </span>
                        <Step2Icon />
                    </div>}
                    
                    <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" onClick={() => handleEdit(addon, type)}>
                        <LuPencil className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" size={14} />
                    </button>

                    {/* <div className="flex gap-1">
                        <button 
                            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => handleEdit(addon, type)}
                        >
                            <LuPencil className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" size={14} />
                        </button>
                        <button 
                            className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            onClick={() => handleDelete(addon.id, type)}
                        >
                            <LuTrash2 className="text-gray-400 hover:text-red-600 dark:hover:text-red-400" size={14} />
                        </button>
                    </div> */}
                </div>
            </div>
            <hr />
        </>
    )

    return (
        <>
            <div className="space-y-6">
                {/* Service Add-ons */}
                <Card>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <h4 className="mb-4">{t('protected.services.serviceAddons')}</h4>
                            <Tooltip title="These options apply to the entire service, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                                <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                    <LuInfo />
                                </span>
                            </Tooltip>
                        </div>
                        <div className="p-3 rounded-full bg-sky-100 transition-colors mb-2">
                            <LuWrench className="text-sky-500" size={18} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        {serviceAddons.map((addon, index) => (
                            <AddonItem key={index} addon={addon} type="service" />
                        ))}
                    </div>
                </Card>

                {/* Booking Add-ons */}
                <Card>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <h4 className="mb-4">{t('protected.services.bookingAddons')}</h4>
                            <Tooltip title="These options apply to the entire booking, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                                <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                    <LuInfo />
                                </span>
                            </Tooltip>
                        </div>
                        <div className="p-3 rounded-full bg-orange-100 transition-colors mb-2">
                            <LuCalendarDays className="text-orange-500" size={18} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        {bookingAddons.map((addon, index) => (
                            <AddonItem key={index} addon={addon} type="booking" />
                        ))}
                    </div>
                </Card>

                {/* Additional Information */}
                <Card>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <h4 className="mb-4">{t('protected.services.additionalInfo')}</h4>
                            <Tooltip title="These options apply to the entire information, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                                <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                    <LuInfo />
                                </span>
                            </Tooltip>
                        </div>
                        <div className="p-3 rounded-full bg-amber-100 transition-colors mb-2">
                            <LuNotepadText className="text-amber-500" size={18} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        {additionalInfo.map((info, index) => (
                            <AddonItem key={index} addon={info} type="info" />
                        ))}
                    </div>
                </Card>
            </div>

            {/* Edit Dialog */}
            <Dialog
                isOpen={editDialogOpen}
                width={400}
                onClose={() => setEditDialogOpen(false)}
                onRequestClose={() => setEditDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">{t('protected.services.editAddon')}</h4>
                        <p className="text-sm text-gray-500">
                            {t('protected.services.updateAddonInformation')}
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <Input
                            placeholder="Add-on name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSaveEdit()
                                }
                            }}
                        />

                        <div className="flex items-center gap-2">
                            <Checkbox value={editStep2} onChange={(selectedOption) => setEditStep2(selectedOption)}>
                                {t('protected.services.showInStep2')}
                            </Checkbox>
                        </div>
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

export default AddonsList