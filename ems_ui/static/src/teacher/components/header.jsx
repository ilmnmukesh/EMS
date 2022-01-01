import React from "react";
import { Link } from "react-router-dom";

function Header({ current }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    Staff login
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link
                                className={`nav-link scrollto ${
                                    current === "profile" && "active"
                                }`}
                                aria-current="page"
                                to="/staff"
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link scrollto ${
                                    current === "class" && "active"
                                }`}
                                to="/staff/class"
                            >
                                Class
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link scrollto ${
                                    current === "mark" && "active"
                                }`}
                                to="/staff/update"
                            >
                                View & Update marks
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link btn btn-outline-danger mx-5 px-5 scrollto ${
                                    current === "list" && "active"
                                }`}
                                to="/"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
