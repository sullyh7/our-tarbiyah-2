import AnimatedDiv from '@/components/AnimatedDiv'
import SignUpForm from '@/components/form/SignupForm'
import React from 'react'

const BeATutor = async () => {

  return (
    <>
    <div className='flex flex-col gap-y-10 text-center sm:text-left sm:flex-row sm:items-start items-center justify-between gap-x-5'>
    <AnimatedDiv direction='right' className="flex-1">
      <h1 className='page_header'>Nurture the next generation of Muslims.</h1>
        <p className='subheader mt-[2rem]'>Are you ready to join Our Tarbiyah? Be part of the growing revolution to shape the future for Muslims in education.</p>
    </AnimatedDiv> 
    <div className='flex-1 border-primary border-2 p-5 rounded-xl'>
      <SignUpForm type='tutor'/>
    </div>
    
    </div>
    <div/>
    </>
    
    
  )
}

export default BeATutor