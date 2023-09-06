import React from 'react'
import AnimatedDiv, { AnimatedDivProps } from './AnimatedDiv'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface InformationProps extends AnimatedDivProps {
    image: string,
    title: string,
}

const Information = ({image, title, direction, className, children: description}: InformationProps) => {
  return (

    
    <AnimatedDiv direction={direction} className={cn("flex items-center gap-y-10 gap-x-10 flex-col sm:flex-row", className)}>
  {direction === "left" ? (
    <>
      <Image className="sm:flex" src={image} width={400} height={600} alt={title} />
      <div className="text-center flex flex-col gap-y-5">
        <h1 className="font-bold card_title">{title}</h1>
        <p className="card_p" style={{ lineHeight: "1.5" }}>
          {description}
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="text-center flex flex-col gap-y-5">
        <h1 className="font-bold card_title">{title}</h1>
        <p className="card_p" style={{ lineHeight: "1.5" }}>
          {description}
        </p>
      </div>
      <Image className="hidden sm:flex" src={image} width={400} height={600} alt={title} />
    </>
  )}
</AnimatedDiv>

  )
}

export default Information;