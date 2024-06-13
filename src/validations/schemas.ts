import { User } from "@prisma/client";
import { ZodError, z } from "zod";

type genOmit =  "createdAt" | "updatedAt"
type RegisterDto = Omit<User, genOmit | 'password' | "verificationToken">

export const registerSchema = z.object({
    email: z.string({required_error: 'Email is Required'}).email("Invalid Email"),
    fullName: z.string({required_error: 'Full Name is Required'}).min(3, "Full Name must be at least 3 characters long"),
    password: z.string({required_error: 'Password is Required'}).min(6, "Password must be at least 6 characters long"),
})
registerSchema.required()
// try {
//     // test the schema
//    const parsed = registerSchema.parse({fullName: 'any', password: 'any'})
// } catch (error: any) {
//     const errr: ZodError = error
//     console.log(errr);
    
//     console.log(errr.errors.map((err) => {
//         return `${err.path[0]}: ${err.message}`
//     }).join(", "))
// }