import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { BookOpen, GraduationCap, LogOut, LucideIcon, UserCircle } from 'lucide-react'
import { STUDENT_DASHBOARD, TUTOR_DASHBOARD, PROFILE } from '@/constants/nav'
import { cn } from '@/lib/utils'
import { buttonVariants, Button } from '../ui/button'

interface ProfileMenuItemProps {
    icon: LucideIcon,
    href: string, 
    title: string,
  }

const ProfileMenuItem = ({icon: Icon, href, title}: ProfileMenuItemProps) => {
    return (
        <DropdownMenuItem>
          <Icon className="mr-2 h-4 w-4" />
          <Link href={href}>{title}</Link>
        </DropdownMenuItem>
    )
  }

const ProfileMenu = () => {
    return (
        <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button className={cn(buttonVariants({variant: "default"}), "")}>
                   <UserCircle/>
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56">
               <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                 <ProfileMenuItem title="Student" href={STUDENT_DASHBOARD} icon={GraduationCap}/>
                 <ProfileMenuItem title='Tutor' href={TUTOR_DASHBOARD} icon={BookOpen}/>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                <ProfileMenuItem title='Profile' href={PROFILE} icon={UserCircle}/>
               <DropdownMenuItem>
                 <LogOut className="mr-2 h-4 w-4" />
                 <span onClick={() => console.log("sda")}>Log out</span>
               </DropdownMenuItem>
               </DropdownMenuGroup>
             </DropdownMenuContent>
           </DropdownMenu>
      )
}

export default ProfileMenu