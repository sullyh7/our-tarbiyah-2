import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface PrinciplesProps {
    arabic: string,
    transl: string,
    english: string,
    icon: string,
}

const PrincipleCard = ({arabic, english, icon, transl}: PrinciplesProps) => {
    return <Card className="text-primary sm:w-[350px] w-[300px] text-center flex flex-col items-center justify-center">
    <CardHeader>
      <CardTitle className='card_title'>{arabic}</CardTitle>
      <CardDescription className='text-2xl'>{transl}</CardDescription>
      <CardDescription className='text-2xl'>{english}</CardDescription>
      
    </CardHeader>
    <CardContent>
        <Image src={icon} alt={english} width={200} height={100}/>
    </CardContent>
  </Card>
}


export default PrincipleCard;