'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { useServicesStore } from '../_store/servicesStore'
import { TbPlus } from 'react-icons/tb'
import type { ServiceCategory } from '../types'

const ServicesHeader = () => {
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
    const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [serviceName, setServiceName] = useState('')
    
    const { categories, updateCategories } = useServicesStore()

    const handleAddCategory = () => {
        if (!categoryName.trim()) return
        
        const newCategory: ServiceCategory = {
            id: `category-${Date.now()}`,
            name: categoryName,
            items: [],
            expanded: true,
        }
        
        updateCategories([...categories, newCategory])
        setCategoryName('')
        setCategoryDialogOpen(false)
    }

    const handleAddService = () => {
        if (!serviceName.trim()) return
        
        // Add service to first category for now
        // You can add a dropdown to select category
        const newCategories = [...categories]
        if (newCategories.length > 0) {
            newCategories[0].items.push({
                id: `service-${Date.now()}`,
                name: serviceName,
                duration: 40,
                prices: [18.00],
                addons: [],
                checked: false,
            })
            updateCategories(newCategories)
        }
        
        setServiceName('')
        setServiceDialogOpen(false)
    }

    return (
        <>
            <div className="flex items-center justify-between gap-2 print:hidden">
                <h3>Services</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="solid"
                        icon={<TbPlus />}
                        onClick={() => setCategoryDialogOpen(true)}
                    >
                        Add Category
                    </Button>
                    <Button
                        variant="default"
                        icon={<TbPlus />}
                        onClick={() => setServiceDialogOpen(true)}
                    >
                        Add Service
                    </Button>
                </div>
            </div>

            {/* Add Category Dialog */}
            <Dialog
                isOpen={categoryDialogOpen}
                width={400}
                onClose={() => setCategoryDialogOpen(false)}
                onRequestClose={() => setCategoryDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">Add Category</h4>
                        <p className="text-sm text-gray-500">
                            Create a new service category
                        </p>
                    </div>
                    <Input
                        placeholder="Category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddCategory()
                            }
                        }}
                    />
                    <div className="flex gap-2 mt-6">
                        <Button
                            block
                            variant="default"
                            onClick={() => setCategoryDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            block 
                            variant="solid" 
                            onClick={handleAddCategory}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* Add Service Dialog */}
            <Dialog
                isOpen={serviceDialogOpen}
                width={400}
                onClose={() => setServiceDialogOpen(false)}
                onRequestClose={() => setServiceDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">Add Service</h4>
                        <p className="text-sm text-gray-500">
                            Create a new service
                        </p>
                    </div>
                    <Input
                        placeholder="Service name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleAddService()
                            }
                        }}
                    />
                    <div className="flex gap-2 mt-6">
                        <Button
                            block
                            variant="default"
                            onClick={() => setServiceDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            block 
                            variant="solid" 
                            onClick={handleAddService}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ServicesHeader