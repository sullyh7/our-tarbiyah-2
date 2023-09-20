import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import { number } from 'zod'

interface NumberInfoCardProps {
    title: string,
    number: number,
    className?: string
}

interface LessonCardProps {
    date: Date,
    timeStart: string,
    timeEnd: string,
    subject: string,
    className?: string,
}

const NumberInfoCard = ({ title, number, className}: NumberInfoCardProps) => {
    return <Card className={cn("font-extrabold bg-primary text-white", className)}>
  <CardHeader>
    <CardTitle>{number}</CardTitle>
  </CardHeader>
  <CardFooter>
    <p>{title}</p>
  </CardFooter>
</Card>
}

const LessonCard = ({ date, timeStart, timeEnd, subject, className}: LessonCardProps) => {
    return <Card className={cn("", className)}>
  <CardHeader>
    <CardTitle>{date.toString()}</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{timeStart}  - {timeEnd}</p>
  </CardContent>
  <CardFooter>
    {subject}
  </CardFooter>
</Card> 
}

const TutorDashboard = () => {

    const lessonMock: LessonCardProps[] = [
        {
        date: new Date(Date.now()),
        timeStart: "10:00",
        timeEnd: "12:00",
        subject: "Chemistry",
        },
        {
        date: new Date(Date.now()),
        timeStart: "10:00",
        timeEnd: "12:00",
        subject: "Chemistry",
        },
        {
            date: new Date(Date.now()),
            timeStart: "10:00",
            timeEnd: "12:00",
            subject: "Chemistry",
        },
        {
            date: new Date(Date.now()),
            timeStart: "10:00",
            timeEnd: "12:00",
            subject: "Chemistry",
        },
    ]
  return (
    <div className='flex-1'>
        <div className='flex flex-col gap-y-5'>
            <div className='flex w-full justify-evenly'>
                <NumberInfoCard className='flex-1' title='lessons completed' number={0}/>
                <NumberInfoCard className='flex-1' title='lessons upcoming' number={0}/>
                <NumberInfoCard className='flex-1' title='amount paid' number={0}/>
            </div>
            <h1 className='text-2xl font-extrabold'>Upcoming Lessons</h1>
            <ul className='flex flex-col gap-y-3'>{lessonMock.map((lesson, index) => <LessonCard key={index} {...lesson}/>)}</ul>
        </div>
        
    </div>
  )
}

export default TutorDashboard