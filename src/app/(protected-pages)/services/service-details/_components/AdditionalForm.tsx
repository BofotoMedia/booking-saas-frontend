'use client'

import { useState, ChangeEvent } from 'react'
import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import Tooltip from '@/components/ui/Tooltip'
import Checkbox from '@/components/ui/Checkbox'
import { HiOutlineQuestionMarkCircle, HiOutlineClock } from 'react-icons/hi'
import TimeInput from '@/components/ui/TimeInput'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { TbPhotoPlus } from 'react-icons/tb'
import Switcher from '@/components/ui/Switcher'
import Upload from '@/components/ui/Upload'
import Radio from '@/components/ui/Radio'
import NumericInput from '@/components/shared/NumericInput'
import {useTranslations} from 'next-intl'

const bookingTypeOptions = [
    { value: 'Individual Booking', label: 'Individual Booking' },
    { value: 'Group Booking', label: 'Group Booking' },
]

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

const onSwitcherToggle = (val: boolean, e: ChangeEvent) => {
    console.log(val, e)
}

const maxUpload = 1

const beforeUpload = (files: FileList | null, fileList: File[]) => {
    let valid: string | boolean = true

    const allowedFileType = ['image/jpeg', 'image/png']
    const maxFileSize = 500000

    if (fileList.length >= maxUpload) {
        return `You can only upload ${maxUpload} file(s)`
    }

    if (files) {
        for (const f of files) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png file!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 500kb!'
            }
        }
    }

    return valid
}

const AdditionalForm = () => {
    const t = useTranslations();

    const [checkboxList] = useState(['Selection A'])

    const [attachments, setAttachments] = useState<File[]>([])

    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-5 gap-4">
                <div className="md:col-span-1 xl:col-span-1 order-1">
                    <FormItem
                        label={t('protected.serviceDetails.bookingType')}
                        extra={tip}
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Select
                                    instanceId="basic"
                                    placeholder={t('protected.serviceDetails.pleaseSelect')}
                                    options={bookingTypeOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-2 xl:order-2 md:justify-self-end">
                    <FormItem
                        label={t('protected.serviceDetails.serviceLocation')}
                        extra={tip}
                        asterisk={true}
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Checkbox.Group vertical value={checkboxList}>
                                    <Checkbox value="At my business location">At my business location </Checkbox>
                                    <Checkbox value="At customer's location">At customer's location </Checkbox>
                                </Checkbox.Group>
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-3 xl:order-3 md:justify-self-end">
                    <FormItem
                        label={t('protected.serviceDetails.duration')}
                        extra={tip}
                        asterisk={true}
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
                <div className="md:col-span-2 xl:col-span-1 order-4 xl:order-4 md:justify-self-end">
                    <FormItem
                        label={t('protected.serviceDetails.active')}
                        extra={tip}
                        asterisk={true}
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Switcher defaultChecked onChange={onSwitcherToggle} />
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-2 xl:col-span-1 order-5 xl:order-5 md:justify-self-end">
                    <FormItem
                        label={t('protected.serviceDetails.photo')}
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Upload>
                                    <Button type="button" variant="solid" icon={<HiOutlineCloudUpload />}>
                                        Upload your file
                                    </Button>
                                </Upload>
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
                <div className="md:col-span-1 xl:col-span-1 order-1 xl:order-1">
                    <FormItem
                        label={t('protected.serviceDetails.pricingMode')}
                        extra={tip}
                    >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Radio className="mr-4" name="simpleRadioExample">
                                    Per participant
                                </Radio>
                                <Radio defaultChecked name="simpleRadioExample">
                                    Per group
                                </Radio>
                            {/* )}
                        /> */}
                    </FormItem>
                </div>
                <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-2">
                    <FormItem
                        label={t('protected.serviceDetails.minMax')}
                        extra={tip}
                    >
                        <div className="flex items-center gap-2">
                            <NumericInput
                                type="text"
                                autoComplete="off"
                                placeholder="0"
                                className="w-20"
                                isAllowed={(values) => {
                                    const { floatValue } = values
                                    return (floatValue || 0) <= 100
                                }}
                            />
                            <span className="text-gray-500">-</span>
                            <NumericInput
                                type="text"
                                autoComplete="off"
                                placeholder="0"
                                className="w-20"
                                isAllowed={(values) => {
                                    const { floatValue } = values
                                    return (floatValue || 0) <= 100
                                }}
                            />
                            <span className="text-gray-500">{t('protected.serviceDetails.participantsPerGroup')}</span>
                        </div>
                    </FormItem>
                </div>
                <div className="md:col-span-1 xl:col-span-1 order-3 xl:order-3">
                    <FormItem
                        label={t('protected.serviceDetails.maxCapacity')}
                        extra={tip}
                    >
                        <div className="flex items-center gap-2">
                            <NumericInput
                                type="text"
                                autoComplete="off"
                                placeholder="0"
                                className="w-20"
                                isAllowed={(values) => {
                                    const { floatValue } = values
                                    return (floatValue || 0) <= 100
                                }}
                            />
                            <span className="text-gray-500">{t('protected.serviceDetails.participantsPerSession')}</span>
                        </div>
                    </FormItem>
                </div>
            </div>
        </Card>
    )
}

export default AdditionalForm
