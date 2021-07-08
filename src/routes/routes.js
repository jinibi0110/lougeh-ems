import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import RegistrarLayout from "@/pages/Layout/RegistrarLayout.vue";
import StudentLayout from "@/pages/Layout/StudentLayout.vue";

import UserAccount from "@/pages/UserAccount.vue";
import Course from "@/pages/Course.vue";
import Subject from "@/pages/Subject.vue";
import Role from "@/pages/Role.vue";
import Section from "@/pages/Section.vue";
import SchoolYear from "@/pages/SchoolYear.vue";
import StudentInfo from "@/pages/StudentInfo.vue";
import RegistrarAddStudent from "@/pages/RegistrarAddStudent.vue";
import EnrollSubject from "@/pages/EnrollSubject.vue";
import EncodeGrade from "@/pages/EncodeGrade.vue";
import ViewProfile from "@/pages/ViewProfile.vue";
import ViewGrades from "@/pages/ViewGrades.vue";
import ViewProspectus from "@/pages/ViewProspectus.vue";
import SignIn from "@/pages/SignIn.vue";
import ChangePassword from "@/pages/ChangePassword.vue";

const routes = [
  {
    path: "/signin",
    component: SignIn,
    name: null,
  },
  {
    path: "/changePassword",
    component: ChangePassword,
    name: null,
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Manage User Account",
        component: UserAccount,
      },
      {
        path: "courses",
        name: "Manage Courses",
        component: Course,
      },
      {
        path: "subjects",
        name: "Manage Subjects",
        component: Subject,
      },
      {
        path: "roles",
        name: "Manage Roles",
        component: Role,
      },
      {
        path: "sections",
        name: "Manage Sections",
        component: Section,
      },
      {
        path: "schoolyear",
        name: "Manage School Year",
        component: SchoolYear,
      },
      {
        path: "studentinfo",
        name: "Manage Student Information",
        component: StudentInfo,
      },
    ],
  },
  {
    path: "/",
    component: RegistrarLayout,
    redirect: "/registrar",
    children: [
      {
        path: "registrar",
        name: "Add Student Information",
        component: RegistrarAddStudent,
      },
      {
        path: "enrollsubject",
        name: "Enroll Subjects",
        component: EnrollSubject,
      },
      {
        path: "encodegrade",
        name: "Encode Grades",
        component: EncodeGrade,
      },
    ],
  },
  {
    path: "/",
    component: StudentLayout,
    redirect: "/student",
    children: [
      {
        path: "student",
        name: "View Profile",
        component: ViewProfile,
      },
      {
        path: "viewgrades",
        name: "View Grades",
        component: ViewGrades,
      },
      {
        path: "prospectus",
        name: "View Prospectus",
        component: ViewProspectus,
      },
    ],
  },
];

export default routes;
