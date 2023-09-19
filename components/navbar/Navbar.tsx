"use client";

import ProfileMenu from './ProfileMenu'
import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { navBarLinks } from '@/constants/nav';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import { useDialogStore } from '@/store/LoginModalStore';

const Navbar = () => {
    const openLoginDialog = useDialogStore(state => state.openLoginDialog);
  return (
    <nav className='border-b-[0.1rem] flex justify-between items-center inset-0 p-3 px-10'>
        <div>
            <Link href={"/"}>
              <Image key={"logo"} src={'/images/logo-notext copy.png'} alt={'Our Tarbiyah'} width={70} height={50} />
            </Link>
        </div>
        {/* desktop nav */}
        <NavigationMenu className='sm:flex hidden'>
        <NavigationMenuList className='gap-x-8'>
            {navBarLinks.map(link => <NavigationMenuItem
            key={link.name}
            >
               <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-ghost hover:bg-primary hover:text-background")}>
                    {/* <NavigationMenuLink className={""}> */}
                        <h1 className='text-lg'>{link.name}</h1>
                    </NavigationMenuLink>
                </Link> 
            </NavigationMenuItem>)}
            </NavigationMenuList>
        </NavigationMenu>
        <div className='flex space-x-2'>
          <ProfileMenu/>
          <div className='sm:hidden flex flex-row'>
            <MobileMenu/>
          </div>
        </div>
        
    </nav>
  )
}

export default Navbar