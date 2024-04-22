import { NavLink } from 'react-router-dom';


export default function Navbar() {

    const userRole = localStorage.getItem("role");

    function logout() {
        localStorage.clear();
        window.location.href = "/";
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1A237E' }}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to={"/"} className="nav-link">Home</NavLink>
                    </li>

                    {userRole && <li className="nav-item">
                        <NavLink className="nav-link " to={"/brands"} >Brands</NavLink>
                    </li>}

                   

                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/category"} >Categories</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/product"} >Products</NavLink>
                    </li>

                    {userRole && userRole === "ROLE_STAFF" && <li className="nav-item">
                        <NavLink className="nav-link " to={"/review"} >Reviews</NavLink>
                    </li>
                    }

                    {userRole && userRole === "ROLE_STAFF" &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/customer"} >Customers</NavLink>
                    </li>
                    }

                    {userRole && userRole === "ROLE_STAFF" &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/staff"} >Staff</NavLink>
                    </li>
                    }

                    {userRole && userRole === "ROLE_CUSTOMER" &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/order/create"} >Cart</NavLink>
                    </li>
                    }

                    {userRole && userRole === "ROLE_STAFF" &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/orders"} >Orders</NavLink>
                    </li>
                    }    

                    {userRole && userRole === "ROLE_STAFF" &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/payments"} >Payments</NavLink>
                    </li>
                    }    

                    {!userRole &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/login"} >Login</NavLink>
                    </li>
                    }

                    {!userRole &&
                    <li className="nav-item">
                        <NavLink className="nav-link " to={"/register"} >Register</NavLink>
                    </li>
                    }

                    {userRole &&
                    <li className="nav-item">
                        <span className="nav-link" onClick={logout}>Logout</span>
                    </li>
                    }
                </ul>
            </div>
        </nav>
    )
}