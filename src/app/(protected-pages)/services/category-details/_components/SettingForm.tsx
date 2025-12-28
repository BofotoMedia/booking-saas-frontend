'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import Button from '@/components/ui/Button'
import { HiOutlineQuestionMarkCircle, HiOutlineCloudUpload } from 'react-icons/hi'
import { TbPhotoPlus } from 'react-icons/tb'
import { Switcher } from '@/components/ui/Switcher'
import Upload from '@/components/ui/Upload'
import {useTranslations} from 'next-intl'

const categoryTypeOptions = [
    { value: 'Services', label: 'Services' },
    { value: 'Text field (free text input)', label: 'Text field (free text input)' },
    { value: 'Name / Description', label: 'Name / Description' },
]

const selectionOptions = [
    { value: 'Multiple selection', label: 'Multiple selection' },
    { value: 'Single selection', label: 'Single selection' },
]

const numberOfServiceColumnsOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
]

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

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

const SettingForm = () => {
    const t = useTranslations();

    const [attachments, setAttachments] = useState<File[]>([])

    return (
        <>
            <Card>
                <FormItem
                        label={t('protected.categoryDetails.categoryType')}
                        extra={tip}
                        layout="horizontal"
                        labelWidth="50%"
                    >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <Select
                                instanceId="basic"
                                placeholder="Please Select"
                                options={categoryTypeOptions}
                            />
                        {/* )}
                    /> */}
                </FormItem>
                
                <FormItem
                        label={t('protected.categoryDetails.selectionOptions')}
                        extra={tip}
                        layout="horizontal"
                        labelWidth="50%"
                    >
                    {/* <Controller
                        name="firstName"
                        render={({ field }) => ( */}
                            <Select
                                instanceId="basic"
                                placeholder="Please Select"
                                options={selectionOptions}
                            />
                        {/* )}
                    /> */}
                </FormItem>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                    <div className="md:col-span-1 xl:col-span-1 order-1">
                        <FormItem
                                label={t('protected.categoryDetails.numberOfServiceColumns')}
                                layout="horizontal"
                                labelWidth="70%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <Select
                                        instanceId="basic"
                                        defaultValue={numberOfServiceColumnsOptions[0]}
                                        options={numberOfServiceColumnsOptions}
                                    />
                                {/* )}
                            /> */}
                        </FormItem>
                        
                        <FormItem
                                label={t('protected.services.showInStep2')}
                                extra={tip}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

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
                    <div className="md:col-span-1 xl:col-span-1 order-2">
                        <FormItem
                                label={t('protected.categoryDetails.showPrice')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                                label={t('protected.categoryDetails.showDurationOfAppointment')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                                label={t('protected.categoryDetails.collapsibleServiceGroup')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                                label={t('protected.categoryDetails.showServiceGroupCollapsed')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                                label={t('protected.categoryDetails.showCategoryName')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>

                        <FormItem
                                label={t('protected.categoryDetails.showDescription')}
                                layout="horizontal"
                                labelWidth="80%"
                            >
                            {/* <Controller
                                name="firstName"
                                render={({ field }) => ( */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Switcher defaultChecked />
                                    </div>
                                {/* )}
                            /> */}
                        </FormItem>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default SettingForm
