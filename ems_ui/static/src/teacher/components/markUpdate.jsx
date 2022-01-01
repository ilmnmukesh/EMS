import React from "react";
import { Breadcrumb, Button, Table } from "react-bootstrap";
import Header from "./header";
import { FaEdit, FaSave } from "react-icons/fa";
import styled from "styled-components";

const Input = styled.input`
    width: 7rem;
`;
const MarkUpdate = () => {
    let sam = [...Array(38).keys()];
    const [mark, setMark] = useState([])
    useEffect(() => {
        getMarks()
    }, [])
    async function getMarks(){

    }
    const onSave=async(e)=>{

        // getMarks()
    // let t=mark;
    // t[i].e;
    // setMarks(t)
    }
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
                    {sam.map((e) => (
                        <tr style={{ fontSize: "1em" }} key={e}>
                            <td>{e + 1}</td>
                            <td>Mark</td>
                            <td style={{ width: "1em" }}>
                                20192020
                                {String(e).length == 1
                                    ? e === 9
                                        ? e + 1
                                        : "0" + eval(e + 1)
                                    : eval(e + 1)}
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>
                                <Input type="number" />
                            </td>
                            <td>@total</td>
                            {/* <td>
                                <Button
                                    variant="warning"
                                    style={{
                                        borderRadius: ".5em",
                                        fontSize: ".9em",
                                    }}
                                >
                                    Edit
                                    <FaEdit className="mx-2" />
                                </Button>
                            </td> */}
                            <td>
                                <Button
                                    variant="success"
                                    style={{
                                        borderRadius: ".5em",
                                        fontSize: ".9em",
                                    }}
                                >
                                    Save
                                    <FaSave className="mx-2" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};
export default MarkUpdate;
