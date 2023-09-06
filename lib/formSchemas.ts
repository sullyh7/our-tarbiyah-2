import * as z from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({
      message: "Email input must be a valid email.",
    }),
    password: z.string().min(8, {
      message: "Password must be minimum 8 characters."
    })
})

export const signUpFormSchema = z.object({
    firstname: z.string().min(1, { message: 'First name must not be empty' }),
    lastname: z.string().min(1, {message: "Last name must not be empty."}).max(50),
    dateOfBirth: z.date().max(new Date('2013-01-01'), {
      message: 'You must be at least 8 to join us.',
    }),
    phone: z
      .string()
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
    email: z.string().email(),
    gender: z.enum(["male", "female"], {required_error: "Gender is required"}),
    password: z.string().min(8, {
      message: 'Password must be 8 characters minimum.',
    }),
  });

export const tutorSignupFormSchema = z.object({
    firstname: z.string().nonempty({message: "First name cannot be empty"}),
    lastname: z.string().nonempty({message: "Last name cannot be empty."}),
    dateOfBirth: z.date().max(new Date("2005-01-01"), {message: "You must be 18 or older"}),
  
    gender: z.enum(["male", "female"]),
    email: z.string().email(),
    phone: z.string(), // TODO add phone validation
    password: z.string(),
    
    dbs: z.string().nonempty({message: "DBS is required."}),
    cv: z.string().nonempty({message: "CV is required."}),
  
    qualifications: z.array(z.string()).nonempty({message: "You need at least one qualification."})
    
  
  });
  