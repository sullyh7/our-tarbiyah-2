"use client";

import React from 'react'
import AnimatedDiv from '../AnimatedDiv'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useDialogStore } from '@/store/LoginModalStore';

const Hero = () => {

const openLoginDialog = useDialogStore(state => state.openLoginDialog)
  return (
    <div className='sm:flex-row flex-col flex w-full justify-between items-center'>
        <AnimatedDiv direction='right' className='flex-1'>
            <div>
                <h1 className='page_header'>“Read! And your Lord is most generous,
                     <span className='text_gradient'>Who taught by the pen-”</span> 
                    <span className='text-lg'>(96:3-4)</span>
                </h1>
                <h1 className='mt-[2rem] font-normal subheader'>We are an exclusive online tuition hub, thriving with its promotion of Islamic community.</h1>
            </div>
        
            <Button className='sm:w-[35%] my-10 text-xl p-8' onClick={openLoginDialog}>Book A Lesson Now</Button>
        </AnimatedDiv>

        <AnimatedDiv className='flex-2 ' direction='left'>
            <Image className='hidden sm:flex' width={500} height={500} alt='Our Tarbiyah' src={"/images/home/hero_image.svg"}/>
            {/* <Image className='flex sm:hidden' width={300} height={300} alt='Our Tarbiyah' src={"/images/home/hero_image.svg"}/> */}
        </AnimatedDiv>

    </div>
  )
}

export default Hero