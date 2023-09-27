import { LucideIcon } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
    icon: LucideIcon,
    label: string,
    active: boolean,
    href: string,
}

const SidebarItem = ({ icon: Icon, label, active, href }: SidebarItemProps) => {
  return (
    <Link href={href} 
    className={cn("flex", buttonVariants({variant: active ? "secondary" : "ghost"}))} >
        <div className='w-full gap-x-10 flex'>
        <Icon/><h1>{label}</h1>
      </div>
        
    </Link>
  )
}

export default SidebarItem