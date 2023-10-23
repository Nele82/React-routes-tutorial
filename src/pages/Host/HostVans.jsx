import { Await, Link, defer, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import { Suspense } from "react"

export async function loader({request}){
    await requireAuth(request)
    return defer({hostVans: getHostVans()})
}

const HostVans = () => {
const hostVansPromise = useLoaderData()

    return ( 
        <Suspense fallback={<h2 className="suspense-el">Loading...</h2>}>
            <Await resolve={hostVansPromise.hostVans}>
                {(res)=>{
                    return(
                        <div className="host-vans-page">
                        <h1>Your listed vans</h1>
                            <div className="host-vans">
                            {res.map((hostVan) => (
                                <Link to={hostVan.id} key={hostVan.id} className="single-host-van">
                                    <img src={hostVan.imageUrl} alt={hostVan.name} />
                                    <div className="host-van-info">
                                        <h4>{hostVan.name}</h4>
                                        <span>${hostVan.price}/day</span>
                                    </div>
                                </Link>
                            ))}
                            </div> 
                    </div> 
                    )
                }}  
            </Await>  
        </Suspense>  
     )
}
 
export default HostVans