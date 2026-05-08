import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const enrollments = await prisma.enrollment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(enrollments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}