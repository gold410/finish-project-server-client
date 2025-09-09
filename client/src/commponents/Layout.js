import Navigation from "./Navigation"
import{Outlet} from 'react-router-dom'

const Layout=()=>{

    return <div style={{ padding: "1rem", color: "red", font:"status-bar"}}>
   <Navigation/>
    <Outlet/>
    </div>

}
export default Layout