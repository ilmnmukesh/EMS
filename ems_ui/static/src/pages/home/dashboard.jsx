import React, { useEffect, useState } from "react";
import "../../assets/css/custom.css";
import { ApiGetService } from "../../api/api-services";
const Dashboard = () => {
    const [Enroll, setEnroll] = useState([]);
    const [DropCourse, setDropCourse] = useState([]);
    const [AddCourse, setAddCourse] = useState([]);
    const [MockTable, setMockTable] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let res = await ApiGetService("/api/dashboard/");
            setEnroll(res?.instructions[0]?.contents);
            setDropCourse(res?.instructions[1]?.contents);
            setAddCourse(res?.instructions[2]?.contents);
            setMockTable(res?.circular);
            console.log(res);
        };
        getData();
    }, []);

    const instr = Enroll.map((i) => <li>{i.content}</li>);

    const dropCrse = DropCourse.map((i) => <li>{i.content}</li>);

    const AddCrse = AddCourse.map((i) => <li>{i.content}</li>);

    const MockCircular = MockTable.map((i) => (
        <tr>
            <td className="col-md-6">
                {i.description}
                <img
                    src="https://acoe.annauniv.edu/sems/assests/img/new.gif"
                    width="40"
                    height="30"
                    border="0"
                />
            </td>

            <td className="col-md-6">
                <font color="green">{i.download}</font>{" "}
                <img
                    src="https://acoe.annauniv.edu/sems/assests/img/new.gif"
                    width="40"
                    height="30"
                    border="0"
                />
            </td>
            <td className="col-md-6">
                <a className="level" href={i.link} target="_blank">
                    Click Here
                </a>
            </td>
        </tr>
    ));

    return (
        <>
            <div className="hold-transition skin-blue sidebar-mini sidebar-collapse">
                <div>
                    <section
                        className="content"
                        style={{ marginRight: "-22rem" }}
                    >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">
                                            Instructions
                                        </h3>
                                        <div className="box-tools pull-right">
                                            <button
                                                className="btn btn-box-tool"
                                                data-widget="collapse"
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <b style={{ fontSize: "20px" }}>
                                            Important Note: Kindly refer the
                                            timetable link before the enrollment
                                            process for the subject code during
                                            enrollment of other branch courses
                                            in step 3.
                                        </b>
                                        <br />
                                        <b> Step 1 - Enrollment </b>
                                        <ul className="ulx">{instr}</ul>
                                        <b> Step 2 - Drop Course</b>
                                        <ul className="ulx">{dropCrse}</ul>
                                        <b>
                                            {" "}
                                            Step 3 - Add other Course/Reaapear
                                        </b>
                                        <ul className="ulx">{AddCrse}</ul>
                                        <b>
                                            {" "}
                                            Note: Read Carefully before proceed
                                            to enrollment
                                        </b>
                                        <ul className="ulx">
                                            <li>
                                                Before you choose the other
                                                department courses, kindly
                                                ensure the time slot clashes.
                                            </li>
                                            <li>
                                                Tamil/English medium Students
                                                should choose the courses in
                                                their respective medium only.
                                                Kindly check your branch and the
                                                course instructor given the slot
                                                time table page.{" "}
                                            </li>

                                            <li className="text-red">
                                                For students facing issue in
                                                registration contact:
                                                044-22359834
                                            </li>
                                        </ul>
                                        <div>
                                            <a href="https://acoe.annauniv.edu/download_forms/Enrollment/A20/DOS AND DONOTS.pdf">
                                                <font
                                                    style={{ color: "red" }}
                                                    size="4"
                                                >
                                                    <b>
                                                        Do's and Don'ts during
                                                        enrolment (August -
                                                        November - 2020) - Click
                                                        Here.
                                                    </b>
                                                </font>
                                            </a>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-blue">
                                <h4>
                                    <b>Mock Test Link</b>
                                </h4>
                            </div>
                            <div className="col-md-12">
                                <div className="box box-solid">
                                    <div className="box-body">
                                        <table
                                            className="table table-condesned table-bordered table-striped"
                                            id="qp_template_table"
                                        >
                                            <thead>
                                                <tr>
                                                    <th className="col-md-6">
                                                        Description
                                                    </th>
                                                    <th className="col-md-6">
                                                        Download Link
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{MockCircular}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="main-footer">
                    <strong>
                        Copyright &copy; 2021 <a href="#">SEMS</a>.
                    </strong>{" "}
                    All rights reserved.
                </footer>
            </div>
        </>
    );
};
export default Dashboard;
