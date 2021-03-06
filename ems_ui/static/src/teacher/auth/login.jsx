import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { FormControl, SubmitBtn, FormTag, Bred } from "./styled";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ApiPostService } from "../../api/api-services";

const Login = ({ toggle }) => {
    let history = useHistory();

    const [data, setData] = useState({ faculty_no: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const login = async () => {
        let res = await ApiPostService("/api/auth/faculty/", data);
        if (res.valid) {
            localStorage.setItem("Fac_token", res.token);
            history.push("/staff");
        }
    };

    return (
        <>
            <FormTag onSubmit={() => console.log("done")}>
                <h1>Teacher Login</h1>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <FormControl
                        className="px-3"
                        type="text"
                        placeholder=" Enter faculty Number"
                        required
                        value={data.faculty_no}
                        onChange={handleChange}
                        name="faculty_no"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPwd">
                    <FormControl
                        type="password"
                        placeholder="Enter password"
                        required
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                        autoComplete="off"
                    />
                </Form.Group>
                {/* <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            id="Remember me"
                            label="Remember Me"
                        />
                    </Col>
                    <Col>Forgot Password</Col>
                </Row> */}
                <SubmitBtn
                    className="form-control mt-4"
                    onClick={login}
                    type="button"
                >
                    Login
                </SubmitBtn>
            </FormTag>

            <div className="d-flex justify-content-center mt-5">
                <button
                    style={{ color: Bred, border: "none", background: "none" }}
                    onClick={() => toggle(false)}
                >
                    <span className="text-muted">You must be a staff of </span>
                    CEG
                </button>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </>
    );
};
export default Login;
