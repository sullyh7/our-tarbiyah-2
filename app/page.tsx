import AnimatedDiv from '@/components/AnimatedDiv'
import Information from '@/components/Information'
import Hero from '@/components/home/Hero'
import { Button } from '@/components/ui/button'
import { BOOK_A_LESSON_NOW, homePageCards } from '@/constants/nav'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return <>
    <Hero/>

    {homePageCards.map((cardInfo, index) => <Information key={index}
      direction={index % 2 == 0 ? "left" : "right"}
      title={cardInfo.title} 
      image={cardInfo.image}     
      >
        {cardInfo.description}
      </Information>)}

      <AnimatedDiv direction='right' className='items-center justify-center text-center'>
        <h1 className='mb-10 sm:text-4xl w-[80%] text-2xl font-bold'>{'"Once the prayer is over, disperse throughout the land and seek the bounty of Allah..."'}
        <span className=' text-xl font-extrabold'>{" "}(62:10)</span></h1>
        <Image src={"/images/home/admission.svg"} alt='Hand' width={500} height={100}/>
        <Button className='sm:w-[20%] my-10 text-2xl p-8'><Link href={BOOK_A_LESSON_NOW}>Get Started</Link></Button>
      </AnimatedDiv>
    
  </>
}