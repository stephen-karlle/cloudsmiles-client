import { z } from 'zod';


export const ContextSchema = z.object({
  _id: z.string().optional(),
  
  contextType: z.string({
    "required_error": "Type must be at least 10 characters long" 
  }).min(3, { message: "Type must be at least 10 characters long" }),

  contextLabel: z.string({
    "required_error": "Label must be at least 10 characters long" 
  })
  .min(3, { message: "Label must be at least 10 characters long" }),
  // 

  contextCategory: z.string({
    "required_error": "Label must be at least 3 characters long" 
  })
  .min(3, { message: "Category must be at least 3 characters long" }),
  
  contextData: z.string({
    "required_error": "Label must be at least 50 characters long" 
  })
  .min(50, { message: "Data must be at least 50 characters long" }),


});