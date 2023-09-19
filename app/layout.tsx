import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/navbar/Navbar'
import LoginModal from '@/components/modal/LoginModal'
import SignupStudentModal from '@/components/modal/SignupModal'
import SupabaseProvider from '@/providers/supabase-provider'


export const metadata: Metadata = {
  title: 'Our Tarbiyah',
  description: 'An Islamic Tutoring Provider.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"bg_gradient"}>
        <SupabaseProvider>
        <Navbar/>
        <LoginModal/>
        <SignupStudentModal/>
        <Toaster/>
        <div 
        className='mt-[6rem]
        container items-center justify-center
         mx-auto my-auto h-full w-full max-w-[90rem]
         flex flex-col gap-y-[10rem] sm:gap-y-[20rem] overflow-hidden'>
          {children}
        </div>
        <Footer/>
        </SupabaseProvider>
      </body>
    </html>
  )
}
