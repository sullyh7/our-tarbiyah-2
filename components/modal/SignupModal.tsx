"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Updated button import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useDialogStore } from '@/store/LoginModalStore';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema } from '@/lib/formSchemas';
import * as z from "zod";
import FormStep from '../form/FormStep';
import { ArrowRight, CalendarIcon } from 'lucide-react';
import { CalendarModified } from '../ui/CalendarModified';


const SignupStudentModal: React.FC = () => {
  const isOpen = useDialogStore((state) => state.isSignUpDialogOpen);
  const closeDialog = useDialogStore((state) => state.closeSignUpDialog);
  const openLoginDialog = useDialogStore((state) => state.openLoginDialog);
  const { toast } = useToast();

  const [formStep, setFormStep] = useState(0)

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      // firstname: "",
      // lastname: "",
      // dateOfBirth: new Date("2005-01-1"),
      // phone: "",
      // email: "",
      // gender: "male",
      // password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    // Submit your form data
    toast({
      title: "Form submitted successfully",
      description: "Check your email for confirmation!"
    })
    setFormStep(0);
    console.log(values);
    closeDialog(); // Close the dialog after successful submission
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign up as a student {formStep + 1} / 3</DialogTitle>
          <DialogDescription>Enter your credentials below.</DialogDescription>
        </DialogHeader>
    
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


      </DialogContent>
    </Dialog>
  );
};

export default SignupStudentModal;
