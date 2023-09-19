import { TUTOR_DASHBOARD } from "@/constants/nav"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const supabase = createRouteHandlerClient({ cookies })
    try {

        const data: {qualifications: {qualification: string}[], cv_url: string, dbs_url: string} = await request.json();
        if (!data) {
            return NextResponse.json({message: "Bad Request"}, {status: 405}) 
        }
        const qualificationsList = data.qualifications.map(qualificationObj => qualificationObj.qualification); 

        const{ data: {user: user}} = await supabase.auth.getUser()
        
        if (!user) {
            return NextResponse.json({message: "No user signed in."}, {status: 401})
        }

        const { error } = await supabase.from("tutor_profile").insert({
            id: user.id,
            cv_url: data.cv_url,
            dbs_url: data.dbs_url,
            qualifications: qualificationsList,
        })
        if (error) {throw new Error(error.message);}

        const { error: onBoardError } = await supabase.from("profiles").update({ onboarded_tutor: true })
        .eq("id", user.id)
        if (onBoardError) {
            throw new Error(onBoardError.message)
        }

        return NextResponse.json({message: "Success"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({ message: error?.message || "Unknown error occured" } , { status: 500 })
    }
}