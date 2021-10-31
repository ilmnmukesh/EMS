// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Regulation{
    uint reg_id;
    uint reg_value;
}

enum Designation{
    TeachingFollow,
    AssistantProfessor,
    Professor
}

struct Faculty{
    uint f_id;
    string f_name;
    Designation f_designation;
    uint dep_id;
}

struct Department{
    uint dep_id;
    string dep_name;
    uint dep_hod;
}

struct Branch{
    uint br_id;
    string br_name;
    uint dep_id;
}


struct Student {
    uint std_id;
    string std_name;
    string std_dob;
    string std_addr;
    string std_email;
    string std_contact;
    uint dep_id;
    uint br_id;
    uint reg_id;
    string pwd;
}

enum SemsGrade{
    NA, SA, RA, B, BPLUS, A, APLUS, O
}

struct Course{
    uint c_id;
    string c_name;
    string c_qp_code;
    uint c_credits;
    uint dep_id;
}

struct CourseList{
    uint cl_id;
    uint c_id;
    uint f_id;
    uint sems;
}

struct StudentEnrollment{
    uint std_id;
    uint cl_id;
    SemsGrade grade;
    uint external_mark;
    uint internal_mark;
    uint attendence;
    uint att1;
    uint att2;
    uint att3;
    uint int_1;
    uint int_2;
    uint int_3;
}
