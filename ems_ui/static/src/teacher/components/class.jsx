import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Header from "./header";
import { ApiGetService } from "../../api/api-services";
import { Link, useHistory } from "react-router-dom";

const ClassSection = () => {
    const history = useHistory;
    const [ClassData, setClassData] = useState([]);
    useEffect(() => {
        const getClassData = async () => {
            let res = await ApiGetService("/api/faculty/class/");
            setClassData(res);
        };
        getClassData();
    }, []);
    const ClassCard = ClassData.map((e) => (
        <Col lg={3} className="mx-5 mt-3 p-3" style={{ fontSize: "1.5em" }}>
            <Card
                className="p-3"
                as={Link}
                to={`update/${e.cl_id}`}
                // onClick={() => history.push("/update")}
            >
                <Card.Title className="mx-3" style={{ fontSize: "1.8em" }}>
                    {e.course_name}
                </Card.Title>
                <Card.Body>
                    <Card.Text>Semester : {e.sems}</Card.Text>
                    <Card.Text>Department : {e.dep_name}</Card.Text>
                    <Card.Text>Branch Name : {e.br_name}</Card.Text>
                    <Card.Text>No of Student : {e.std_cnt}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ));
    return (
        <>
            <Header current="class" />
            <h2 className="mx-4" style={{ fontWeight: "bold" }}>
                Classess UnderTaken
            </h2>
            <div>
                <Row>{ClassCard}</Row>
            </div>
        </>
    );
};
export default ClassSection;
