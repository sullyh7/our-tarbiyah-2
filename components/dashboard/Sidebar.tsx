"use client"

import { BookIcon, BrainCircuit, Calendar, CalendarRangeIcon, GraduationCap, HistoryIcon, LayoutDashboardIcon, Settings, SettingsIcon, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SidebarItem from './SidebarItem';
import { TUTOR_DASHBOARD } from '@/constants/nav';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useUser } from '@supabase/auth-helpers-react';


const Sidebar = () => {
    const user = useUser();
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: LayoutDashboardIcon,
            label: 'Dashboard',
            active: pathname === TUTOR_DASHBOARD,
            href: TUTOR_DASHBOARD
        },
        {
          icon: CalendarRangeIcon,
          label: 'Schedule',
          href: `${TUTOR_DASHBOARD}/schedule`,
          active: pathname === `${TUTOR_DASHBOARD}/schedule`
        },
        {
          icon: BrainCircuit,
          label: 'Development',
          href: `${TUTOR_DASHBOARD}/development`,
          active: pathname === `${TUTOR_DASHBOARD}/development`
        },
        {
          icon: GraduationCap,
          label: 'Student Hub',
          href: `${TUTOR_DASHBOARD}/student-hub`,
          active: pathname === `${TUTOR_DASHBOARD}/student-hub`
        },
        {
          icon: Settings,
          label: 'Settings',
          href: `${TUTOR_DASHBOARD}/settings`,
          active: pathname === `${TUTOR_DASHBOARD}/settings`
        },
      ], [pathname]);
  return (
    <div className='h-full'>
      <div className='flex flex-col gap-y-10'>
        <div className='text-center self-center'>
          <h1 className='font-bold text-3xl '>{user?.user_metadata.firstname}</h1>
          <h1 className='font-bold text-3xl'>{user?.user_metadata.lastname}</h1>  
        </div>
        <div className='flex flex-col gap-y-5'>
          {routes.map((item, i) => <SidebarItem key={i} {...item} />)}
        </div>
      </div>
    </div>
  )
}

export default Sidebar