import React from 'react';
import { Breadcrumb, Button, Table } from 'react-bootstrap';
import Header from './header';
import { FaEdit, FaSave } from 'react-icons/fa'
const MarkUpdate = () => {
    let sam = [...Array(38).keys()]
    return (
        <>
            <Header current="mark" />
            <div style={{ fontSize: '1.5em' }}>
                <Breadcrumb className="mx-5">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>View Marks & Update Marks</Breadcrumb.Item>
                </Breadcrumb>

            
            </div>
            <Table striped bordered hover >
                <thead style={{ fontSize: '1.5em' }}>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>RollNo.</th>
                        <th>Attendance(%)</th>
                        <th>Asses 1</th>
                        <th>Assess 2</th>
                        <th>End sem</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        sam.map(e => (
                            <tr style={{ fontSize: '1.35em' }} key={e}>
                                <td>{e + 1}</td>
                                <td>Mark</td>
                                <td>
                                    20192020
                                    {
                                        String(e).length == 1 ?
                                            e === 9 ? e + 1 : "0" + eval(e + 1)
                                            : eval(e + 1)}
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                                <td>@total</td>
                                <td>
                                    <Button variant="warning" style={{ borderRadius: '.5em', fontSize: '.9em' }}>
                                        Edit
                                        <FaEdit className="mx-2" />
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="success" style={{ borderRadius: '.5em', fontSize: '.9em' }}>Save
                                        <FaSave className="mx-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}
export default MarkUpdate;