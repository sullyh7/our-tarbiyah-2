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
      .string(), // TODO add phone verification
    email: z.string().email(),
    gender: z.enum(["male", "female"], {required_error: "Gender is required"}),
    password: z.string().min(8, {
      message: 'Password must be 8 characters minimum.',
    }),
  });

export const onboardTutorFormSchema = z.object({
    qualifications: z
      .array(z.object({qualification: z.string().min(10, {message: "Add some more details about your qualifications (10 characters minimum)"})})),
      dbs: z.instanceof(File).optional(),
      cv: z.instanceof(File, {message: "Please upload your cv here"}),
    });

  