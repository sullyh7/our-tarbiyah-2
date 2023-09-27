import { dateDiffInDays } from '@/lib/utils'
import React from 'react'
import { Badge } from '../ui/badge'

interface ScheduleItemProps {
    description: string,
    date: Date,
    timeStart: string,
    timeEnd: string,
}

const ScheduleItem = ({ description, date, timeStart, timeEnd}: ScheduleItemProps) => {
  return (
    <div className='flex w-full justify-between'>
        <div className='flex flex-col'>
            <h1 className='font-bold text-xl'>{description}</h1>
            <p>{date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}: {timeStart} - {timeEnd}</p>
        </div>
        <Badge className='text-md h-full'>In {dateDiffInDays(new Date(Date.now()), date)} days</Badge>
    </div>
  )
}

export default ScheduleItem