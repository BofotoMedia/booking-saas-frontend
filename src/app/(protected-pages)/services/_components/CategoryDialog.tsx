'use client'

import { useState, useEffect } from 'react'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Category } from '../types'

interface CategoryDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: Omit<Category, 'id' | 'services'>) => void
    category?: Category
}

const CategoryDialog = ({ isOpen, onClose, onSave, category }: CategoryDialogProps) => {
    const [formData, setFormData] = useState({
        name: '',
        step: '',
    })

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                step: category.step || '',
            })
        } else {
            setFormData({
                name: '',
                step: '',
            })
        }
    }, [category, isOpen])

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            alert('Category name is required')
            return
        }

        onSave({
            name: formData.name,
            count: category?.count || 0,
            step: formData.step || undefined,
        })

        handleClose()
    }

    const handleClose = () => {
        setFormData({ name: '', step: '' })
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
                    <h4 className="mb-1">{category ? 'Edit Category' : 'Add Category'}</h4>
                    <p className="text-gray-500">
                        {category ? 'Update category details' : 'Create a new service category'}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Enter category name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Step (Optional)
                        </label>
                        <Input
                            placeholder="e.g., Step 1, Step 2"
                            value={formData.step}
                            onChange={(e) => setFormData({ ...formData, step: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <Button
                        block
                        variant="default"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        block
                        variant="solid"
                        onClick={handleSubmit}
                    >
                        {category ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default CategoryDialog