"use client"

import AnimatedDiv from '@/components/AnimatedDiv'
import { Button } from '@/components/ui/button'
import { useDialogStore } from '@/store/LoginModalStore'
import { Inspect, Keyboard, LayoutDashboard } from 'lucide-react'
import React from 'react'

const BookNow = () => {

  const openLoginDialog = useDialogStore(state => state.openLoginDialog)

  return (
    <div className='lg:mb-[10rem] pb-10 sm:pb-20 sm:gap-x-10 gap-y-10 flex sm:flex-row flex-col  items-center'>
      <AnimatedDiv direction='right' className='flex flex-col gap-y-10 items-center text-center sm:items-start sm:text-left'>
      <h1 className='page_header'>Bismillah, start your lesson now.</h1>
            <p className='w-[75%] text-4xl'>The ship of academic excellence is about to set sail! Commence your journey with our tutors…</p>
            <Button onClick={openLoginDialog} className="w-[40%] sm:flex hidden text-2xl p-[2.1rem]">Book now</Button>
      </AnimatedDiv>
      <AnimatedDiv direction='left' className='items-start sm:text-4xl gap-y-10 sm:gap-y-20'>
            <div className='flex start gap-x-5'>
                <Inspect size={60}/>
                <h1>Press book.</h1>
            </div>
            <div className='flex start gap-x-5'>
                <Keyboard size={60}/>
                <h1>Sign up.</h1>
            </div>
            <div className='flex start gap-x-5'>
                <LayoutDashboard size={60}/>
                <h1>Select a timeslot from your dashboard.</h1>
            </div>
      </AnimatedDiv>
      <Button onClick={openLoginDialog} className="w-[40%] sm:hidden text-xl p-[2.1rem]">Book now</Button>
    </div> 
  )
}

export default BookNow