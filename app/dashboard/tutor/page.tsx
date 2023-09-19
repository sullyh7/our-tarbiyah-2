import OnboardTutor from '@/components/be-a-tutor/OnboardTutor'
import { Database } from '@/lib/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import React from 'react'

const TutorDashboard = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {data: profile} = await supabase.from("profiles").select().single();
    const tutorProfile = await supabase.from("tutor_profile").select().single();

  return (
    profile && (
    profile.onboarded_tutor ?
    <div>
        
    </div>
    :
    <>
    <div className='flex gap-y-10 flex-col justify-center items-center'>
      <OnboardTutor userId={profile.id}/>
      <div></div>
    </div>
    <div></div>
    </>
    
    
    )
)
}

export default TutorDashboard