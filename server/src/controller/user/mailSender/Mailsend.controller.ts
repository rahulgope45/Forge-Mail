import type { Request, Response } from 'express'
import { prisma } from "../../../lib/prisma.js";
import { createMailJob } from '../../../worker/Mailsend.producer.js';
import { validateMailSendRequest, type MailSendRequestBody } from '../../../services/MailSend.validation.js';
import { MailJobStatus } from '@prisma/client';

interface AuthenticatedRequest extends Request {
    user: { id: string };
}

const VALID_STATUSES: MailJobStatus[] = ["PENDING","FAILED_PERMANENT","FAILED_RETRYABLE","SENT"]



export const sendMail = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const payload = req.body as Partial<MailSendRequestBody>;

        const validation = validateMailSendRequest(payload);
        if (!validation.valid) {
            return res.status(400).json({
                message: validation.error
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                googleRefreshToken: true
            }
        });

        if (!user?.googleRefreshToken) {
            return res.status(403).json({
                message: "Google account not connected. Please connect your Google account before sending mail."
            });
        }

        const { jobIds } = await createMailJob({
            userId,
            to: payload.to!,
            subject: payload.subject!,
            body: payload.body!,
            sendAt: payload.sendAt,
        })

        return res.status(200).json({
            message: "Mail job(s) queued successfully",
            jobIds
        })
    } catch (error) {
        console.error("sendMail controller error:", error);
        return res.status(500).json({ error: "Failed to queue mail job(s)" });
    }
}

// =========== mail-jobs ========

export const getMailJobs = async (req:Request,res:Response)=>{
 try {
    const userId = (req as AuthenticatedRequest).user.id;

    const page = Math.max(1,parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(50,Math.max(1,parseInt(req.query.pageSize as string) || 20));

    const statusParam = req.query.status as string | undefined;
    const status = VALID_STATUSES.includes(statusParam as MailJobStatus)
      ? (statusParam as MailJobStatus)
      : undefined;

    const where = { userId, ...(status ? { status } : {}) };

    const [jobs, total] = await Promise.all([
      prisma.mailJob.findMany({
        where,
        select: {
          id: true,
          to: true,
          subject: true,
          status: true,
          createdAt: true,
          scheduledFor: true,
          sentAt: true,
          errorReason: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.mailJob.count({ where }),
    ]);

    return res.status(200).json({
      jobs,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
 } catch (error) {
     console.error("getMailJobs controller error:", error);
    return res.status(500).json({ error: "Failed to fetch mail jobs" });
    
 }
}