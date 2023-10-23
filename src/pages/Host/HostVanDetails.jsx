import { Await, Link, NavLink, Outlet, defer, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import { Suspense } from "react"

export async function loader({ params, request }) {
    await requireAuth(request)
    return defer({hostVansData: getHostVans(params.id)})
}

const HostVanDetails = () => {
    const vanDetailsPromise = useLoaderData()
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return ( 
        <div className="host-van-details">
            <Suspense fallback={<h2>Loading van details...</h2>}>
                <Await resolve={vanDetailsPromise.hostVansData}>
                    {vanDetails => (
                        <>
                            <Link to='..' relative='path'>&#8592; Back to all vans</Link>
                            <div className="host-van-box">                
                                <div className="box-info">
                                    <img src={vanDetails.imageUrl} alt={`Image of: ${vanDetails.name}`} />
                                    <div className="sub-box">
                                        <span className={vanDetails.type}>{vanDetails.type}</span>
                                        <h2>{vanDetails.name}</h2>
                                        <p>{`$${vanDetails.price}/day`}</p>
                                    </div>
                                </div>
                                <nav className="host-van-info-links">
                                    <NavLink to='.' end style={({ isActive }) => isActive ? activeStyles : null}>Details</NavLink>
                                    <NavLink to='pricing' style={({ isActive }) => isActive ? activeStyles : null}>Pricing</NavLink>
                                    <NavLink to='photos' style={({ isActive }) => isActive ? activeStyles : null}>Photos</NavLink>
                                </nav>
                                <Outlet context={{ vanDetails }}/>
                            </div>
                        </>
                    )}
                </Await>
            </Suspense>
        </div>
     )
}
 
export default HostVanDetails