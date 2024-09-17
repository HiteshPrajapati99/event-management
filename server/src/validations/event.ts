import { z } from "zod";

export const eventSchema = z.object({
    name : z.string({required_error : "Name is required."}),
    description : z.string({required_error : "Description is required."}),
    startDate : z.string({required_error : "startDate is required."}),
    endDate : z.string({required_error : "endDate is required."}),
});

