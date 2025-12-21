'use client'

import { Draggable } from '@hello-pangea/dnd'
import { TbPencil, TbGripVertical } from 'react-icons/tb'
import { AddonType } from '../types'

interface SidebarSectionProps {
    title: string
    items: string[]
    type: AddonType
}

interface DraggableAddonItemProps {
    item: string
    type: AddonType
    index: number
}

const DraggableAddonItem = ({ item, type, index }: DraggableAddonItemProps) => {
    const draggableId = `addon-${type}-${index}-${item}`

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`
                        flex items-center justify-between py-2 px-2 rounded transition-colors
                        ${snapshot.isDragging ? 'opacity-50 bg-blue-100 shadow-lg' : 'hover:bg-gray-50'}
                    `}
                >
                    <div className="flex items-center gap-2 flex-1">
                        <button
                            {...provided.dragHandleProps}
                            className="text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing"
                        >
                            <TbGripVertical size={16} />
                        </button>
                        <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded transition-colors">
                        <TbPencil size={14} />
                    </button>
                </div>
            )}
        </Draggable>
    )
}

const SidebarSection = ({ title, items, type }: SidebarSectionProps) => {
    return (
        <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h4>
            <div className="bg-gray-50 rounded-lg p-2">
                {items.length > 0 ? (
                    <div className="space-y-0.5">
                        {items.map((item, idx) => (
                            <DraggableAddonItem 
                                key={`${type}-${idx}-${item}`} 
                                item={item} 
                                type={type}
                                index={idx}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-xs text-center py-3">
                        No {title.toLowerCase()} available
                    </div>
                )}
            </div>
        </div>
    )
}

export default SidebarSection