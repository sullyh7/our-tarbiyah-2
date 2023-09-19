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
import SignUpForm from '../form/SignupForm';


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
    
        <SignUpForm type='student'/> 


      </DialogContent>
    </Dialog>
  );
};

export default SignupStudentModal;
