import { Suspense, useState } from "react"
import { Await, Link, defer, useLoaderData, useSearchParams } from "react-router-dom"
import { getVans } from "../api"

export function loader () {
    return defer({vans: getVans()})
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()   
    
    const typeFilter = searchParams.get('type')

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElements(vans){
        const filteredElements = typeFilter ? vans.filter(el => el.type === typeFilter) : vans

        const vanElements = filteredElements.map(van => (
            <div key={van.id} className="van-tile">
                <Link to={van.id} state={searchParams.toString()}>
                    <img src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))
        return (  
            <>
                <h1>Explore our van options</h1>
                <div className="filter-links">
                    <button 
                        id={typeFilter == 'simple' ? 'van-simple-selected' : 'van-simple'}
                        onClick={()=> handleFilterChange("type", "simple")}>Simple</button>
                    <button 
                        id={typeFilter == 'luxury' ? 'van-luxury-selected' : 'van-luxury'}
                        onClick={()=> handleFilterChange("type", "luxury")}>Luxury</button>
                    <button 
                        id={typeFilter == 'rugged' ? 'van-rugged-selected' : 'van-rugged'}
                        onClick={()=> handleFilterChange("type", "rugged")}>Rugged</button>
                    {typeFilter && <button id='van-clear' onClick={()=> handleFilterChange("type", null)}>Clear filter</button>}
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>   
        )
    }

    return (        
        <div className="van-list-container">
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </Suspense>
        </div>
    )
}