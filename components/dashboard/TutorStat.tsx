import { LucideIcon } from 'lucide-react'
import React from 'react'

interface TutorStatProps{
    icon: LucideIcon,
    text: string,
    footer: string,

}

const TutorStat = ({ icon: Icon, text, footer}: TutorStatProps) => {
  return (
    <div className='text-secondary flex flex-col '>
        <Icon size={50}/>
        <h1 className='text-5xl font-bold'>{text}</h1>
        <p>{footer}</p>
    </div>
  )
}

export default TutorStat