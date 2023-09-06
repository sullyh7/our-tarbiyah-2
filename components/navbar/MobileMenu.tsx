import { navBarLinks } from "@/constants/nav"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { Menu } from "lucide-react"

const MobileMenu = () => {
    return (
      <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button className={cn('p-6', buttonVariants({variant: "secondary"}))}>
                 <Menu/>
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-56">
             <DropdownMenuLabel>Navigation</DropdownMenuLabel>
             <DropdownMenuSeparator />
               {navBarLinks.map(link => <DropdownMenuItem
               key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
               </DropdownMenuItem>)}   
           </DropdownMenuContent>
         </DropdownMenu>
    )
  }

  export default MobileMenu;
  