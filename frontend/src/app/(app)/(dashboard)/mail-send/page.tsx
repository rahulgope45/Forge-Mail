'use client'

import React from 'react'
import { useState, FormEvent } from "react";
import { api } from '@/app/lib/api-client';
import { AxiosError } from "axios";



function MailSendPage() {

  const [to, setTo] = useState("");
  const [subject,setSubject] = useState("");
  const [body,setBody] = useState("")
  const [scheduledFor,setScheduledFor] = useState("")
  const [state,setState] = useState()
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex  items-center gap-2'>
        <div className='flex items-center gap-2'>
          <p>To:</p>
        <input className='border p-2' placeholder='Who you want to mail'/>
        </div>
        <div className='flex items-center gap-2'>
          <p>Scheduled At:</p>
        <input className='border p-2' type='datetime-local' placeholder='When'/>
        </div>
      </div>
      <div className='flex flex-col boder  '>
        <input className='border p-2' placeholder='Subject'/>
        <textarea className='border p-2 h-[300px] text-top' placeholder='Body'/>
      </div>
    </div>
  )
}

export default MailSendPage