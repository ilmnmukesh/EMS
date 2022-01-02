import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import "../../assets/css/enr.css";
import { ApiGetService, ApiPostService } from "../../api/api-services";
import { Button } from "react-bootstrap";
const Enrollment = () => {
    const [Session, setSession] = useState([]);
    const [Department, setDepartment] = useState([]);
    const [Branch, setBranch] = useState([]);
    const [data, setData] = useState({ semester: 0, dep_id: 0, br_id: 0 });
    const [List, setList] = useState([]);
    const [SessionID, setSessionID] = useState(0);
    const [Stud, setStud] = useState({});
    const [EnrollList, setEnrollList] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: Number(value),
        }));
    };
    useEffect(() => {
        const getSession = async () => {
            let res = await ApiGetService("/api/enroll/basic/");
            setSession(res.session);
            setDepartment(res.department);
        };
        const getBranch = async () => {
            let res = await ApiGetService("/api/branch/get/1/");
            setBranch(res);
        };
        const getStudID = async () => {
            let res = await ApiGetService("/api/student/details/");
            setStud(res);
        };
        getStudID();
        getSession();
        getBranch();
    }, []);

    useEffect(() => {
        const getSubList = async () => {
            let res = await ApiPostService("/api/enroll/list/", data);
            setList(res);
        };
        getSubList();
    }, [data]);

    function addItem(cl_id) {
        const data = {
            std_id: Number(Stud.rollno),
            cl_id: Number(cl_id),
            regulation: 3,
            session: Number(SessionID),
        };
        setEnrollList([data, ...EnrollList]);
        return null;
    }

    const lis = List.map((i) => (
        <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.c_qp_code}</td>
            <td>{i.c_name}</td>
            <td>{i.c_type}</td>
            <td>{i.c_credits}</td>
            <td>{i.f_name}</td>
            <td>{i.f_designation}</td>
            <td>{i.dep_name}</td>
            <td>
                <Button onClick={() => addItem(i.c_id)}> add</Button>
            </td>
        </tr>
    ));

    const sess = Session.map((i) => (
        <option key={i.id} value={i.id}>
            {i.value}
        </option>
    ));

    const dept = Department.map((i) => (
        <option key={i.dep_id} value={i.dep_id}>
            {i.dep_name}
        </option>
    ));

    const brnch = Branch.map((i) => (
        <option key={i.br_id} value={i.br_id}>
            {i.br_name}
        </option>
    ));

    const arr = Array.apply(null, { length: 8 }).map(Number.call, Number);

    const selSem = arr.map((i) => (
        <option key={i} value={i + 1}>
            {i + 1}
        </option>
    ));

    const Enrolling = async () => {
        let res = await ApiPostService("/api/enroll/add/", EnrollList);
        console.log(res);
    };

    return (
        <>
            <Header current="enroll" />
            <div className="container-fluid" style={{ marginTop: "10em" }}>
                <div className="content-wrapper" style={{ marginLeft: "0px" }}>
                    <section className="content-header">
                        <p className="h1">
                            Timetable Slot and Staff Information
                        </p>
                        <ol className="breadcrumb  ">
                            <li>
                                <a href="https://acoe.annauniv.edu/sems/dashboard">
                                    <i className="fa fa-dashboard"></i> Home
                                </a>
                            </li>
                            <li className="active">
                                <a href="#">
                                    <i className="fa fa-calendar"></i> Slot
                                </a>
                            </li>
                        </ol>
                    </section>

                    <section className="content mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="box box-solid">
                                    <div className="box-body">
                                        <select
                                            className="form-control h2"
                                            name="sessions"
                                            id="sessions"
                                            onChange={(e) =>
                                                setSessionID(e.target.value)
                                            }
                                        >
                                            <option value={""}>
                                                {" "}
                                                Select Session
                                            </option>
                                            {sess}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3 pt-3">
                                <div className="box box-primary pt-5">
                                    <div className="box-body no-padding table-responsive">
                                        <form
                                            action="#"
                                            id="slotbr_info"
                                            method="post"
                                            acceptCharset="utf-8"
                                        >
                                            <table
                                                className="table table-bordered table-hover"
                                                style={{ width: "100%" }}
                                            >
                                                <thead>
                                                    <tr>
                                                        <th className="h3">
                                                            Campus
                                                        </th>
                                                        <td>
                                                            <select
                                                                className="form-control input-sm"
                                                                name="campus"
                                                                id="campus"
                                                            >
                                                                <option value="1">
                                                                    COLLEGE OF
                                                                    ENGINEERING
                                                                    GUINDY
                                                                </option>{" "}
                                                            </select>
                                                        </td>
                                                        <th className="h3">
                                                            Department
                                                        </th>
                                                        <td>
                                                            <select
                                                                className="form-control input-sm"
                                                                name="dep_id"
                                                                id="dept"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                <option
                                                                    value={""}
                                                                >
                                                                    {" "}
                                                                    Select
                                                                    Department
                                                                </option>
                                                                {dept}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <thead>
                                                    <tr>
                                                        <th className="h3">
                                                            Branch
                                                        </th>
                                                        <th className="h3">
                                                            Semester
                                                        </th>
                                                        <th className="h3">
                                                            Regulation
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <select
                                                                className="form-control input-sm"
                                                                name="br_id"
                                                                id="branch"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                <option
                                                                    value={""}
                                                                    // disabled
                                                                >
                                                                    {" "}
                                                                    Select
                                                                    Branch
                                                                </option>
                                                                {brnch}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select
                                                                className="form-control input-sm"
                                                                name="semester"
                                                                id="sem"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            >
                                                                <option
                                                                    value={""}
                                                                    // disabled
                                                                >
                                                                    {" "}
                                                                    Select
                                                                    Semester
                                                                </option>
                                                                {selSem}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select
                                                                className="form-control input-sm"
                                                                name="batch"
                                                                id="batch"
                                                            >
                                                                <option
                                                                    value={""}
                                                                >
                                                                    {
                                                                        Stud.regulation
                                                                    }
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Timetable</h3>
                                        <div className="box-tools pull-right">
                                            <button
                                                className="btn btn-box-tool"
                                                data-widget="collapse"
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="box-body no-padding table-responsive">
                                        <table className="table table-bordered table-condensed">
                                            <thead>
                                                <tr className="cell-blue">
                                                    <th>Day / Hour</th>
                                                    <th>1</th>
                                                    <th>2</th>
                                                    <th>3</th>
                                                    <th>4</th>
                                                    <th>5</th>
                                                    <th>6</th>
                                                    <th>7</th>
                                                    <th>8</th>
                                                </tr>
                                            </thead>
                                            <tbody id="slot_table"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="box box-primary">
                                    <div className="box-body">
                                        <table
                                            id="offered-subject"
                                            className="table table-striped table-bordered dt-responsive nowrap"
                                            cellSpacing="0"
                                            width="100%"
                                        >
                                            <thead>
                                                <tr className="cell-blue">
                                                    <th data-priority="1">
                                                        Slot
                                                    </th>
                                                    <th data-priority="2">
                                                        Subject Code
                                                    </th>
                                                    <th data-priority="4">
                                                        Subject Name
                                                    </th>
                                                    <th data-priority="4">
                                                        Type
                                                    </th>
                                                    <th data-priority="3">
                                                        Credit
                                                    </th>
                                                    <th data-priority="4">
                                                        Staff Name
                                                    </th>
                                                    <th data-priority="4">
                                                        Designation
                                                    </th>
                                                    <th data-priority="4">
                                                        Department
                                                    </th>
                                                    <th data-priority="3">
                                                        Availabity <br /> REG -
                                                        REA - OTH
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{lis}</tbody>
                                        </table>
                                        <Button
                                            className="btn cell-green btn-flat btn-block"
                                            // href="https://acoe.annauniv.edu/sems/student/enrollment"
                                            onClick={() => Enrolling()}
                                        >
                                            Proceed to Enrollment
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
export default Enrollment;
