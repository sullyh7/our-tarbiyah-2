"use client";
import * as z from "zod";
import React, { ChangeEvent, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import FormStep from './FormStep';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { CalendarModified } from '../ui/CalendarModified';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tutorSignupFormSchema } from '@/lib/formSchemas';
import { QualificationDto } from "@/constants/dtoTypes";
import { useSupabase } from "@/providers/supabase-provider";
import { toast } from "../ui/use-toast";
import { Database } from "@/lib/database.types";


interface TutorSignupFormProps {
  qualifications: QualificationDto[]
}

const TutorSignupForm = ({ qualifications }: TutorSignupFormProps) => {

    const { supabase } = useSupabase();
    const [dbsFile, setDbsFile] = useState<File>();
    const [cvFile, setCvFile] = useState<File>();


    const totalSteps = 3;

    const form = useForm<z.infer<typeof tutorSignupFormSchema>>({
        resolver: zodResolver(tutorSignupFormSchema),
        defaultValues: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          dateOfBirth: new Date(),
          qualifications: [],
          phone: "",
        },
      });
      

  const [formStep, setFormStep] = React.useState<number>(0);

  const control = form.control;
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace
  } = useFieldArray({
    control,
    name: "qualifications"
  });
  
  var authId;

  async function onSubmit(values: z.infer<typeof tutorSignupFormSchema>) {
    // Submit your form data
    // signUpTutor(values); 
    console.log("Submitting")
    try {
      const {data, error}= await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        console.log(JSON.stringify(error));
        console.log(error.cause)
        throw new Error(error.message)
      }

      authId = data.user?.id;

      const {data: profileData, error: profileError} = await supabase.from("user_profile").insert({
        user_id: authId,
        firstname: values.firstname,
        lastname:  values.lastname,
        date_of_birth: values.dateOfBirth.toISOString(),
        gender: values.gender,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }).select().single();

      if (profileError) {
        console.log(JSON.stringify(profileError));
        throw new Error(profileError.message)
      }

      // upload files

      const { data: cvData, error: cvError } = await supabase.storage
        .from('avatars')
        .upload(`${authId}/cv.pdf`, cvFile || "")

      if (cvError) {
        console.log(JSON.stringify(cvError));
        throw new Error(cvError.message);
      }

      const {data: tutorData, error: tutorError} = await supabase.from("tutor").insert({
        user_id: profileData.id,
        cv_document: cvData.path,
        dbs_document: "test_dbs",
      })

      
      if (tutorError) { 
        console.log(JSON.stringify(tutorError));
        throw new Error(tutorError.message)
      }

      toast({
        title: "User signed up!"
      })
      
    } catch (e) {
      // if (authId) {
      //   supaba
      // }
      toast({
        title: "Error signing up!",
        variant: "destructive",
      })
    } finally {

    }

    alert(values);
    console.log(values);
    setCvFile(undefined);
    setDbsFile(undefined);
    form.reset();
    setFormStep(0);
  }

  const handleDbsFile = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDbsFile(e.target.files[0]);

      if (!file.type.includes("pdf")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);

      console.log(dbsFile?.name)
    }
  }

  const handleCvFile = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCvFile(e.target.files[0]);

      if (!file.type.includes("pdf")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);

    } 
  }

  return <Card className="sm:p-10 p-5 flex-1">
  <CardHeader className="sm:w-full">
    
    <CardTitle className="text-4xl text-primary">Join us. </CardTitle>
    <CardDescription className="text-lg">Enter your details below</CardDescription>
    <Progress value={formStep * 100 / totalSteps} />
  </CardHeader>
  <CardContent>
  <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden text-primary"
              
            >
              <FormStep currentStep={0} step={formStep}>
                {/* name */}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem >
                      <FormLabel className="text-xl">First name</FormLabel>
                      <FormControl>
                        <Input className="" placeholder="Enter your name..." {...field}/>
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
                      <FormLabel className="text-xl">Last name</FormLabel>
                      <FormControl>
                        <Input className="" placeholder="Enter your last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl block'>Date Of Birth</FormLabel>
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
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          
              </FormStep>


              <FormStep currentStep={1} step={formStep}>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xl">Gender</FormLabel>
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

<FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">Email</FormLabel>
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
                      <FormLabel className="text-xl">Phone number</FormLabel>
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
                      <FormLabel className="text-xl">Password</FormLabel>
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


              <FormStep currentStep={2} step={formStep} className="flex-col gap-y-5">
              <h1>Qualifications</h1>
              {fields.map((field, index) => (
                  <div key={index} className="flex items-center">
                      <FormField
                      key={field.id}
                      control={control}
                      name={`qualifications.${index}.qualification`} 
                      render={({ field }) => (
                      <FormItem className="flex items-center">
                          {index}
                          <Input
                          onChange={field.onChange}
                           type="string" placeholder="A level biology"/>
                          <FormMessage />
                          <Button variant={"ghost"} className="" onClick={() => remove(index)}>
                          {index === 0 ? "Remove All" : "Remove"}
                        </Button>
                        </FormItem>
                      )}
                      />
                      
                      
                  </div>
                  ))}
                  <Button type="button" onClick={() => append({qualification: "Qualification"})}>
                    Add new.
                  </Button>

                <FormField
                  control={form.control}
                  name="dbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">DBS Upload</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dbs"
                          onChange={(e) => handleDbsFile(e, field.onChange)}
                          accept=".pdf"
                          type="file"
                        />
                      </FormControl>
                    
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                  control={form.control}
                  name="cv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">CV Upload</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dbs"
                          onChange={(e) => handleCvFile(e, field.onChange)}
                          accept=".pdf"
                          type="file"
                        />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                
              </FormStep>
              <div className="flex gap-2">
                <Button
                disabled={form.formState.isLoading}
                  type="submit"
                  className={cn({
                    hidden: formStep == 0 || formStep == 1,
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
                      form.trigger(["firstname", "lastname", "dateOfBirth"]);
                      const lastNameState = form.getFieldState("lastname");
                      const firstnameState= form.getFieldState("firstname");
                      const dobState = form.getFieldState("dateOfBirth");
                      if (!firstnameState.isDirty || firstnameState.invalid) return;
                      if (!lastNameState.isDirty || lastNameState.invalid) return;
                      if (!dobState.isDirty || dobState.invalid) return;
                      setFormStep(1);

                    } else if (formStep == 1) {
                      form.trigger(["gender", "email", "phone", "password"]);
                      const genderState = form.getFieldState("gender");
                      const emailState = form.getFieldState("email");
                      const phoneState = form.getFieldState("phone");
                      const passwordState = form.getFieldState("password");
                    
                      if (!genderState.isDirty || genderState.invalid) return; 
                      if (!phoneState.isDirty || phoneState.invalid) return; 
                      if (!emailState.isDirty || emailState.invalid) return; 
                      if (!passwordState.isDirty || passwordState.invalid) return;
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

  </CardContent>
</Card> 
}

export default TutorSignupForm