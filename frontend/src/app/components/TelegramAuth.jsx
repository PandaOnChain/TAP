"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const TelegramAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        const checkAuth = async () => {
            const response = await fetch('/api/session')
            if (response.ok) {
                setIsAuthenticated(true)
            }
        }
        checkAuth()
    },[])

    

    const authenticateUser = async () => {
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData

        if (initData){
            try {
                const response = await fetch('/api/auth', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({initData}),
                })
                if (response.ok){
                    setIsAuthenticated(true)
                    router.refresh()
                } else {
                    console.error('Authentication failed')
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error("Error during authentication", error)
                setIsAuthenticated(false)
            
            }
        }
    }

    return (
        <div className="flex flex-col items-center p-5">
            {isAuthenticated ? (
                <>
                <p className="text-lg">Authenticated suka</p>
                <button className="bg-blue-500 hover:bg-blue-700" onClick={()=>router.push("/protected")}>
                    Access Protected Page
                </button>
                </>
            ):(
                <>
                    <p className="text-red">You have to be the owner of the account</p>
                    <button className="bg-gray-500 hover:bg-gray-700" onClick={authenticateUser}>
                        Authenticate
                    </button>
                </>
            )}
        </div>
    )

}

export default TelegramAuth