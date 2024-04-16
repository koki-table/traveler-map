import { db } from '@/lib/db'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { createClient } from '@/utils/supabase/storage'
import { UserResponse } from '@supabase/supabase-js'

const postCreateSchema = z.object({
  file: z.custom<FileList>().transform((file) => file[0]),
  userId: z.number(),
  prefectureId: z.number(),
})

// supabase 初期化 (storage用)
const supabase = createClient()

/**
 * const
 */
const BucketName = 'prefectureImages'

/**
 * @see https://supabase.com/docs/guides/storage/quickstart
 * @see https://supabase.com/docs/guides/storage/uploads/standard-uploads
 */
async function uploadFile(file: File, user: UserResponse) {
  const filePath = generateFilePath(file, user)

  const { error } = await supabase.storage.from(BucketName).upload(filePath, file)
  if (error) {
    return new Response(JSON.stringify(error), { status: 400 })
  } else {
    return filePath
  }
}

function generateFilePath(file: File, user: UserResponse) {
  const filePath = `${user}/${file.name}`
  return filePath
}


export async function POST(req: Request) {
  try {
    // json のバリデーション error投げる
    const json = await req.json()
    const body = postCreateSchema.parse(json)

    // バケット作成
    const { error } = await supabase.storage.createBucket(BucketName)
    if (error) {
      new Response(JSON.stringify(error), { status: 400 })
    }

    const user = await supabase.auth.getUser()

    // storage に保存
    await uploadFile(body.file, user)

    // 画像のURLを取得
    const filePath = generateFilePath(body.file, user)

    // db に保存
    /**
     * @see https://www.prisma.io/docs/orm/prisma-client/type-safety#generated-uncheckedinput-types
     */
    const data: Prisma.PrefectureImageUncheckedCreateInput = {
      imageUrl: filePath,
      contentType: body.file.type,
      fileSize: body.file.size,
      userId: body.userId,
      prefectureId: body.prefectureId,
    }
    const post = await db.prefectureImage.create({
      data,
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
