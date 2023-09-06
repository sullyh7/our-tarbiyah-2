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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tutorSignupFormSchema } from '@/lib/formSchemas';



const TutorSignupForm = () => {

    const [dbsFile, setDbsFile] = useState<File>();
    const [cvFile, setCvFile] = useState<File>();
    const [qualifications, setQualifications] = useState(new Map<string, string[]>);
    const [chosenQual, setChosenQual] = useState("A level Mathematics");


    const totalSteps = 3;

    const form = useForm<z.infer<typeof tutorSignupFormSchema>>({
        resolver: zodResolver(tutorSignupFormSchema),
        defaultValues: {
          firstname: "",
          lastname: "",

        },
      });

  const [formStep, setFormStep] = React.useState<number>(0);
  

  function onSubmit(values: z.infer<typeof tutorSignupFormSchema>) {
    // Submit your form data
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

      console.log(cvFile?.name)
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


              <FormStep currentStep={2} step={formStep}>
            
              <FormField
                  control={form.control}
                  name="qualifications"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-xl">Highest Relevant Qualification</FormLabel>
                    
                        <Select onValueChange={(val) => {setChosenQual(val)}} defaultValue={""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a qualification" />
                          </SelectTrigger>
                        </FormControl>

                      </Select>

                      
                      <Select onValueChange={field.onChange} defaultValue={""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a grade." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {qualifications.get(chosenQual)?.map( (qual, index) =>
                            <SelectItem key={index} value={qual}>{qual}</SelectItem>
                          )}
                          {/* <SelectItem value="male">Male</SelectItem> */}
                          {/* <SelectItem value="female">Female</SelectItem> */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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