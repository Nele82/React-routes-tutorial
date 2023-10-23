import { Await, Link, defer, useLoaderData, useLocation } from "react-router-dom"
import { getVans } from "../api"
import { Suspense } from "react"

export function loader({ params }){
    return defer({vanDetails: getVans(params.id)})
}

function renderVanDetails(van){
    return(
        <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price"><span>${van.price}</span>/day</p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
        </div>
    )
}

const VanDetails = () => {
    const location = useLocation().state
    const van = useLoaderData()

    return ( 
        <div className="van-detail-container">
            <Link 
                to={location ? `..?${location}` : '..'} 
                relative='path'>&#8592; {location ? <span>Back to "<span className="cap"
                >
                {`${location.split('=')[1]}`}</span>" vans</span> : `Back to all vans`}
            </Link>
            <Suspense fallback={<h2>Loading van details...</h2>}>
                <Await resolve={van.vanDetails}>
                    {renderVanDetails}
                </Await>
            </Suspense>
        </div>
     )
}
 
export default VanDetails