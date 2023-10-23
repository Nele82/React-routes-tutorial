import { useOutletContext } from "react-router-dom"
    
const HostVanPhotos = () => {
    const { vanDetails } = useOutletContext()
    return ( 
        <img id='photo-host-single' src={`${vanDetails.imageUrl}`} alt={`Photo of: ${vanDetails.name}`} />
     )
}
 
export default HostVanPhotos