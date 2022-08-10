import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"

export default function AccessForbidden({}) {
   
   return (
      <div className="unauthorized text-center p-20 text-lg">
        <h2 className="font-bold text-xl">You must be authenticated to access this page.</h2>
        
        <span>
          Click to <Link to="/signin" className="text-orange-500 underline"> Login</Link> <span> </span>
        </span>
        <span>
         or <Link to="/register" className="text-orange-500 underline">Register</Link>
        </span>
        
      </div>
    )
}