import React from "react";
import { Link } from "react-router-dom";

function Header({ current }) {
    return (
        <nav class='navbar navbar-expand-lg navbar-light bg-red'>
            <div class='container-fluid'>
                <a class='navbar-brand' href='#'>
                    Staff login
                </a>
                <button
                    class='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span class='navbar-toggler-icon'></span>
                </button>
                <div
                    class='collapse navbar-collapse'
                    id='navbarSupportedContent'>
                    <ul class='navbar-nav me-auto mb-2 mb-lg-0 '>
                        <li class='nav-item'>
                            <Link
                                class={`nav-link scrollto ${
                                    current === "profile" && "active"
                                }`}
                                aria-current='page'
                                to='/staff/profile'>
                                Staff Profile
                            </Link>
                        </li>
                        <li class='nav-item'>
                            <Link
                                class={`nav-link scrollto ${
                                    current === "uploadMarks" && "active"
                                }`}
                                to='/staff/uploadmark'>
                                Upload marks
                            </Link>
                        </li>

                        <li class='nav-item'>
                            <Link
                                class={`nav-link scrollto ${
                                    current === "list" && "active"
                                }`}
                                to='/staff/studentlist'>
                                Students marks
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
