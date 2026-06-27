import type{Request,Response}from 'express'
import { prisma } from "../../../lib/prisma.js";
import { createMailJob } from '../../../worker/Mailsend.producer.js';
import { validateMailSendRequest, type MailSendRequestBody } from '../../../services/MailSend.validation.js';


