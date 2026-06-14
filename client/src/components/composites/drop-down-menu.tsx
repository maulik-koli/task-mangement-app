'use client'
import React from 'react'
import { LucideIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'


interface DropDownMenuItem {
    label: string | React.ReactNode
    onClick: () => void
    isSeparator?: boolean
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
}

interface DropDownMenuProps {
    triggerNode: React.ReactNode
    items: DropDownMenuItem[]
    contantNode?: React.ReactNode
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ triggerNode, contantNode, items }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {triggerNode}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                {contantNode}
                {contantNode && <DropdownMenuSeparator />}
                <DropdownMenuGroup>
                    {items.map((item, index) => {
                        const LeftIcon = item.leftIcon
                        const RightIcon = item.rightIcon

                        return (
                            <React.Fragment key={index}>
                                <DropdownMenuItem onClick={item.onClick} className='cursor-pointer justify-between w-full'>
                                    <div className="flex items-center">
                                        {LeftIcon && (
                                            <LeftIcon className="mr-2 size-4 text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground" />
                                        )}
                                        {typeof item.label === 'string' ? (
                                            <span className='font-normal text-foreground mt-0.5 text-sm'>{item.label}</span>
                                        ) : (
                                            item.label
                                        )}
                                    </div>
                                    {RightIcon && (
                                        <RightIcon className="ml-2 size-4 text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground" />
                                    )}
                                </DropdownMenuItem>
                                {item.isSeparator && <DropdownMenuSeparator className='my-1' />}
                            </React.Fragment>
                        )
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenu