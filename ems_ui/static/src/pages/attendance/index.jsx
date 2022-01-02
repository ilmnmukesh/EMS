import React, { useState, useEffect } from "react";
import { ApiGetService } from "../../api/api-services";
import Header from "../../components/header";
const Mark = () => {
    const [Session, setSession] = useState([]);
    const [Department, setDepartment] = useState([]);
    const [Branch, setBranch] = useState([]);
    const [data, setData] = useState({ semester: 0, dep_id: 0, br_id: 0 });
    const [List, setList] = useState([]);
    const [SessionID, setSessionID] = useState(0);
    const [Stud, setStud] = useState({});
    const [EnrollList, setEnrollList] = useState([]);

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
            // console.log(res);
            setStud(res);
        };
        getStudID();
        getSession();
        getBranch();
    }, []);

    useEffect(() => {
        const getSubList = async () => {
            console.log(SessionID);
            let res = await ApiGetService("/api/enroll/get?ses=" + SessionID);
            setList(res);
        };
        getSubList();
    }, [SessionID]);

    const sess = Session.map((i) => (
        <option key={i.id} value={i.id}>
            {i.value}
        </option>
    ));

    const list = List.map((i, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{i.c_code}</td>
            <td>{i.c_name}</td>
            <td>{i.att_1}</td>
            <td>{i.att_2}</td>
            <td>{i.attendance}</td>
            <td>{i.int_1}</td>
            <td>{i.int_2}</td>
            <td>{i.int_1 + i.int_2 / 2}</td>
            <td>{i.grade}</td>
        </tr>
    ));
    return (
        <>
            <Header current="mark" />

            <section className="content-header" style={{ marginTop: "10em" }}>
                <h1 className="text-light-blue">
                    <b>Attendance & Mark</b>
                </h1>
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <i className="fa fa-edit"></i> Attendance & Mark
                        </a>
                    </li>
                    <li className="active">
                        <a href="#">View</a>
                    </li>
                </ol>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-solid">
                            <div className="box-body">
                                <select
                                    className="form-control"
                                    name="sessions"
                                    id="sessions"
                                    onChange={(e) =>
                                        setSessionID(e.target.value)
                                    }
                                >
                                    <option value={""}> Select Session</option>
                                    {sess}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Roll Number
                                            </label>
                                            <label className="visible-xs">
                                                Roll Number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-3">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="rollno"
                                                id="rollno"
                                                value={Stud?.std_id}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Name
                                            </label>
                                            <label className="visible-xs">
                                                Name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-5">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="name"
                                                id="name"
                                                value={Stud?.std_name}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Branch
                                            </label>
                                            <label className="visible-xs">
                                                Branch
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-3">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="branch"
                                                id="branch"
                                                value={Stud?.branch}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Semester
                                            </label>
                                            <label className="visible-xs">
                                                Semester
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-1">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="semester"
                                                id="semester"
                                                value="3"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Regulations
                                            </label>
                                            <label className="visible-xs">
                                                Regulations
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-2">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="regulation"
                                                id="regulation"
                                                value={Stud?.regulation}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-4 col-sm-2">
                                        <div className="form-group">
                                            <label className="col-md-12 control-label hidden-xs">
                                                Campus
                                            </label>
                                            <label className="visible-xs">
                                                Campus
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-8 col-sm-3">
                                        <div className="form-group">
                                            <label className="sr-only"></label>
                                            <input
                                                type="text"
                                                className="form-control input-sm"
                                                name="campus"
                                                id="campus"
                                                value="COLLEGE OF ENGINEERING GUINDY"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <form className="form-horizontal">
                                    <div className="col-sm-12">
                                        <div className="nav-tabs-custom">
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <a
                                                        href="#marks"
                                                        data-toggle="tab"
                                                    >
                                                        Marks
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#profile"
                                                        data-toggle="tab"
                                                    >
                                                        Profile
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="tab-content">
                                                <div
                                                    className="active tab-pane"
                                                    id="marks"
                                                >
                                                    <div className="table-responsive">
                                                        <table
                                                            className="table table-bordered table-condensed table-striped"
                                                            id="student_subject"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th className="cell-blue">
                                                                        S.No.
                                                                    </th>
                                                                    <th className="cell-blue">
                                                                        Course
                                                                        Code
                                                                    </th>
                                                                    <th className="cell-blue">
                                                                        Course
                                                                        Name
                                                                    </th>
                                                                    <th className="cell-21">
                                                                        Att. 1
                                                                    </th>
                                                                    <th className="cell-21">
                                                                        Att. 2
                                                                    </th>
                                                                    <th className="cell-21">
                                                                        Att.(%)
                                                                    </th>
                                                                    <th className="cell-28">
                                                                        Assess.
                                                                        1
                                                                    </th>
                                                                    <th className="cell-28">
                                                                        Assess.
                                                                        2
                                                                    </th>
                                                                    <th className="cell-28">
                                                                        I.
                                                                        Assess
                                                                    </th>
                                                                    <th className="cell-43">
                                                                        Grade
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id="subjects">
                                                                {list}
                                                            </tbody>
                                                        </table>

                                                        <table className="table table-bordered table-condensed table-striped min-table">
                                                            <thead>
                                                                <tr className="cell-blue">
                                                                    <th>
                                                                        Grade
                                                                        Representation
                                                                    </th>
                                                                    <th>
                                                                        Not
                                                                        Published
                                                                    </th>
                                                                    <th>
                                                                        Published
                                                                    </th>
                                                                    <th>
                                                                        Break of
                                                                        Studies
                                                                    </th>
                                                                    <th>
                                                                        Withheld
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th className="cell-blue">
                                                                        Color
                                                                    </th>
                                                                    <td className="cell-3"></td>
                                                                    <td className="cell-38"></td>
                                                                    <td className="cell-37"></td>
                                                                    <td className="cell-4"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table className="table table-bordered table-condensed table-striped table-hover min-table">
                                                            <thead>
                                                                <tr className="cell-blue">
                                                                    <th>
                                                                        Letter
                                                                        Grade
                                                                    </th>
                                                                    <th>O</th>
                                                                    <th>A+</th>
                                                                    <th>A</th>
                                                                    <th>B+</th>
                                                                    <th>B</th>
                                                                    <th>RA</th>
                                                                    <th>SA</th>
                                                                    <th>-</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th className="cell-blue">
                                                                        Letter
                                                                        Grade
                                                                    </th>
                                                                    <td>
                                                                        Outstanding
                                                                    </td>
                                                                    <td>
                                                                        Excellent
                                                                    </td>
                                                                    <td>
                                                                        Very
                                                                        Good
                                                                    </td>
                                                                    <td>
                                                                        Good
                                                                    </td>
                                                                    <td>
                                                                        Above
                                                                        Average
                                                                    </td>
                                                                    <td>
                                                                        ReAppear
                                                                    </td>
                                                                    <td>
                                                                        Shortage
                                                                        of
                                                                        Attendance
                                                                    </td>
                                                                    <td>
                                                                        Withheld
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="cell-blue">
                                                                        Grade
                                                                        Point
                                                                    </th>
                                                                    <td>10</td>
                                                                    <td>9</td>
                                                                    <td>8</td>
                                                                    <td>7</td>
                                                                    <td>6</td>
                                                                    <td>0</td>
                                                                    <td>0</td>
                                                                    <td>-</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                color: "green",
                                                                opacity: "0.4",
                                                            }}
                                                        >
                                                            <h4>
                                                                Disclaimer:
                                                                Results are
                                                                subject to
                                                                change after
                                                                verification.
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="tab-pane"
                                                    id="profile"
                                                >
                                                    <div className="form-group">
                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <input
                                                                type="text"
                                                                className="form-control input-sm"
                                                                id="email"
                                                                value="uv.yuvaraj21@gmail.com"
                                                                readOnly
                                                            />
                                                        </div>

                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="contact"
                                                        >
                                                            Contact No.
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <input
                                                                type="text"
                                                                className="form-control input-sm"
                                                                id="contact"
                                                                value="9551138588"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="pname"
                                                        >
                                                            Parent's Name
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <input
                                                                type="text"
                                                                className="form-control input-sm"
                                                                id="pname"
                                                                value="Thukkaraman.R"
                                                                readOnly
                                                            />
                                                        </div>

                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="contact"
                                                        >
                                                            Parent's No.
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <input
                                                                type="text"
                                                                className="form-control input-sm"
                                                                value="8248305942"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="pname"
                                                        >
                                                            Permanent Address
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <textarea
                                                                className="form-control"
                                                                rows="5"
                                                                readOnly
                                                                value={`
                                                                17/123rd Street
                                                                Thazhangkuppam,
                                                                Ennore Chennai
                                                                600057`}
                                                            />
                                                        </div>

                                                        <label
                                                            className="control-label col-sm-2"
                                                            htmlFor="contact"
                                                        >
                                                            Communication
                                                            Address
                                                        </label>
                                                        <div className="col-sm-4">
                                                            <textarea
                                                                className="form-control"
                                                                rows="5"
                                                                readOnly
                                                                value={`
                                                                17/123rd Street
                                                                Thazhangkuppam,
                                                                Ennore Chennai
                                                                600057`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Mark;
