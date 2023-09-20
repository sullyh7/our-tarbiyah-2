"use client";

import { Database } from '@/lib/database.types';
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { onboardTutorFormSchema } from '@/lib/formSchemas';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';


const OnboardTutor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const supabase = useSupabaseClient<Database>();
    const user = useUser();

    const form = useForm<z.infer<typeof onboardTutorFormSchema>>({
        resolver: zodResolver(onboardTutorFormSchema),
        defaultValues: {
          qualifications: [{qualification: ""}],
        },
      })
      const control = form.control;
      const { fields, append, remove } = useFieldArray({
        control,
        name: "qualifications",
      });

    const { toast } = useToast();
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof onboardTutorFormSchema>) {
        try {
            setLoading(true)
            const fileExtCV = values.cv.name.split('.').pop()
            const cvFilePath = `${user?.id}/cv-${Math.random()}.${fileExtCV}`
            var dbsFilePath = "";

            if (values.dbs) {
              const fileExtDbs = values.dbs?.name.split(".").pop()
              dbsFilePath = `${user?.id}/cv-${Math.random()}.${fileExtDbs}`

              const {error: dbsUploadError} = await supabase.storage
              .from("tutor_files")
              .upload(dbsFilePath, values.dbs);
            
            if (dbsUploadError) {
              throw new Error("Error uploading dbs")
            }
            }

            const {error: cvUploadError} = await supabase.storage
              .from("tutor_files")
              .upload(cvFilePath, values.cv);
            
            if (cvUploadError) {
              throw new Error("Error uploading cv")
            }

            // const {data, error} = supabase;

            const response = await fetch("/api/onboard-tutor", {
                method: "POST", // or 'PUT'
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cv_url: cvFilePath,
                    dbs_url: dbsFilePath,
                    qualifications: values.qualifications,
                }),
            }); 
            if (!response.ok) {
                const json = await response.json();
                console.log(json);
                console.log(response.status)
                throw new Error(response.status.toString())
            }


            toast({
                title: "Tutor form completed!",
                description: "You will get a email once your tutor application has been approved",

            })

            router.refresh()

        } catch (error: any) {
            toast({
                title: "Error with onboarding process",
                variant: "destructive",
            })
        } finally {
            setLoading(false);
        }
        
    }

  return <><div>
  <h1 className='page_header mb-10'>Complete your tutor application.</h1>
    <div className='flex w-full items-center justify-center'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
      <FormField
          control={form.control}
          name="cv" 
          render={({ field }) => (
      <FormItem>
      <FormLabel>
      CV
      </FormLabel>
      <FormControl>
      <Input
        accept=
        'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*'
        type="file"
        onChange={(e) =>
          field.onChange(e.target.files ? e.target.files[0] : null)
        }
      />
    </FormControl>
    <FormMessage />
    </FormItem>
    )}
    />
    <FormField
          control={form.control}
          name="dbs" 
          render={({ field }) => (
      <FormItem>
      <FormLabel>
      DBS
      </FormLabel>
      <FormControl>
      <Input
        accept=
        'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*'
        type="file"
        onChange={(e) =>
          field.onChange(e.target.files ? e.target.files[0] : null)
        }
      />
    </FormControl>
    <FormMessage />
  </FormItem>
    )}
    />

      {/* Array field */}
      <h1 className='subheader'>Enter Qualifications</h1>
      {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`qualifications.${index}.qualification`} // Replace with your actual array field name
            render={({ field }) => (
              <FormItem className=''>
                <FormControl>
                  <Input type='text' placeholder="eg: A level Biology A*" {...field} />
                </FormControl>
                <FormMessage />
                <Button onClick={() => remove(index)}>Remove</Button>
              </FormItem>
            )}
          />
        ))}
        <Button type="button" onClick={() => append({qualification: ""})}>
          Add Item
        </Button>
        <Button disabled={loading || form.formState.isLoading} type="submit">{(loading || form.formState.isLoading) ? "Loading..." : "Submit"}</Button>
      </form>
      </Form>
    </div>
  </div><div/></>
    
    
    
}

export default OnboardTutor