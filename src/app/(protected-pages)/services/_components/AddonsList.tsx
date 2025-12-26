'use client'

import { useServicesStore } from '../_store/servicesStore'
import { LuInfo, LuWrench, LuCalendarDays, LuPencil, LuNotepadText } from "react-icons/lu";
import { MdDragIndicator } from 'react-icons/md'
import Card from '@/components/ui/Card'
import Tooltip from '@/components/ui/Tooltip'

const AddonsList = () => {
    const { serviceAddons, bookingAddons, additionalInfo } = useServicesStore()

    const handleDragStart = (e: React.DragEvent, addon: string, type: string) => {
        e.dataTransfer.setData('addon', addon)
        e.dataTransfer.setData('type', type)
        e.dataTransfer.effectAllowed = 'copy'
    }

    const AddonItem = ({ 
        addon, 
        type, 
        icon 
    }: { 
        addon: string
        type: string
        icon?: React.ReactNode 
    }) => (
        <>
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, addon, type)}
                className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-move transition-colors group py-5"
            >
                <div className="flex items-center gap-2">
                    <span
                        className="text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <MdDragIndicator />
                    </span>
                    {icon && <span className="text-gray-400">{icon}</span>}
                    <span className="text-sm">{addon}</span>
                </div>
                <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <LuPencil className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" size={14} />
                </button>
            </div>
            <hr />
        </>
    )

    return (
        <div className="space-y-6">
            {/* Service Add-ons */}
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <h4 className="mb-4">Service Add-ons</h4>
                        <Tooltip title="These options apply to the entire service, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                            <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                <LuInfo />
                            </span>
                        </Tooltip>
                    </div>
                    <button className="p-1.5 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors">
                        <LuWrench className="text-sky-500" size={18} />
                    </button>
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
                        <h4 className="mb-4">Booking Add-ons</h4>
                        <Tooltip title="These options apply to the entire booking, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                            <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                <LuInfo />
                            </span>
                        </Tooltip>
                    </div>
                    <button className="p-1.5 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                        <LuCalendarDays className="text-orange-500" size={18} />
                    </button>
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
                        <h4 className="mb-4">Additional Information</h4>
                        <Tooltip title="These options apply to the entire information, regardless of the services selected. Use them for general requests or mandatory check-in steps.">
                            <span className="w-4 h-4 rounded-full flex justify-center cursor-pointer">
                                <LuInfo />
                            </span>
                        </Tooltip>
                    </div>
                    <button className="p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                        <LuNotepadText className="text-amber-500" size={18} />
                    </button>
                </div>
                <div className="space-y-1">
                    {additionalInfo.map((info, index) => (
                        <AddonItem key={index} addon={info} type="info" />
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default AddonsList