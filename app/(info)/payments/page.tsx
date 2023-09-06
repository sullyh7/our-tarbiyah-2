import React from 'react'

import PriceCard from '@/components/payments/PriceCard'
import { Button } from '@/components/ui/button'
import Information from '@/components/Information'


const Payments = () => {
  return (
    <>
        <div className='flex flex-col relative justify-center items-center gap-y-10 sm:gap-y-15'>
          {/* <Image className='mt-[20rem] opacity-[25%] z-[-1] absolute' src={"/images/bg-4.svg"} width={4000} height={300} alt='bg'/> */}
        <h1 className='text-4xl sm:text-7xl font-extrabold text-center'>Convenient learning at <span className='text_gradient'>convenient prices.</span></h1>
        <div className='text-2xl sm:text-3xl flex sm:flex-row gap-5 flex-col w-[75%] items-center justify-around'>
            <PriceCard>SATs from £20</PriceCard>
            <PriceCard>GCSEs from £25</PriceCard>
            <PriceCard>A-Levels from £25</PriceCard>
        </div>
        <Button className='book_button text-xl p-[2rem]'>
            Book yourself a lesson now (or your child)
        </Button>
        <h1 className="font-thin italic">We take a small service fee for accomodating :P</h1>
      </div>

      <Information image='/images/payments/payments.svg' direction='left'
      title={'Simple, easy pay-as-you-go system'} 
      >
      Schedule a lesson, pay, and start learning! 
      </Information>

      <Information image='/images/payments/receipts.svg' direction='right'
      title={'Never lose track of your tutoring expenses!'} 
      >
      We provide receipts & records for easy budget management, so you can understand how to budget your education effectively.
      </Information>
      <div></div>

    </>
  )
}

export default Payments;