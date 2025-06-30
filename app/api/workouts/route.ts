import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, type, duration } = await req.json();
  const workout = await prisma.workout.create({
    data: { userId, type, duration },
  });
  return Response.json({ workout });
}
