import { tutorSignupFormSchema } from "@/lib/formSchemas";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import * as z from "zod";
import { cookies } from "next/headers";

export const signUpTutor = (values: z.infer<typeof tutorSignupFormSchema>) => {
    const supabase = createServerComponentClient({ cookies })
    supabase.auth.signUp({
        email: values.email,
        password: values.password,
    });
    
}