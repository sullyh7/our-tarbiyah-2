"use client"
import ScheduleItem from '@/components/dashboard/ScheduleItem'
import TutorStat from '@/components/dashboard/TutorStat'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TUTOR_DASHBOARD } from '@/constants/nav'
import { cn } from '@/lib/utils'
import { useUser } from '@supabase/auth-helpers-react'
import { ArrowRight, BrainCircuit, Clock2Icon, Coffee, Moon, StarIcon } from 'lucide-react'
import Link from 'next/link'
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
    description: string,
    className?: string,
}


const TutorDashboard = () => {
  const user = useUser();

    const lessonMock: LessonCardProps[] = [
        {
        date: new Date("2023-09-30"),
        timeStart: "10:00",
        timeEnd: "12:00",
        description: "Chemistry",
        },
        {
          date: new Date("2023-09-30"),
        timeStart: "10:00",
        timeEnd: "12:00",
        description: "Computer Science",
        },
        {
          date: new Date("2023-10-03"),
            timeStart: "10:00",
            timeEnd: "12:00",
            description: "Mathematics",
        },
        {
          date: new Date("2023-10-01"),
            timeStart: "10:00",
            timeEnd: "12:00",
            description: "Biology",
        },
    ]
  return (
    <div className='flex-1'>
      <div className='flex flex-col gap-y-5'>
        <div className='flex items-center gap-x-3'>
          <h1 className='subheader'>
           Assalamualaykum {user?.user_metadata.firstname}
          </h1>
          <Coffee size={30}/>
        </div>
      {/* stats */}
        <div className='flex min-w-full'> 
          <Card className='flex-1'>
            <CardContent className='p-10 flex justify-between'>
              <TutorStat icon={Clock2Icon} text={'20'} footer={'Hours taught'}/>
            </CardContent>
          </Card>
          <Card className='flex-1'>
            <CardContent className=' p-10 flex justify-between'>
            <TutorStat icon={BrainCircuit} text={'2'} footer={'Development courses completed'}/>
            </CardContent>
          </Card>
          <Card className='flex-1'>
            <CardContent className='p-10 flex justify-between'>
            <TutorStat icon={StarIcon} text={'4'} footer={'Out of 5 rating'}/>
            </CardContent>
          </Card>
        </div>
        {/* Salaah */}
        <div>
          <Card>
            <CardContent className='p-10 flex justify-between'>
              <TutorStat icon={Moon} text={'Duhr - صلاة الظهر'} footer={'Current prayer time'}/>
            </CardContent>
          </Card>
        </div>

        {/* schedule */}

        <div className='flex flex-col gap-y-10'>
          <h1 className='subheader'>Upcoming Schedule</h1>
            <div className='flex flex-col gap-y-5'>
              {lessonMock.map((item, index) => <ScheduleItem key={index} {...item}/>)}
            </div>
            <Link 
            className={cn("w-[25%]", buttonVariants({variant: "default"}))}
            href={`${TUTOR_DASHBOARD}/schedule`}>View full schedule<ArrowRight/></Link>
            
        </div>
      </div>  
        
    </div>
  )
}

export default TutorDashboard