'use client'

import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { components } from 'react-select'
import type {
    OptionProps,
    MultiValueGenericProps,
} from 'react-select'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { Switcher } from '@/components/ui/Switcher'
import {useTranslations} from 'next-intl'

type SettingType = 'generalSettings' | 'advancedSettings'

type SettingFormProps = {
    settingType: SettingType
}

type Option = {
    value: string
    label: string
    imgPath: string
}

const { MultiValueLabel } = components

const countryOptions: Option[] = [
    { value: 'sb', label: 'Shannon Baker', imgPath: '/img/peoples/image1.png' },
    { value: 'es', label: 'Eugene Stewart', imgPath: '/img/peoples/image2.png' },
    { value: 'ag', label: 'Angellina Gotelli', imgPath: '/img/peoples/image3.png' },
]

const CustomSelectOption = (props: OptionProps<Option>) => {
    return (
        <DefaultOption<Option>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar shape="circle" size={20} src={data.imgPath} />
                    <span className="ml-2 rtl:mr-2">{label}</span>
                </span>
            )}
        />
    )
}

const CustomControlMulti = ({
    children,
    ...props
}: MultiValueGenericProps<Option, true>) => {
    const { imgPath } = props.data
    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={imgPath}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

const categoryOptions = [
    { value: 'Home Cleaning', label: 'Home Cleaning' },
    { value: 'Business Cleaning', label: 'Business Cleaning' },
    { value: 'Move-out Cleaning', label: 'Move-out Cleaning' },
]

const showOnlyOptions = [
    { value: 'Always show', label: 'Always show' },
    { value: 'Never show', label: 'Never show' },
]

const hideServiceOptions = [
    { value: 'Apartment Cleaning', label: 'Apartment Cleaning' },
    { value: 'House Cleaning', label: 'House Cleaning' },
    { value: 'Kitchen Cleaning', label: 'Kitchen Cleaning' },
]

const bufferBehaviorOptions = [
    { value: 'Use employee default', label: 'Use employee default' },
]

const showDescriptionOptions = [
    { value: 'Below service name', label: 'Below service name' },
]

const cancellationDeadlineOptions = [
    { value: 'Use employee default', label: 'Use employee default' },
]

const bookingBehaviorOptions = [
    { value: 'Standard appointment', label: 'Standard appointment' },
]

const vatSettingOptions = [
    { value: 'Use company default', label: 'Use company default' },
]

const tip = (
    <Tooltip title="Field info">
        <HiOutlineQuestionMarkCircle className="text-lg cursor-pointer ml-1" />
    </Tooltip>
)

const SettingForm = ({ settingType }: SettingFormProps) => {
    const t = useTranslations();
    
    return (
        <>
            {/* General Settings */}
            {settingType === 'generalSettings' && (
                <Card>
                    <FormItem
                            label={t('protected.serviceDetails.assignedEmployees')}
                            extra={tip}
                        >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Select<Option, true>
                                    isMulti
                                    options={countryOptions}
                                    components={{
                                        Option: CustomSelectOption,
                                        MultiValueLabel: CustomControlMulti,
                                    }}
                                    defaultValue={[countryOptions[1], countryOptions[2]]}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                    
                    <FormItem
                            label={t('protected.serviceDetails.displayedInCategories')}
                            extra={tip}
                        >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Select
                                    isMulti
                                    instanceId="multi-selection"
                                    placeholder="Please Select"
                                    options={categoryOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                    
                    <FormItem
                            label={t('protected.serviceDetails.showOnlyWhenCertainServicesAreSelected')}
                            extra={tip}
                        >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Select
                                    instanceId="basic"
                                    placeholder="Please Select"
                                    options={showOnlyOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                    
                    <FormItem
                            label={t('protected.serviceDetails.hideTheseServicesWhenSelected')}
                            extra={tip}
                        >
                        {/* <Controller
                            name="firstName"
                            render={({ field }) => ( */}
                                <Select
                                    isMulti
                                    instanceId="multi-selection"
                                    placeholder="Please Select"
                                    options={hideServiceOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                </Card>
            )}
            
            {/* Advanced Settings */}
            {settingType === 'advancedSettings' && (
                <Card>
                    <FormItem
                            label={t('protected.serviceDetails.bufferBehavior')}
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
                                    options={bufferBehaviorOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>
                    
                    <FormItem
                            label={t('protected.serviceDetails.showDescriptionInfo')}
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
                                    options={showDescriptionOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>

                    <FormItem
                            label={t('protected.serviceDetails.cancellationDeadline')}
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
                                    options={cancellationDeadlineOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>

                    <FormItem
                            label={t('protected.serviceDetails.bookingBehavior')}
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
                                    options={bookingBehaviorOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>

                    <FormItem
                            label={t('protected.serviceDetails.vatSetting')}
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
                                    options={vatSettingOptions}
                                />
                            {/* )}
                        /> */}
                    </FormItem>

                    <FormItem
                            label={t('protected.serviceDetails.showInStep2')}
                            extra={tip}
                            layout="horizontal"
                            labelWidth="50%"
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
                            label={t('protected.serviceDetails.createsAJobWorkOrder')}
                            extra={tip}
                            layout="horizontal"
                            labelWidth="50%"
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
                </Card>
            )}
        </>
    )
}

export default SettingForm
