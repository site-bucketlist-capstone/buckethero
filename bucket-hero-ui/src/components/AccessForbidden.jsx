import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"

export default function AccessForbidden({}) {
   
   return (
      <div className="unauthorized">
        <h2>You must be authenticated to access this page.</h2>
        <Link to="/signin">
        <span>
          Click here to Login 
        </span>
        </Link>
        <Link to="/register">
        <span>
         or here to Register
        </span>
        </Link>
      </div>
    )
}