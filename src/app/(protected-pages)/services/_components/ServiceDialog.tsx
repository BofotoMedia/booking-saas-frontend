'use client'

import { useState, useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import { Service, Category } from '../types'

interface ServiceDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (categoryId: string, data: Omit<Service, 'id'>) => void
    service?: Service & { categoryId?: string }
    categories: Category[]
}

const ServiceDialog = ({ isOpen, onClose, onSave, service, categories }: ServiceDialogProps) => {
    const [formData, setFormData] = useState({
        categoryId: '',
        name: '',
        duration: 40,
        hasRecurring: false,
        priceA: '',
        priceB: '',
        priceC: '',
    })

    useEffect(() => {
        if (service) {
            setFormData({
                categoryId: service.categoryId || '',
                name: service.name,
                duration: service.duration,
                hasRecurring: service.hasRecurring,
                priceA: service.prices.A?.toString() || '',
                priceB: service.prices.B?.toString() || '',
                priceC: service.prices.C?.toString() || '',
            })
        } else {
            setFormData({
                categoryId: categories.length > 0 ? categories[0].id : '',
                name: '',
                duration: 40,
                hasRecurring: false,
                priceA: '',
                priceB: '',
                priceC: '',
            })
        }
    }, [service, categories, isOpen])

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            alert('Service name is required')
            return
        }

        if (!formData.categoryId) {
            alert('Please select a category')
            return
        }

        const prices: { A?: number; B?: number; C?: number } = {}
        if (formData.priceA) prices.A = parseFloat(formData.priceA)
        if (formData.priceB) prices.B = parseFloat(formData.priceB)
        if (formData.priceC) prices.C = parseFloat(formData.priceC)

        onSave(formData.categoryId, {
            name: formData.name,
            duration: formData.duration,
            hasRecurring: formData.hasRecurring,
            prices,
        })

        handleClose()
    }

    const handleClose = () => {
        setFormData({
            categoryId: categories.length > 0 ? categories[0].id : '',
            name: '',
            duration: 40,
            hasRecurring: false,
            priceA: '',
            priceB: '',
            priceC: '',
        })
        onClose()
    }

    return (
        <Dialog
            isOpen={isOpen}
            width={520}
            onClose={handleClose}
            onRequestClose={handleClose}
        >
            <div>
                <div className="text-center mb-6">
                    <h4 className="mb-1">{service ? 'Edit Service' : 'Add Service'}</h4>
                    <p className="text-gray-500">
                        {service ? 'Update service details' : 'Create a new service'}
                    </p>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <Select
                            value={categories.find((c) => c.id === formData.categoryId)}
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={(option) => 
                                setFormData({ ...formData, categoryId: option?.id || '' })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Enter service name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (minutes) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="number"
                            placeholder="40"
                            value={formData.duration}
                            onChange={(e) => 
                                setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
                            }
                        />
                    </div>

                    <div>
                        <Checkbox
                            checked={formData.hasRecurring}
                            onChange={(checked) => 
                                setFormData({ ...formData, hasRecurring: checked })
                            }
                        >
                            Has Recurring Option
                        </Checkbox>
                    </div>

                    <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Pricing (EUR)
                        </label>
                        
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Price A</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.priceA}
                                    onChange={(e) => 
                                        setFormData({ ...formData, priceA: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Price B</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.priceB}
                                    onChange={(e) => 
                                        setFormData({ ...formData, priceB: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Price C</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.priceC}
                                    onChange={(e) => 
                                        setFormData({ ...formData, priceC: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <Button
                        block
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        block
                        variant="solid"
                        onClick={handleSubmit}
                    >
                        {service ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ServiceDialog