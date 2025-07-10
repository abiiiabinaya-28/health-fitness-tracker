import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, type, duration } = await req.json();
  const workout = await prisma.workout.create({
    data: { userId, type, duration },
  });
  return Response.json(workout);
}

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany();
    return Response.json(workouts);
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch workouts' }), {
      status: 500,
    });
  }
}