// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./struct.sol";

contract EMS_Map {
    mapping (uint=> Regulation) public regulations;
    mapping (uint=> Student) public students; 
    mapping (uint=> Branch) public branches; 
    mapping (uint=> Faculty) public faculties;
    mapping (uint=> Department) public departments; 
    mapping (uint=> Course) public courses;
    mapping (uint=> CourseList) public courselists;
    mapping (uint=> StudentEnrollment) public studentenrollments;
}

contract EMS_Create is EMS_Map{
    function createRegulation(uint reg_id, uint reg_value) public{
        regulations[reg_id]= Regulation(reg_id, reg_value);
    }
    
    function createFaculty(uint f_id, string memory f_name, uint f_designation,uint dep_id) public{
        Designation desg ;
        if(f_designation==1)
            desg=Designation.TeachingFollow;
        else if(f_designation==2)
            desg=Designation.AssistantProfessor;
        else
            desg = Designation.Professor;
            
        faculties[f_id]= Faculty(f_id,f_name,desg, dep_id);
    }
    
    function createDepartment(uint dep_id, string memory dep_name, uint dep_hod) public {
        departments[dep_id]= Department(dep_id, dep_name, dep_hod);
    }
    
    function createBranch(uint br_id,string memory br_name, uint dep_id) public{
        branches[br_id]= Branch(br_id, br_name, dep_id);
    }
    
    function createStudent(
            uint std_id,
            string memory std_name,
            string memory std_dob,
            string memory std_addr,
            string memory std_email,
            string memory std_contact,
            uint dep_id,
            uint br_id,
            uint reg_id,
            string memory pwd
        ) public {
        
        students[std_id] = Student(
                std_id, std_name, std_dob, std_addr, std_email, std_contact, dep_id, br_id, reg_id, pwd
            );
    }
    
    function createCourse(uint c_id,string memory c_code,string memory c_name, string memory c_qp_code, uint c_credits, uint dep_id) public{
        courses[c_id]= Course(c_id, c_code, c_name, c_qp_code, c_credits, dep_id);
    }
    
    function createCourselist(uint cl_id,uint c_id, uint f_id, uint sems) public{
        courselists[c_id]= CourseList(cl_id, c_id,f_id, sems);
    }
    
    function createStudentEnrollment(uint id, uint std_id,uint cl_id) public{
        studentenrollments[id].std_id= std_id;
        studentenrollments[id].cl_id= cl_id;
    }
}

contract EMS is EMS_Create {
    
    function login(uint std_id)public view returns(uint id ,string memory pwd) {
        id = students[std_id].std_id;
        pwd = students[std_id].pwd;
    }

    function addEnrollment(uint std_id, uint cl_id ) public returns(StudentEnrollment memory) {
        studentenrollments[std_id+cl_id] = StudentEnrollment(std_id, cl_id,SemsGrade.NA, 0, 0, 0, 0, 0, 0, 0, 0,0);
        return studentenrollments[std_id+cl_id];
    }

    function updateEnrollment(uint std_id,
        uint cl_id, 
        uint em, uint im, uint int1,uint int2,
        uint int3, uint att, uint att1, uint att2, 
    uint att3 ) public returns(StudentEnrollment memory) {
        std_id+= cl_id;
        studentenrollments[std_id].external_mark= em;
        studentenrollments[std_id].internal_mark= im;
        studentenrollments[std_id].attendence= att;
        studentenrollments[std_id].att1= att1;
        studentenrollments[std_id].att2= att2;
        studentenrollments[std_id].att3= att3;
        studentenrollments[std_id].int_1= int1;
        studentenrollments[std_id].int_2= int2;
        studentenrollments[std_id].int_3= int3;
        
        return studentenrollments[std_id];
    }
}