'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { useServicesStore } from '../_store/servicesStore'
import { TbPlus } from 'react-icons/tb'

const AddonsHeader = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [addonName, setAddonName] = useState('')
    const [addonType, setAddonType] = useState<'service' | 'booking' | 'info'>('service')
    
    const { 
        serviceAddons, 
        bookingAddons, 
        additionalInfo,
        updateServiceAddons,
        updateBookingAddons,
        updateAdditionalInfo
    } = useServicesStore()

    const handleAddAddon = () => {
        if (!addonName.trim()) return
        
        switch (addonType) {
            case 'service':
                updateServiceAddons([...serviceAddons, addonName])
                break
            case 'booking':
                updateBookingAddons([...bookingAddons, addonName])
                break
            case 'info':
                updateAdditionalInfo([...additionalInfo, addonName])
                break
        }
        
        setAddonName('')
        setDialogOpen(false)
    }

    return (
        <>
            <div className="flex items-center gap-2 print:hidden justify-end">
                <Button
                    variant="default"
                    icon={<TbPlus />}
                    onClick={() => setDialogOpen(true)}
                >
                    Add Add-ons
                </Button>
            </div>

            <Dialog
                isOpen={dialogOpen}
                width={400}
                onClose={() => setDialogOpen(false)}
                onRequestClose={() => setDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">Add Add-on</h4>
                        <p className="text-sm text-gray-500">
                            Create a new add-on item
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Add-on Type
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                                value={addonType}
                                onChange={(e) => setAddonType(e.target.value as any)}
                            >
                                <option value="service">Service Add-on</option>
                                <option value="booking">Booking Add-on</option>
                                <option value="info">Additional Information</option>
                            </select>
                        </div>
                        
                        <Input
                            placeholder="Add-on name"
                            value={addonName}
                            onChange={(e) => setAddonName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddAddon()
                                }
                            }}
                        />
                    </div>

                    <div className="flex gap-2 mt-6">
                        <Button
                            block
                            variant="default"
                            onClick={() => setDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            block 
                            variant="solid" 
                            onClick={handleAddAddon}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddonsHeader