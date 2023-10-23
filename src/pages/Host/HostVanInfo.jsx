import { useOutletContext } from "react-router-dom"

const HostVanInfo = () => {
    const { vanDetails } = useOutletContext()

    return ( 
        <div className="info-host-single">
            <span><b>Name:</b> {vanDetails.name}</span>
            <span><b>category:</b> {vanDetails.type}</span>
            <p><b>Description: </b>{vanDetails.description}</p>
            <span><b>Visibility:</b> Public</span>
        </div>
     )
}
 
export default HostVanInfo