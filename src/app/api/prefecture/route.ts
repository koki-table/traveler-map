import { db } from "@/lib/db"
import { z } from "zod"

const postCreateSchema = z.object({
    name: z.string(),
}) 

export async function POST(req: Request) {
    try {
      const json = await req.json()
      const body = postCreateSchema.parse(json)
  
      const post = await db.prefecture.create({
        data: {
            name: body.name
        },
        select: {
          id: true,
        },
      })
  
      return new Response(JSON.stringify(post))
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
      return new Response(null, { status: 500 })
    }
  }