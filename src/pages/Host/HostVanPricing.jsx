import { useOutletContext } from "react-router-dom"

const HostVanPricing = () => {
    const { vanDetails } = useOutletContext()

    return ( 
        <span className="price-host-single"><b>${vanDetails.price}</b>/day</span>
     )
}
 
export default HostVanPricing
