import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { analyticsDataValidationSchema } from 'validationSchema/analytics-data';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.analytics_data
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAnalyticsDataById();
    case 'PUT':
      return updateAnalyticsDataById();
    case 'DELETE':
      return deleteAnalyticsDataById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAnalyticsDataById() {
    const data = await prisma.analytics_data.findFirst(convertQueryToPrismaUtil(req.query, 'analytics_data'));
    return res.status(200).json(data);
  }

  async function updateAnalyticsDataById() {
    await analyticsDataValidationSchema.validate(req.body);
    const data = await prisma.analytics_data.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAnalyticsDataById() {
    const data = await prisma.analytics_data.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}