'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import { useServicesStore } from '../_store/servicesStore'
import Tooltip from '@/components/ui/Tooltip'
import TimeInput from '@/components/ui/TimeInput'
import { HiOutlineQuestionMarkCircle, HiOutlineClock } from 'react-icons/hi'
import { TbPlus } from 'react-icons/tb'
import type { AddonItem } from '../types'
import {useTranslations} from 'next-intl'
import Switcher from '@/components/ui/Switcher'

interface AddonTypeOption {
    value: 'service' | 'booking' | 'info'
    label: string
}

const displayStepOptions = [
    { value: 'After service selection', label: 'After service selection' },
    { value: 'During customer details', label: 'During customer details' },
]

const selectionTypeOptions = [
    { value: 'Checkbox (on/off)', label: 'Checkbox (on/off)' },
    { value: 'Single Choice (radio)', label: 'Single Choice (radio)' },
    { value: 'Dropdown', label: 'Dropdown' },
    { value: 'Quantity selector (number / stepper)', label: 'Quantity selector (number / stepper)' },
]

const addonTypeOptions = [
    { value: 'Booking', label: 'Booking' },
    { value: 'Service', label: 'Service' },
    { value: 'Additional Information', label: 'Additional Information' },
]

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

const AddonsHeader = () => {
    const t = useTranslations();

    const [dialogOpen, setDialogOpen] = useState(false)
    const [addonName, setAddonName] = useState('')
    const [addonType, setAddonType] = useState<'service' | 'booking' | 'info'>('service')
    const [step2, setStep2] = useState(false)
    
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
        
        const newAddon: AddonItem = {
            id: Date.now().toString(),
            name: addonName,
            step2: step2
        }
        
        switch (addonType) {
            case 'service':
                updateServiceAddons([...serviceAddons, newAddon])
                break
            case 'booking':
                updateBookingAddons([...bookingAddons, newAddon])
                break
            case 'info':
                updateAdditionalInfo([...additionalInfo, newAddon])
                break
        }
        
        setAddonName('')
        setStep2(false)
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
                    {t('protected.services.addAddons')}
                </Button>
            </div>

            <Dialog
                isOpen={dialogOpen}
                width={600}
                onClose={() => setDialogOpen(false)}
                onRequestClose={() => setDialogOpen(false)}
            >
                <div>
                    <div className="mb-6">
                        <h4 className="mb-1">
                            {t('protected.services.addAddons')}
                        </h4>
                    </div>
                    
                    <div className="space-y-4">
                        <FormItem
                            label={t('protected.services.addonName')}
                            asterisk={true}
                        >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder={t('protected.services.addonName')}
                                        // {...field}
                                    />
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                            label={t('protected.serviceDetails.description')}
                            asterisk={true}
                        >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        textArea
                                        // {...field}
                                    />
                                {/* )}
                            /> */}
                        </FormItem>
                        
                        <FormItem
                            label={t('protected.services.showDescription')}
                            layout="horizontal"
                            labelWidth="30%"
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Switcher defaultChecked />
                            </div>
                        </FormItem>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                            <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                                <FormItem
                                    label={t('protected.services.displayStep')}
                                    extra={tip}
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Select
                                                instanceId="basic"
                                                placeholder={t('protected.serviceDetails.pleaseSelect')}
                                                options={displayStepOptions}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>

                            <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-2">
                                <FormItem
                                    label={t('protected.services.selectionType')}
                                    extra={tip}
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Select
                                                instanceId="basic"
                                                placeholder={t('protected.serviceDetails.pleaseSelect')}
                                                options={selectionTypeOptions}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                            <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                                    <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                                        <FormItem
                                            label={t('protected.serviceDetails.duration')}
                                            extra={tip}
                                        >
                                            {/* <Controller
                                                name="firstName"
                                                render={({ field }) => ( */}
                                                    <TimeInput
                                                        prefix={<HiOutlineClock className="text-lg" />}
                                                        suffix={null}
                                                    />
                                                {/* )}
                                            /> */}
                                        </FormItem>
                                    </div>
                                    <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-2">
                                        <FormItem
                                            label={t('protected.serviceDetails.required')}
                                            extra={tip}
                                        >
                                            {/* <Controller
                                                name="firstName"
                                                render={({ field }) => ( */}
                                                    <Switcher defaultChecked />
                                                {/* )}
                                            /> */}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-2">
                                <FormItem
                                    label={t('protected.services.addonType')}
                                    extra={tip}
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Select
                                                instanceId="basic"
                                                placeholder={t('protected.serviceDetails.pleaseSelect')}
                                                options={addonTypeOptions}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-4">
                            <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                                <FormItem
                                    label={t('protected.serviceDetails.price')}
                                    extra={tip}
                                >
                                </FormItem>
                            </div>
                            <div className="md:col-span-2 xl:col-span-1 order-2 xl:order-2">
                                <FormItem
                                    label=""
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                size="lg" 
                                                placeholder="A"
                                                // {...field}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>
                            <div className="md:col-span-2 xl:col-span-1 order-3 xl:order-3">
                                <FormItem
                                    label=""
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                size="lg" 
                                                placeholder="B"
                                                // {...field}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>
                            <div className="md:col-span-2 xl:col-span-1 order-4 xl:order-4">
                                <FormItem
                                    label=""
                                >
                                    {/* <Controller
                                        name="firstName"
                                        render={({ field }) => ( */}
                                            <Input
                                                type="text"
                                                autoComplete="off"
                                                size="lg" 
                                                placeholder="C"
                                                // {...field}
                                            />
                                        {/* )}
                                    /> */}
                                </FormItem>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button 
                            type="button"
                            onClick={() => setDialogOpen(false)}>
                            {t('protected.services.cancel')}
                        </Button>
                        <Button
                            variant="solid"
                            type="submit"
                            onClick={handleAddAddon}
                        >
                            {t('protected.services.submit')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddonsHeader