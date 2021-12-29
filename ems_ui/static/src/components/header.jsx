import React from "react";
import "../assets/css/style.css";
import { Link } from "react-router-dom";
const Header = ({ current }) => {
    return (
        <>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="logo">
                        <Link to="/studentHome" href="/">
                            EMSs
                        </Link>
                    </h1>

                    <a href="index.html" className="logo">
                        <img
                            src="assets/img/logo.png"
                            alt=""
                            className="img-fluid"
                        />
                    </a>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li>
                                <Link
                                    to="/studentHome"
                                    className={`nav-link scrollto ${
                                        current === "dashboard" && "active"
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {/* <li><a className="nav-link scrollto" href="/">Circular</a></li> */}
                            <li>
                                <Link
                                    className={`nav-link scrollto ${
                                        current === "enroll" && "active"
                                    }`}
                                    to="/enrollment"
                                >
                                    Enrollment
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link scrollto ${
                                        current === "mark" && "active"
                                    }`}
                                    to="/mark"
                                >
                                    Attendance {"&"} Marks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link scrollto ${
                                        current === "fee" && "active"
                                    }`}
                                    to="/fee"
                                >
                                    Examination Fee
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link scrollto ${
                                        current === "result" && "active"
                                    }`}
                                    to="#contact"
                                >
                                    Academic Result
                                </Link>
                            </li>
                            <li>
                                <Link className="getstarted scrollto" to="/">
                                    Log out
                                </Link>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
        </>
    );
};
export default Header;
