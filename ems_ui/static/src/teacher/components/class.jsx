import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Header from './header';
import { ClassData } from '../api/class';
const ClassCard = (e) => (
    <Col lg={3} className="mx-5 mt-3 p-3" style={{ fontSize: '1.5em' }}>
        <Card className="p-3">
            <Card.Title className="mx-3" style={{ fontSize: '1.8em' }}>{e.subject}</Card.Title>
            <Card.Body>
                <Card.Text>Semester : {e.sem}</Card.Text>
                <Card.Text>Department : {e.dpmt}</Card.Text>
                <Card.Text>Degree : {e.degree}</Card.Text>
                <Card.Text>No of Student : {e.nos}</Card.Text>
            </Card.Body>
        </Card>
    </Col>
)
const ClassSection = () => {
    return (
        <>
            <Header current="class" />
            <h2 className="mx-4" style={{ fontWeight: 'bold' }}>Classess UnderTaken</h2>
            <div>
                <Row>
                    {
                        ClassData.map(e => ClassCard(e))
                    }
                </Row>
            </div>
        </>
    )
}
export default ClassSection;