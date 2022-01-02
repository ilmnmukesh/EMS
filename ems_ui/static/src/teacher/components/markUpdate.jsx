import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Table } from "react-bootstrap";
import Header from "./header";
import { FaEdit, FaSave } from "react-icons/fa";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { ApiGetService, ApiPostService } from "../../api/api-services";

const Input = styled.input`
    width: 7rem;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const MarkUpdate = () => {
    const { pathname } = useLocation();
    const cl_id = pathname.substring(pathname.lastIndexOf("/") + 1);
    const [students, setStudents] = useState([]);

    const handleChange = (e, index) => {
        let { name, value } = e.target;
        console.log(name);
        if (value.length > 1 && value[0] == 0) value = value.substring(1);
        if (parseInt(value) > 100) return;
        let temp = students;
        temp[index][`${name}`] = parseInt(value);
        setStudents([...temp]);
    };
    useEffect(() => {
        const getStudents = async () => {
            let res = await ApiGetService(
                "/api/faculty/students/" + cl_id + "/"
            );
            setStudents(res);
        };
        getStudents();
    }, []);
    function grade(m) {
        return m >= 90
            ? "O"
            : m >= 80
            ? "A+"
            : m >= 70
            ? "A"
            : m >= 60
            ? "B"
            : m >= 50
            ? "C"
            : "RA";
    }
    const onSave = async () => {
        let data = students;
        data.map((e, index) => {
            let att = (parseInt(e.att_1) + parseInt(e.att_2)) / 2;
            let ass = (parseInt(e.int_1) + parseInt(e.int_2)) / 2;
            let internal = att / 10 + ass * 0.4;
            let total = internal + parseInt(e.external_marks) / 2;
            e.attendance = parseInt(att);
            e.internal_marks = parseInt(internal);
            e.grade = grade(total);
        });
        let res = await ApiPostService(
            "/api/faculty/students/update/all/",
            data
        );
    };
    return (
        <>
            <Header current="mark" />

            <div style={{ fontSize: "1em" }}>
                <Breadcrumb className="mx-5">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        View Marks & Update Marks
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Table striped bordered hover>
                <thead style={{ fontSize: "1em" }}>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>RollNo.</th>
                        <th>Att 1</th>
                        <th>Att 2</th>
                        <th>Asses 1</th>
                        <th>Asses 2</th>
                        <th>Internal</th>
                        <th>External</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((e, index) => {
                        let att = (parseInt(e.att_1) + parseInt(e.att_2)) / 2;
                        let ass = (parseInt(e.int_1) + parseInt(e.int_2)) / 2;
                        let internal = parseFloat(att / 10 + ass * 0.4).toFixed(
                            2
                        );
                        let total = parseFloat(
                            internal + parseInt(e.external_marks) / 2
                        ).toFixed(2);

                        return (
                            <tr style={{ fontSize: "1em" }} key={e}>
                                <td>{index + 1}</td>
                                <td>{e.std_name}</td>
                                <td style={{ width: "1em" }}>{e.rollno}</td>
                                <td>
                                    <Input
                                        type="number"
                                        value={e.att_1 ? e.att_1 : "0"}
                                        onChange={(g) => handleChange(g, index)}
                                        name="att_1"
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={e.att_2 ? e.att_2 : 0}
                                        onChange={(g) => handleChange(g, index)}
                                        max={100}
                                        name="att_2"
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={e.int_1 ? e.int_1 : 0}
                                        onChange={(g) => handleChange(g, index)}
                                        max={100}
                                        name="int_1"
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={e.int_2 ? e.int_2 : 0}
                                        onChange={(g) => handleChange(g, index)}
                                        max={100}
                                        name="int_2"
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={internal ? internal : 0}
                                        name="internal_marks"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="number"
                                        value={
                                            e.external_marks
                                                ? e.external_marks
                                                : 0
                                        }
                                        onChange={(g) => handleChange(g, index)}
                                        max={100}
                                        name="external_marks"
                                    />
                                </td>
                                <td>{total ? total : 0}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                }}
            >
                <Button
                    variant="success"
                    style={{
                        borderRadius: ".5em",
                        fontSize: "1.5em",
                        alignSelf: "center",
                    }}
                    onClick={onSave}
                >
                    Save
                    <FaSave className="mx-2" />
                </Button>
            </div>
        </>
    );
};
export default MarkUpdate;
