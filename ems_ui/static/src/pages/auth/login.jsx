import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { FormControl, GLogin, SubmitBtn, FormTag, Bred } from "./styled";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { ApiPostService } from "../../api/api-services";

const Login = ({ toggle }) => {
    let history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const [data, setData] = useState({ rollno: "", password: "" });
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const login = async () => {
        let res = await ApiPostService("/api/auth/", data);
        console.log(data);
        if (res.valid) {
            localStorage.setItem("token", res.token);
            history.push("/studentHome");
        } else {
            setErr("Rollno or Password Incorrect");
        }
    };

    return (
        <>
            <FormTag onSubmit={() => console.log("done")}>
                <h1>Student Login</h1>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <FormControl
                        className="px-3"
                        type="number"
                        placeholder=" Enter rollno"
                        required
                        value={data.rollno}
                        onChange={handleChange}
                        name="rollno"
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
                <p style={{ color: "#fff" }}>{err}</p>
            </div>

            <div className="d-flex justify-content-center mt-5">
                <button
                    style={{ color: Bred, border: "none", background: "none" }}
                    onClick={() => toggle(false)}
                >
                    <span className="text-muted">
                        You must be a student of{" "}
                    </span>
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
