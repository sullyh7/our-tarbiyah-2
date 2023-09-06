import AnimatedDiv from '@/components/AnimatedDiv'
import Information from '@/components/Information'
import PrincipleCard from '@/components/about-us/PrincipleCard'
import { qualities } from '@/constants/nav'
import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <>

        <div className='text-center flex w-full'>
          <AnimatedDiv direction='right' className='hidden sm:flex flex-1'>
          <Image  src={"/images/about-us/library.svg"} alt='Library' width={500} height={100}/>
          </AnimatedDiv>
          <AnimatedDiv direction='left' className='flex-1'>
            <h1 className=' page_header text-center' >The first online school-tutoring in a fully fledged <span className='text_gradient'>Islamic environment.</span></h1>
            <h2 className='text-4xl mt-[2rem]'>We represent the ambitious Muslim student who seeks to prosper in academia.</h2>
          </AnimatedDiv>
        </div>      


        <Information image={'/images/about-us/medical.svg'} 
        title={'Our Vision.'} direction={'left'} className='gap-x-10'>
          At Our Tarbiyah, our vision is to empower Muslim individuals to drive positive change. We provide tutoring rooted in 
                    Islamic principles and exceptional convenience, nurturing academic excellence. Together, 
                    we aim to shape a generation of Muslim leaders who make a profound 
                    impact on the world.
        </Information>

        <div className='flex sm:flex-row flex-col text-center gap-x-5 gap-y-10'>
          <AnimatedDiv direction='right' className='flex-1'>
          <h1 className='font-bold card_title'>Keeping to Islamic values is our first priority.</h1>
          </AnimatedDiv>
        <AnimatedDiv direction='left' className='flex-1 flex-col gap-y-5'>
          {qualities.map(value => <div key={value.number} className='border-4 p-5 border-accent border-opacity-50 rounded-xl flex items-center card_p'>
                <h1 className='text-9xl font-bold'>{value.number}</h1>
                <p>{value.content}</p></div>)}
        </AnimatedDiv>
        </div>
        

        <div className='w-full flex flex-col items-center justify-center gap-y-20'>
          <h1 className='card_title text-center font-bold'>Our lessons are delivered with:</h1>
          {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
          {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
          {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}
          {/*  */}
          <div className='flex flex-col justify-center items-center gap-y-5 gap-x-10 sm:gap-y-0 sm:flex-row sm:justify-between w-full'>
            <PrincipleCard arabic='استقامة' transl="/Istiqaama/:" english={'Integrity, rectitude'} icon='/images/about-us/a_heart.apng'/>
            <PrincipleCard arabic='حماسة' transl='/Hamaasah/:' english='Enthusiasm, eagerness.' icon='/images/about-us/shooting_star.apng'/>
            <PrincipleCard arabic='طموح' transl='/Tumuh/:' english=' Aspiration, growth.' icon= '/images/about-us/a_plant.apng'/>
          </div>
        </div>
        <div></div>
    </>
  )
}

export default AboutUs