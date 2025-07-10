import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET: Fetch all meals
export async function GET() {
  try {
    const meals = await prisma.meal.findMany();
    return Response.json(meals);
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch meals' }), {
      status: 500,
    });
  }
}

// POST: Add a new meal
export async function POST(req: Request) {
  try {
    const { userId, food, calories } = await req.json();
    const meal = await prisma.meal.create({
      data: { userId, food, calories },
    });
    return Response.json(meal);
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to create meal' }), {
      status: 500,
    });
  }
}