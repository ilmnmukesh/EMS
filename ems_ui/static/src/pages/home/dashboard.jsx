import React, { useEffect, useState } from 'react'
import "../../assets/css/custom.css";
import { ApiGetService } from "../../api/api-services";
const Dashboard = () => {
    const [Enroll, setEnroll] = useState([])
    const [DropCourse, setDropCourse] = useState([])
    const [AddCourse, setAddCourse]=useState([])

    useEffect(() => {
        const getData =async()=>{
            let token=localStorage.getItem('token')
            console.log(token);
            let res=await ApiGetService("/api/dashboard/", token)
            setEnroll(res?.instructions[0]?.contents)
            setDropCourse(res?.instructions[1]?.contents)
            setAddCourse(res?.instructions[2]?.contents)
            console.log(res)
        }
        getData()
        
    }, [])

    useEffect(() => {
        DropCourse.map((i)=>{
            console.log(i.content)
        })
    }, [DropCourse])


    const instr = Enroll.map((i)=>
        <li>
            {i.content}
        </li>
    );

    const dropCrse =DropCourse.map((i)=><li>{i.content}</li>)

    const AddCrse =AddCourse.map((i)=><li>{i.content}</li>)

    return (
        <>
            <div className='hold-transition skin-blue sidebar-mini sidebar-collapse'>
                <div>
                    <section className='content'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='box box-primary'>
                                    <div className='box-header with-border'>
                                        <h3 className='box-title'>
                                            Instructions
                                        </h3>
                                        <div className='box-tools pull-right'>
                                            <button
                                                className='btn btn-box-tool'
                                                data-widget='collapse'>
                                                <i className='fa fa-minus'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='box-body'>
                                        <b style={{ fontSize: "20px" }}>
                                            Important Note: Kindly refer the
                                            timetable link before the enrollment
                                            process for the subject code during
                                            enrollment of other branch courses
                                            in step 3.
                                        </b>
                                        <br />
                                        <b> Step 1 - Enrollment </b>
                                        <ul className='ulx'>
                                            {instr}
                                            
                                        </ul>
                                        <b> Step 2 - Drop Course</b>
                                        <ul className='ulx'>
                                            {dropCrse}
                                        </ul>
                                        <b>
                                            {" "}
                                            Step 3 - Add other Course/Reaapear
                                        </b>
                                        <ul className='ulx'>
                                            {AddCrse}
                                        </ul>
                                        <b>
                                            {" "}
                                            Note: Read Carefully before proceed
                                            to enrollment
                                        </b>
                                        <ul className='ulx'>
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

                                            <li className='text-red'>
                                                For students facing issue in
                                                registration contact:
                                                044-22359834
                                            </li>
                                        </ul>
                                        <div>
                                            <a href='https://acoe.annauniv.edu/download_forms/Enrollment/A20/DOS AND DONOTS.pdf'>
                                                <font
                                                    style={{ color: "red" }}
                                                    size='4'>
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

                            <div className='col-md-12 text-blue'>
                                <h4>
                                    <b>Mock Test Link</b>
                                </h4>
                            </div>
                            <div className='col-md-12'>
                                <div className='box box-solid'>
                                    <div className='box-body'>
                                        <table
                                            className='table table-condesned table-bordered table-striped'
                                            id='qp_template_table'>
                                            <thead>
                                                <tr>
                                                    <th className='col-md-6'>
                                                        Description
                                                    </th>
                                                    <th className='col-md-6'>
                                                        Download Link
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='col-md-6'>
                                                        Re-Mock test schedule
                                                        and login details
                                                        (31-01-2021 11:00 A.M.)
                                                        <img
                                                            src='https://acoe.annauniv.edu/sems/assests/img/new.gif'
                                                            width='40'
                                                            height='30'
                                                            border='0'
                                                        />
                                                    </td>

                                                    <td className='col-md-6'>
                                                        <font color='green'>
                                                            To download Anna
                                                            University Exam SEB
                                                            for Windows
                                                            Laptop/Destop or
                                                            Anna University Exam
                                                            app (*.apk) for
                                                            Android
                                                            Mobile/Tablet.
                                                        </font>{" "}
                                                        <font color='red'>
                                                            {" "}
                                                            Important Note - Use
                                                            your registration
                                                            number to login and
                                                            the password is the
                                                            Date of Birth as
                                                            mentioned in the
                                                            mock test pdf
                                                        </font>
                                                        <img
                                                            src='https://acoe.annauniv.edu/sems/assests/img/new.gif'
                                                            width='40'
                                                            height='30'
                                                            border='0'
                                                        />
                                                    </td>
                                                    <td className='col-md-6'>
                                                        <a
                                                            className='level'
                                                            href='https://auseb.azurewebsites.net/'
                                                            target='_blank'>
                                                            Click Here
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-12'>
                                <div className='box box-primary'>
                                    <div className='box-header with-border'>
                                        <h3 className='box-title'>Timetable</h3>
                                        <div className='box-tools pull-right'>
                                            <button
                                                className='btn btn-box-tool'
                                                data-widget='collapse'>
                                                <i className='fa fa-minus'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='box-body no-padding'>
                                        <table className='table table-bordered table-condensed'>
                                            <thead>
                                                <tr>
                                                    <th>Day / Hour</th>
                                                    <th>1</th>
                                                    <th>2</th>
                                                    <th>3</th>
                                                    <th>4</th>
                                                    <th>5</th>
                                                    <th>6</th>
                                                    <th>7</th>
                                                    <th>8</th>
                                                    <th>9</th>
                                                    <th>10</th>
                                                </tr>
                                            </thead>
                                            <tbody id='tt'></tbody>
                                        </table>
                                        <input
                                            type='hidden'
                                            name='sessions'
                                            id='sessions'
                                            value='KlHS1Jgagai4M%3EujUG%3EG5cKDZuxoO8GEhxkEnSCAAriwkE6k2%2BZcohCfFnZ1U83B2ztMqr2e%3E679N9ul32353g%3D%3D'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className='main-footer'>
                    <strong>
                        Copyright &copy; 2021 <a href='#'>SEMS</a>.
                    </strong>{" "}
                    All rights reserved.
                </footer>
            </div>
        </>
    );
};
export default Dashboard;
