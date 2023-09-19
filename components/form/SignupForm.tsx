"use client";

import { signUpFormSchema } from '@/lib/formSchemas';
import { cn } from '@/lib/utils';
import { useDialogStore } from '@/store/LoginModalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarModified } from '../ui/CalendarModified';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../ui/form';
import { useToast } from '../ui/use-toast';
import FormStep from './FormStep';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { redirect } from 'next/dist/server/api-utils';
import { DASHBOARD, STUDENT_DASHBOARD, TUTOR_DASHBOARD } from '@/constants/nav';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/database.types';

interface SignUpFormProps {
  type: "tutor" | "student";
}

const SignUpForm = ({ type }: SignUpFormProps) => {

    const supabase = useSupabaseClient<Database>();
    const user = useUser()
    const router = useRouter()
    
    if (user) {
      router.push(`${DASHBOARD}/${type}`)
    }
    const { toast } = useToast();
    const [formStep, setFormStep] = useState(0)
  
    const form = useForm<z.infer<typeof signUpFormSchema>>({
      resolver: zodResolver(signUpFormSchema),
      defaultValues: {
        firstname: "",
        lastname: "",
        dateOfBirth: new Date(),
        phone: "",
        email: "",
        password: "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
      // signupcheck
      const dob = values.dateOfBirth.toLocaleDateString().split("/").join("-");
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
            date_of_birth: dob,
            user_gender: values.gender,
            email: values.email,
            phone: values.phone,
          },
          emailRedirectTo: type === "tutor" ? `localhost:3000/${TUTOR_DASHBOARD}` : `localhost:3000/${STUDENT_DASHBOARD}`
        }
      })

      if (error) {
        toast({
          title: "Error signing up",
          description: JSON.stringify(error),
          variant: "destructive",
        })
        return; 
      }
      // Submit your form data
      toast({
        title: "Form submitted successfully",
        description: "Check your email for confirmation!"
      })
      setFormStep(0);
      console.log(values);
      form.reset();
      router.refresh()
    }

  return (
    <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
            <FormStep step={0} currentStep={formStep}>
                {/* name */}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." {...field}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
              </FormStep>

              <FormStep step={1} currentStep={formStep}>
                {/* name */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='block'>Date Of Birth</FormLabel>
                      <FormControl>
                      <Popover>
                      <PopoverTrigger asChild >
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarModified
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            required
                            fromYear={1960}
                            toYear={2030}
                            captionLayout='dropdown-buttons'
                            
                          />
                        </PopoverContent>
                      </Popover>
                      </FormControl>
                      <FormDescription>
                        Your birthday.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
              </FormStep>


              <FormStep currentStep={formStep} step={2}>
                {/* password */}
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter an email..."
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormDescription>
                        Your or your gaurdians email address<br/> this will be used to login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormDescription>
                        Your or your gaurdians phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a password..."
                          {...field}
                          type="password"/>
                      </FormControl>
                      <FormDescription>
                        This will be used to login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </FormStep>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className={cn({
                    hidden: formStep !== 2,
                  }, "")}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className={cn({
                    hidden: formStep == 2,
                  }, "")}
                  onClick={() => {
                    if (formStep == 0) {
                      form.trigger(["firstname", "lastname"], {shouldFocus: true});
                      const lastNameState = form.getFieldState("lastname");
                      const firstnameState= form.getFieldState("firstname");
                      if (!firstnameState.isDirty || firstnameState.invalid) return;
                      if (!lastNameState.isDirty || lastNameState.invalid) return;
                      setFormStep(1);

                    } else if (formStep == 1) {
                      form.trigger(["gender", "dateOfBirth"]);
                      const genderState = form.getFieldState("gender");
                      const dobState = form.getFieldState("dateOfBirth");
                      
                      if (!dobState.isDirty || dobState.invalid) return; 
                      if (!genderState.isDirty || genderState.invalid) return;
                      setFormStep(2)

                    } 
                  }}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  type="button"
                  
                  onClick={() => {
                    formStep == 1 ?  setFormStep(0) : setFormStep(1);
                  }}
                  className={cn({
                    hidden: formStep == 0,
                  }, "")}
                >
                  Go Back
                </Button>
                <FormMessage />
              </div>
            </form>
          </Form>
  )
}
export default SignUpForm;