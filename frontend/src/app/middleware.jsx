import { NextResponse } from 'next/server'
import React from 'react'

async function middleware (request) {
    if (request.nextUrl.pathname.startsWith('/protected')){
        const session = await getSession()
        console.log("Session:", session)
        if (!session){
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
  return (
    <div>middleware</div>
  )
}

export default middleware