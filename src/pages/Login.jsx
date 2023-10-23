import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
    return new URL(request.url).searchParams.get('message')
}

export async function action ({request}) {
    const formData = await request.formData();
    const email = formData.get('email')
    const password = formData.get('password')    
    const pathname = new URL(request.url).searchParams.get("redirectTo") || '/host'
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", "true") 
        return redirect(pathname)
    } catch (err) {
        return err.message
    }
}

const Login = () => {
    const errorMsg = useActionData()
    const msg = useLoaderData()
    const navigation = useNavigation()

    return ( 
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {errorMsg && <h3 className="red">{errorMsg}</h3>}
            {msg && <h3 className="red">{msg}</h3>}
            <Form 
                method="post" 
                className="login-form" 
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                {navigation.state == 'idle' && <button>Log in</button>}
                {navigation.state == 'submitting' && <button disabled>Logging in...</button>}
            </Form>
        </div>
     )
}
 
export default Login