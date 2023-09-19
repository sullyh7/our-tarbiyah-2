"use client";

import { loginFormSchema } from "@/lib/formSchemas";
import { useDialogStore } from "@/store/LoginModalStore";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, buttonVariants } from "../ui/button";
import { DialogHeader, DialogFooter, DialogContent, Dialog, DialogTitle, DialogDescription } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const { toast } = useToast();
    const router = useRouter();
    const supabase = useSupabaseClient();
    const isOpen = useDialogStore(state => state.isLoginDialogOpen); 
    const closeDialog = useDialogStore(state => state.closeLoginDialog); 
    const openSignUpDialog = useDialogStore(state => state.openSignUpDialog)


  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // login...
    const {data, error} = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) {
      toast({
        title: "Error signing in"
      })
    }
    closeDialog();
    router.refresh();
    
    console.log(values)
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign in</DialogTitle>
        <DialogDescription>
          Enter your credentials below.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className='text-4xl font-bold'>Email</FormLabel> */}
              <FormControl>
                <Input className='' placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>         
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className='text-4xl font-bold'>Password</FormLabel> */}
              <FormControl>
                <Input type='password' className='' placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>         
          )}
        />
        <Button className='w-full' type="submit">Sign in</Button>
      </form>
    </Form>
    <DialogFooter>
      <div className='flex items-center justify-center'>
      <p className={buttonVariants({variant: null})}>Dont have an account? <Button variant={"link"} onClick={() => {openSignUpDialog()}}>Sign up here</Button></p>
      </div>
    </DialogFooter>
    </DialogContent>

  </Dialog>
  )
}

export default LoginModal;