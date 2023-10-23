import { redirect } from "react-router-dom"

export async function requireAuth (req) {   
    const isLoggedIn = localStorage.getItem("loggedin")
    const path = new URL(req.url).pathname
    if (!isLoggedIn) {
        throw redirect(`/login?redirectTo=${path}&message=You must log in first.`)
    }
}