import Sidebar from '@/components/dashboard/Sidebar';
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react'
import { cookies } from 'next/headers';
import OnboardTutor from '@/components/be-a-tutor/OnboardTutor';
import RightSidebar from '@/components/dashboard/RightSidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const TutorDashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {data: tutorProfile} = await supabase.from("tutor_profile").select().single();
    const {data: profile} = await supabase.from("profiles").select().single();
    if (!tutorProfile || !profile) {
        return <OnboardTutor />
    }

  return (
        tutorProfile.status === "approved" ?
        <>
            <div className='
            flex
            w-full
            mb-[10rem]
            gap-x-20
            '>
                <Sidebar />
                {children} 
                {/* <RightSidebar/> */}
            </div>
        </>
        :
        (tutorProfile.status == "waiting" ?
        <><div className='page_header text-center'>Tutor Application Awaiting Approval</div> <div></div></>
            
            :
            <>
            <div className='text-center'>Tutor Application Rejected</div>
            <div></div>
            </>
            
        )
        
    )
}

export default TutorDashboardLayout