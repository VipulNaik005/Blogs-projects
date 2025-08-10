import {z} from "zod"

export const postSchemaZ = z.object({
    title: z.string().min(1,"A post must have title"),
    markdownContent: z.string().min(1,"A post must have content"),
    author: z.string().default("Admin"),
    createdAt: z.date().default(()=> new Date())
})

export const postUpdateSchema = postSchemaZ.pick({
    title:true,
    markdownContent: true,
    author: true
})

export type Post = z.infer<typeof postSchemaZ>







