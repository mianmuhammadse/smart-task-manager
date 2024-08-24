import * as z from 'zod';

const registerSchema = z.object({
  email: z
  .string({ required_error: 'Email is required' })
  .email({ message: 'Email must be a valid email' }),

  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
})

const loginSchema = registerSchema;

export { registerSchema, loginSchema };
