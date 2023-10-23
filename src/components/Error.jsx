import { useRouteError } from "react-router-dom"

const Error = () => {
    const error = useRouteError()

    return ( 
        <div className="error-box">
            <h2>Error: {error.message}</h2>
            <span>Status: ({error.status}) {error.statusText}</span>
        </div>
     )
}
 
export default Error