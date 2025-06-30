import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, food, calories } = await req.json();
  const meal = await prisma.meal.create({
    data: { userId, food, calories },
  });
  return Response.json({ meal });
}
