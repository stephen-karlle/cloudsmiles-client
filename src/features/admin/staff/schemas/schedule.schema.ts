import { z } from "zod";

export const ScheduleSchema = z.object({
  day: z.string({
    invalid_type_error: "Day must be a string",
  }).min(1, {message: "Day is required"}),

  start: z.string({
    invalid_type_error: "Start must be a string",
  }).min(1, {message: "Start is required"}),

  end: z.string({
    invalid_type_error: "End must be a string",
  }).min(1, {message: "End is required"}),
})
