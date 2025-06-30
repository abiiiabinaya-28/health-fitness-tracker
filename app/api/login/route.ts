import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return Response.json({ error: 'Invalid password' }, { status: 401 });

  return Response.json({ user });
}
