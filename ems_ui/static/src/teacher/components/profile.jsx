import React, { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Header from "./header";
import img1 from "../../assets/img/teacher.jpg";
import { ApiGetService } from "../../api/api-services";
const Profile = () => {
    const [details, setDetails] = useState({});
    useEffect(() => {
        const getDetails = async () => {
            let res = await ApiGetService("/api/faculty/details/");
            console.log(res);
            setDetails(res);
        };
        getDetails();
    }, []);
    return (
        <>
            <Header current="profile" />
            <Container>
                <Row>
                    <Col
                        xs={3}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <Image src={img1} alt=".." height={200} width={200} />
                        <h1>{details?.f_name} </h1>
                    </Col>
                    <Col className="mt-5">
                        <h1 className="mt-5">Staff information</h1>
                        <div className="mt-5">
                            <b style={{ width: "4em" }}>Designation :</b>
                            <span className="h4 mx-5">
                                {details.f_designation}
                            </span>
                        </div>
                        <div className="mt-5">
                            <b style={{ width: "4em" }}>Department :</b>
                            <span className="h4 mx-5">{details?.dep_name}</span>
                        </div>
                        <div className="mt-5">
                            <b style={{ width: "4em" }}>Specilization :</b>
                            <span className="h4 mx-5">
                                Computer Application
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Profile;
