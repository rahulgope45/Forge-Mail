
'use client'

import Link from "next/link";
import { useRouter } from "next/router";



export default function GetStartedButton() {
  return(
  <Link href={"/dashboard"} className="border p-2 rounded-[10px] hover:bg-amber-200">
    <button>
      Get Started
    </button>
  </Link>
  )
}