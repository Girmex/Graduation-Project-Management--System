import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import FileUpload from '../views/FileUpload.vue'
import student from '../views/student/student.vue'
import studentFileUpload from '../views/student/studentFileUpload.vue'
import studentHome from '../views/student/studentHome.vue'
import studentProfile from '../views/student/studentProfile.vue'
import studentAdvisor from '../views/student/studentAdvisor.vue'
import studentProject from '../views/student/studentProject.vue'
import studentProjectAbstract from '../views/student/studentProjectAbstract.vue'
import studentProjectDetail from '../views/student/studentProjectDetail.vue'
import studentDepartmentProject from '../views/student/studentDepartmentProject.vue'
import studentNotice from '../views/student/studentNotice.vue'
import studentNoticeView from '../views/student/studentNoticeView.vue'
import studentGroupMembers from '../views/student/studentGroupMembers.vue'
import Chat from '../views/student/Chat.vue'
import ChatDetail from '../views/student/ChatDetail.vue'
import groupMemberInfo from '../views/student/groupMemberInfo.vue'
// import SignUp from '../views/SignUp.vue'
// import Admin from '../views/Admin.vue'
// import SearchBar from '../views/SearchBar.vue'
import Detail from '../views/user/Detail.vue'
import userDepartmentList from '../views/user/userDepartmentList.vue'
import userDepartmentProject from '../views/user/userDepartmentProject.vue'
import AllProjects from '../views/user/AllProjects.vue'
import HomeView from '../views/user/HomeView.vue'
import BestProjects from '../views/user/BestProjects.vue'

// // import UpdateAccount from '../views/UpdateAccount.vue'
// import SignAdmin from '../views/SignAdmin.vue'
// import ProjectList from '../views/ProjectList.vue'
// import DownloadFile from '../views/DownloadFile.vue'
// import UploadInfo from '../views/UploadInfo.vue'
import advisor from '../views/advisor/advisor.vue'
import advisorHome from '../views/advisor/advisorHome.vue'
import advisorProfile from '../views/advisor/advisorProfile.vue'
import advisorNotice from '../views/advisor/advisorNotice.vue'
import advisorNoticeView from '../views/advisor/advisorNoticeView.vue'
import advisorChatGroup from '../views/advisor/advisorChatGroup.vue'
import advisorChat from '../views/advisor/advisorChat.vue'
import advisorChatDetail from '../views/advisor/advisorChatDetail.vue'
// import TitleView from '../views/TitleView.vue'
// import LogoutUser from '../views/LogoutUser.vue'
// import LogoutAdmin from '../views/LogoutAdmin.vue'
import fileUpload from '../views/advisor/fileUpload.vue'
import advisorCurrentProjectList from '../views/advisor/advisorCurrentProjectList.vue'
import advisorProject from '../views/advisor/advisorProject.vue'
import advisorProjectAbstract from '../views/advisor/advisorProjectAbstract.vue'
import advisorStudent from '../views/advisor/advisorStudent.vue'
import advisorStudentList from '../views/advisor/advisorStudentList.vue'
import advisorProjectDetail from '../views/advisor/advisorProjectDetail.vue'
import advisorProjectList from '../views/advisor/advisorProjectList.vue'
import facultyHome from '../views/faculty/facultyHome.vue'
import facultyBestProject from '../views/faculty/facultyBestProject.vue'
import profile from '../views/faculty/profile.vue'
import addNotice from '../views/faculty/addNotice.vue'
import notice from '../views/faculty/notice.vue'
import noticeView from '../views/faculty/noticeView.vue'
import listAllNotice from '../views/faculty/listAllNotice.vue'
import noticeList from '../views/faculty/noticeList.vue'
import Login from '../views/Login.vue'
// import Notices from '../views/Notices.vue'
// import NoticeAdmin from '../views/NoticeAdmin.vue'
// import TitleSubmission from '../views/TitleSubmission.vue'
// import FECE from '../views/faculties/FECE.vue'
// import Login from '../views/Login.vue'
import staffList from '../views/faculty/staffList.vue'
import addFacultyStaffMember from '../views/faculty/addFacultyStaffMember.vue'
import chairList from '../views/faculty/chairList.vue'
import chairRepository from '../views/chairs/chairRepository.vue'
import chairInfo from '../views/faculty/chairInfo.vue'
import allDepartment from '../views/faculty/allDepartment.vue'
import departmentInfo from '../views/faculty/departmentInfo.vue'
import departmentExaminer from '../views/department/departmentExaminer.vue'
import addDepartment from '../views/faculty/addDepartment.vue'
import addChair from '../views/faculty/addChair.vue'
// import LoginAdmin from '../views/LoginAdmin.vue'
// import LoginAdvisor from '../views/LoginAdvisor.vue'
import project from '../views/faculty/project.vue'
import allProject from '../views/faculty/allProject.vue'
import completedProject from '../views/faculty/completedProject.vue'
import progressProjects from '../views/faculty/progressProject.vue'
import projectInfo from '../views/faculty/projectInfo.vue'

// import view from '../views/view.vue'
import students from '../views/faculty/students.vue'
import allStudents from '../views/faculty/allStudents.vue'
import studentsList from '../views/faculty/studentsList.vue'
import studentsInfo from '../views/faculty/studentsInfo.vue'
import staffMember from '../views/faculty/staffMember.vue'
import staff from '../views/faculty/staff.vue'
import staffMemberInfo from '../views/faculty/staffMemberInfo.vue'
import Faculties from '../views/faculty/Faculties.vue'
// import FormInput from '../views/SignUp.vue'
import Chairs from '../views/chairs/Chairs.vue'
import chairHome from '../views/chairs/chairHome.vue'
import chairAllProject from '../views/chairs/chairAllProject.vue'
import chairBestProject from '../views/chairs/chairBestProject.vue'
import chairAllStaffMember from '../views/chairs/chairAllStaffMember.vue'
import chairAllStudents from '../views/chairs/chairAllStudents.vue'
import chairCompletedProject from '../views/chairs/chairCompletedProject.vue'
import chairProject from '../views/chairs/chairProject.vue'
import chairProjectInfo from '../views/chairs/chairProjectInfo.vue'
import chairStaff from '../views/chairs/chairStaff.vue'
import chairStaffList from '../views/chairs/chairStaffList.vue'
import chairStaffMemberInfo from '../views/chairs/chairStaffMemberInfo.vue'
import chairStudent from '../views/chairs/chairStudent.vue'
import chairNotice from '../views/chairs/chairNotice.vue'
import chairNoticeView from '../views/chairs/chairNoticeView.vue'
import chairStudentInfo from '../views/chairs/chairStudentInfo.vue'
import chairStudentList from '../views/chairs/chairStudentList.vue'
import chairProfile from '../views/chairs/chairProfile.vue'
import formGroup from '../views/chairs/formGroup.vue'
import studentGroup from '../views/chairs/studentGroup.vue'
import addStudent from '../views/chairs/addStudent.vue'
import addStaffMember from '../views/chairs/addStaffMember.vue'
import groupList from '../views/chairs/groupList.vue'
// import ComputerEng from '../views/faculties/departments/ComputerEng.vue'
import admin from '../views/admin/admin.vue'
import adminBestProject from '../views/admin/adminBestProject.vue'
import adminProfile from '../views/admin/adminProfile.vue'
import adminHome from '../views/admin/adminHome.vue'
import adminAllDepartment from '../views/admin/adminAllDepartment.vue'
import adminAddDepartment from '../views/admin/adminAddDepartment.vue'
import adminAddChair from '../views/admin/adminAddChair.vue'
import adminAddStaffMember from '../views/admin/adminAddStaffMember.vue'
import adminDepartmentInfo from '../views/admin/adminDepartmentInfo.vue'
import adminFacultyInfo from '../views/admin/adminFacultyInfo.vue'
import adminAllProject from '../views/admin/adminAllProject.vue'
import adminProject from '../views/admin/adminProject.vue'
import adminProjectInfo from '../views/admin/adminProjectInfo.vue'
import adminCompletedProject from '../views/admin/adminCompletedProject.vue'
import adminAllStudents from '../views/admin/adminAllStudents.vue'
import adminStudents from '../views/admin/adminStudents.vue'
import adminStudentsList from '../views/admin/adminStudentsList.vue'
import adminStaffMember from '../views/admin/adminStaffMember.vue'
import adminStaffMemberInfo from '../views/admin/adminStaffMemberInfo.vue'
import adminStaff from '../views/admin/adminStaff.vue'
import adminStaffList from '../views/admin/adminStaffList.vue'
import adminChairList from '../views/admin/adminChairList.vue'
import adminChairInfo from '../views/admin/adminChairInfo.vue'
import adminFacultyList from '../views/admin/adminFacultyList.vue'
// import ElectricalEng from '../views/faculties/departments/ElectricalEng.vue'
// import AddAdvisor from '../views/AddAdvisor.vue'
import department from '../views/department/department.vue'
import repository from '../views/department/repository.vue'
import departmentBestProject from '../views/department/departmentBestProject.vue'
import departmentChairList from '../views/department/departmentChairList.vue'
import departmentChairInfo from '../views/department/departmentChairInfo.vue'
import departmentAddChair from '../views/department/departmentAddChair.vue'
import departmentHome from '../views/department/departmentHome.vue'
import departmentExaminerGroup from '../views/department/departmentExaminerGroup.vue'
import departmentExaminerList from '../views/department/departmentExaminerList.vue'
import departmentAllProject from '../views/department/departmentAllProject.vue'
import departmentAllStaffMember from '../views/department/departmentAllStaffMember.vue'
import departmentAllStudents from '../views/department/departmentAllStudents.vue'
import departmentCompletedProject from '../views/department/departmentCompletedProject.vue'
import departmentProject from '../views/department/departmentProject.vue'
import departmentProjectInfo from '../views/department/departmentProjectInfo.vue'
import departmentStaff from '../views/department/departmentStaff.vue'
import departmentStaffList from '../views/department/departmentStaffList.vue'
import departmentStaffMemberInfo from '../views/department/departmentStaffMemberInfo.vue'
import departmentStudent from '../views/department/departmentStudent.vue'
import departmentNotice from '../views/department/departmentNotice.vue'
import departmentNoticeView from '../views/department/departmentNoticeView.vue'
import departmentStudentInfo from '../views/department/departmentStudentInfo.vue'
import departmentStudentList from '../views/department/departmentStudentList.vue'
import departmentProfile from '../views/department/departmentProfile.vue'
import departmentFormGroup from '../views/department/departmentFormGroup.vue'
import departmentStudentGroup from '../views/department/departmentStudentGroup.vue'
import departmentAddStudent from '../views/department/departmentAddStudent.vue'
import departmentAddStaffMember from '../views/department/departmentAddStaffMember.vue'
import departmentGroupList from '../views/department/departmentGroupList.vue'

const routes = [
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    children: [
      {
        path: '/adminHome',
        name: 'adminHome',
        component: adminHome
      },
      {
        path: '/adminBestProject',
        name: 'adminBestProject',
        component: adminBestProject
      },
      {
        path: '/adminProfile/:id',
        name: 'adminProfile',
        component: adminProfile
      },
      {
        path: '/adminAddDepartment',
        name: 'adminAddDepartment',
        component: adminAddDepartment
      },
      {
        path: '/adminAddStaffMember',
        name: 'adminAddStaffMember',
        component: adminAddStaffMember
      },
      {
        path: '/adminAllDepartment',
        name: 'adminAllDepartment',
        component: adminAllDepartment
      },
      {
        path: '/adminDepartmentInfo/:id',
        name: 'adminDepartmentInfo',
        component: adminDepartmentInfo
      },
      {
        path: '/adminFacultyInfo/:id',
        name: 'adminFacultyInfo',
        component: adminFacultyInfo
      },
      {
        path: '/adminFacultyList',
        name: 'adminFacultyList',
        component: adminFacultyList
      },
      {
        path: '/adminProject',
        name: 'adminProject',
        component: adminProject,
        children: [
          {
            path: '/adminAllProject',
            name: 'adminAllProject',
            component: adminAllProject
          },
          {
            path: '/adminCompletedProject/:type/:value',
            name: 'adminCompletedProject',
            component: adminCompletedProject
          }
        ]
      },
      {
        path: '/adminProjectInfo/:id',
        name: 'adminProjectInfo',
        component: adminProjectInfo
      },

      {
        path: '/adminStudents',
        name: 'adminStudents',
        component: adminStudents,
        children: [
          {
            path: '/adminAllStudents',
            name: 'adminAllStudents',
            component: adminAllStudents
          },
          {
            path: '/adminStudentsList/:type/:value',
            name: 'adminStudentsList',
            component: adminStudentsList
          }
        ]
      },

      {
        path: '/adminStaff',
        name: 'adminStaff',
        component: adminStaff,
        children: [
          {
            path: '/adminStaffMember',
            name: 'adminStaffMember',
            component: adminStaffMember
          },
          {
            path: '/adminStaffList/:type/:value',
            name: 'adminStaffList',
            component: adminStaffList
          }
        ]
      },
      {
        path: '/adminStaffMemberInfo/:id',
        name: 'adminStaffMemberInfo',
        component: adminStaffMemberInfo
      },
      {
        path: '/adminChairList',
        name: 'adminChairList',
        component: adminChairList
      },
      {
        path: '/adminChairInfo/:id',
        name: 'adminChairInfo',
        component: adminChairInfo
      },
      {
        path: '/adminAddChair',
        name: 'adminAddChair',
        component: adminAddChair
      }
    ]
  },
  {
    path: '/Faculties/:facultyId',
    name: 'Faculties',
    component: Faculties,
    children: [
      {
        path: 'facultyHome/:facultyId',
        name: 'facultyHome',
        component: facultyHome
      },
      {
        path: 'facultyBestProject/:facultyId',
        name: 'facultyBestProject',
        component: facultyBestProject
      },
      {
        path: '/addNotice/:facultyId',
        name: 'addNotice',
        component: addNotice
      },
      {
        path: '/addFacultyStaffMember/:facultyId',
        name: 'addFacultyStaffMember',
        component: addFacultyStaffMember
      },
      { path: '/notice/:facultyId', name: 'notice', component: notice },
      {
        path: '/listAllNotice/:facultyId',
        name: 'listAllNotice',
        component: listAllNotice
      },
      {
        path: '/noticeView/:facultyId/:notice',
        name: 'noticeView',
        component: noticeView
      },
      {
        path: '/noticeList/:facultyId/:type/:value',
        name: 'noticeList',
        component: noticeList
      },

      {
        path: 'profile/:id',
        name: 'profile',
        component: profile
      },

      {
        path: '/allDepartment/:facultyId',
        name: 'allDepartment',
        component: allDepartment
      },
      {
        path: '/departmentInfo/:id/:facultyId',
        name: 'departmentInfo',
        component: departmentInfo
      },

      {
        path: '/staff/:facultyId',
        name: 'staff',
        component: staff
      },
      {
        path: '/staffMember/:facultyId',
        name: 'staffMember',
        component: staffMember
      },

      {
        path: '/staffList/:facultyId/:type/:value',
        name: 'staffList',
        component: staffList
      },
      {
        path: 'staffMemberInfo/:id/:facultyId',
        name: 'staffMemberInfo',
        component: staffMemberInfo
      },
      {
        path: '/students/:facultyId',
        name: 'students',
        component: students
      },
      {
        path: '/allStudents/:facultyId',
        name: 'allStudents',
        component: allStudents
      },

      {
        path: '/studentsList/:facultyId/:type/:value',
        name: 'studentsList',
        component: studentsList
      },
      {
        path: 'studentsInfo/:id',
        name: 'studentsInfo',
        component: studentsInfo
      },

      {
        path: '/project/:facultyId',
        name: 'project',
        component: project
      },
      {
        path: '/allProject/:facultyId',
        name: 'allProject',
        component: allProject
      },
      {
        path: '/completedProject/:facultyId/:type/:value',
        name: 'completedProject',
        component: completedProject
      },
      {
        path: '/progressProjects/:facultyId/:type/:value',
        name: 'progressProjects',
        component: progressProjects
      },
      {
        path: 'projectInfo/:facultyId/:id',
        name: 'projectInfo',
        component: projectInfo
      },
      {
        path: '/chairList/:facultyId',
        name: 'chairList',
        component: chairList
      },
      {
        path: '/chairInfo/:Id/:facultyId',
        name: 'chairInfo',
        component: chairInfo
      },
      {
        path: '/addDepartment/:facultyId',
        name: 'addDepartment',
        component: addDepartment
      },
      {
        path: '/addChair/:facultyId',
        name: 'addChair',
        component: addChair
      }
    ]
  },
  {
    path: '/Chairs/:chairId',
    name: 'Chairs',
    component: Chairs,
    children: [
      {
        path: '/chairHome/:chairId',
        name: 'chairHome',
        component: chairHome
      },
      {
        path: '/chairProfile/:id/:chairId',
        name: 'chairProfile',
        component: chairProfile
      },

      {
        path: '/groupList/:chairId',
        name: 'groupList',
        component: groupList
      },

      {
        path: '/addStaffMember/:chairId',
        name: 'addStaffMember',
        component: addStaffMember
      },
      {
        path: '/addStudent/:chairId',
        name: 'addStudent',
        component: addStudent
      },

      {
        path: '/chairStaff/:chairId',
        name: 'chairStaff',
        component: chairStaff
      },
      {
        path: '/chairAllStaffMember/:chairId',
        name: 'chairAllStaffMember',
        component: chairAllStaffMember
      },

      {
        path: '/chairStaffList/:chairId/:type/:value',
        name: 'chairStaffList',
        component: chairStaffList
      },
      {
        path: 'chairStaffMemberInfo/:id/:chairId',
        name: 'chairStaffMemberInfo',
        component: chairStaffMemberInfo
      },
      {
        path: 'chairNotice/:chairId',
        name: 'chairNotice',
        component: chairNotice
      },
      {
        path: 'chairRepository/:chairId',
        name: 'chairRepository',
        component: chairRepository
      },
      {
        path: 'chairNoticeView/:chairId/:notice',
        name: 'chairNoticeView',
        component: chairNoticeView
      },
      {
        path: '/chairStudent/:chairId',
        name: 'chairStudent',
        component: chairStudent
      },
      {
        path: '/chairAllStudents/:chairId',
        name: 'chairAllStudents',
        component: chairAllStudents
      },
      {
        path: '/chairBestProject/:chairId',
        name: 'chairBestProject',
        component: chairBestProject
      },

      {
        path: '/chairStudentList/:chairId/:type/:value',
        name: 'chairStudentList',
        component: chairStudentList
      },
      {
        path: 'chairStudentInfo/:id',
        name: 'chairStudentInfo',
        component: chairStudentInfo
      },

      {
        path: '/chairProject/:chairId',
        name: 'chairProject',
        component: chairProject
      },
      {
        path: '/chairAllProject/:chairId',
        name: 'chairAllProject',
        component: chairAllProject
      },
      {
        path: '/chairCompletedProject/:chairId/:type/:value',
        name: 'chairCompletedProject',
        component: chairCompletedProject
      },

      {
        path: '/studentGroup/:chairId',
        name: 'studentGroup',
        component: studentGroup
      },
      {
        path: '/formGroup/:chairId',
        name: 'formGroup',
        component: formGroup
      },
      {
        path: '/chairProjectInfo/:chairId/:id',
        name: 'chairProjectInfo',
        component: chairProjectInfo
      }
    ]
  },

  {
    path: '/Login',
    name: 'Login',
    component: Login
  },

  {
    path: '/advisor/:id',
    name: 'advisor',
    component: advisor,
    children: [
      {
        path: '/advisorProject/:id',
        name: 'advisorProject',
        component: advisorProject
      },
      {
        path: '/advisorProjectList/:id/:value',
        name: 'advisorProjectList',
        component: advisorProjectList
      },
      {
        path: '/advisorCurrentProjectList/:id',
        name: 'advisorCurrentProjectList',
        component: advisorCurrentProjectList
      },
      {
        path: '/advisorStudent/:id',
        name: 'advisorStudent',
        component: advisorStudent,
        children: [
          {
            path: '/advisorStudentList/:id/:group',
            name: 'advisorStudentList',
            component: advisorStudentList
          }
        ]
      },

      {
        path: '/fileUpload/:id',
        name: 'fileUpload',
        component: fileUpload
      },
      {
        path: '/advisorHome/:id',
        name: 'advisorHome',
        component: advisorHome
      },
      {
        path: '/advisorProjectAbstract/:id/:description',
        name: 'advisorProjectAbstract',
        component: advisorProjectAbstract
      },
      {
        path: '/advisorProfile/:id',
        name: 'advisorProfile',
        component: advisorProfile
      },
      {
        path: '/advisorNotice/:id',
        name: 'advisorNotice',
        component: advisorNotice
      },
      {
        path: '/advisorNoticeView/:id/:notice',
        name: 'advisorNoticeView',
        component: advisorNoticeView
      },
      {
        path: '/advisorProjectDetail/:id/:group',
        name: 'advisorProjectDetail',
        component: advisorProjectDetail
      },
      {
        path: '/advisorChatGroup/:id',
        name: 'advisorChatGroup',
        component: advisorChatGroup,
        children: [
          {
            path: '/advisorChat/:id/:group',
            name: 'advisorChat',
            component: advisorChat
          },
          {
            path: '/advisorChatDetail/:id/:group',
            name: 'advisorChatDetail',
            component: advisorChatDetail
          }
        ]
      }
    ]
  },
  {
    path: '/Detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/AllProjects',
    name: 'AllProjects',
    component: AllProjects
  },
  {
    path: '/userDepartmentList/:id',
    name: 'userDepartmentList',
    component: userDepartmentList
  },
  {
    path: '/userDepartmentProject/:id',
    name: 'userDepartmentProject',
    component: userDepartmentProject
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },

  {
    path: '/BestProjects',
    name: 'BestProjects',
    component: BestProjects
  },

  //   {
  //     path: '/SignAdmin',
  //     name: 'SignAdmin',
  //     component: SignAdmin
  //   },

  {
    path: '/student/:id/:group',
    name: 'student',
    component: student,
    children: [
      {
        path: '/studentGroupMembers/:id/:group',
        name: 'studentGroupMembers',
        component: studentGroupMembers
      },
      {
        path: '/studentProject/:id/:group',
        name: 'studentProject',
        component: studentProject
      },
      {
        path: '/studentProjectAbstract/:id/:description',
        name: 'studentProjectAbstract',
        component: studentProjectAbstract
      },
      {
        path: '/studentProjectDetail/:id/:group',
        name: 'studentProjectDetail',
        component: studentProjectDetail
      },
      {
        path: '/studentDepartmentProject/:id/:group',
        name: 'studentDepartmentProject',
        component: studentDepartmentProject
      },
      {
        path: '/studentNotice/:id/:group',
        name: 'studentNotice',
        component: studentNotice
      },
      {
        path: '/studentProfile/:id/:group',
        name: 'studentProfile',
        component: studentProfile
      },
      {
        path: '/studentNoticeView/:id/:group/:notice',
        name: 'studentNoticeView',
        component: studentNoticeView
      },
      {
        path: '/Chat/:id/:group',
        name: 'Chat',
        component: Chat
      },
      {
        path: '/studentHome/:id/:group',
        name: 'studentHome',
        component: studentHome
      },
      {
        path: '/studentFileUpload/:id',
        name: 'studentFileUpload',
        component: studentFileUpload
      },
      {
        path: '/studentAdvisor/:id/:group',
        name: 'studentAdvisor',
        component: studentAdvisor
      },
      {
        path: '/ChatDetail/:id/:group',
        name: 'ChatDetail',
        component: ChatDetail
      },

      {
        path: '/groupMemberInfo/:id/:group/:info/:advisor',
        name: 'groupMemberInfo',
        component: groupMemberInfo
      }
    ]
  },

  //   {
  //     path: '/NoticeAdmin',
  //     name: 'NoticeAdmin',
  //     component: NoticeAdmin
  //   },
  //   // {
  //   //   path: '/UpdateAccount',
  //   //   name: 'UpdateAccount',
  //   //   component: UpdateAccount
  //   // },
  //   {
  //     path: '/AdvisorProfile',
  //     name: 'AdvisorProfile',
  //     component: AdvisorProfile
  //   },
  {
    path: '/department/:departmentId',
    name: 'department',
    component: department,
    children: [
      {
        path: '/departmentHome/:departmentId',
        name: 'departmentHome',
        component: departmentHome
      },
      {
        path: '/repository/:departmentId',
        name: 'repository',
        component: repository
      },
      {
        path: '/departmentBestProject/:departmentId',
        name: 'departmentBestProject',
        component: departmentBestProject
      },
      {
        path: '/departmentProfile/:id/:departmentId',
        name: 'departmentProfile',
        component: departmentProfile
      },
      {
        path: '/departmentExaminer/:departmentId',
        name: 'departmentExaminer',
        component: departmentExaminer
      },
      {
        path: '/departmentChairList/:departmentId',
        name: 'departmentChairList',
        component: departmentChairList
      },
      {
        path: '/departmentChairInfo/:chairId/:departmentId',
        name: 'departmentChairInfo',
        component: departmentChairInfo
      },
      {
        path: '/departmentAddChair/:departmentId',
        name: 'departmentAddChair',
        component: departmentAddChair
      },
      {
        path: '/departmentGroupList/:departmentId',
        name: 'departmentGroupList',
        component: departmentGroupList
      },

      {
        path: '/departmentAddStaffMember/:departmentId',
        name: 'departmentAddStaffMember',
        component: departmentAddStaffMember
      },
      {
        path: '/departmentAddStudent/:departmentId',
        name: 'departmentAddStudent',
        component: departmentAddStudent
      },

      {
        path: '/departmentStaff/:departmentId',
        name: 'departmentStaff',
        component: departmentStaff
      },
      {
        path: '/departmentAllStaffMember/:departmentId',
        name: 'departmentAllStaffMember',
        component: departmentAllStaffMember
      },

      {
        path: '/departmentStaffList/:departmentId/:type/:value',
        name: 'departmentStaffList',
        component: departmentStaffList
      },
      {
        path: 'departmentStaffMemberInfo/:id/:departmentId',
        name: 'departmentStaffMemberInfo',
        component: departmentStaffMemberInfo
      },
      {
        path: 'departmentNotice/:departmentId',
        name: 'departmentNotice',
        component: departmentNotice
      },
      {
        path: 'departmentNoticeView/:departmentId/:notice',
        name: 'departmentNoticeView',
        component: departmentNoticeView
      },
      {
        path: '/departmentStudent/:departmentId',
        name: 'departmentStudent',
        component: departmentStudent
      },
      {
        path: '/departmentAllStudents/:departmentId',
        name: 'departmentAllStudents',
        component: departmentAllStudents
      },

      {
        path: '/departmentStudentList/:departmentId/:type/:value',
        name: 'departmentStudentList',
        component: departmentStudentList
      },
      {
        path: 'departmentStudentInfo/:id',
        name: 'departmentStudentInfo',
        component: departmentStudentInfo
      },

      {
        path: '/departmentProject/:departmentId',
        name: 'departmentProject',
        component: departmentProject
      },
      {
        path: '/departmentAllProject/:departmentId',
        name: 'departmentAllProject',
        component: departmentAllProject
      },
      {
        path: '/departmentCompletedProject/:departmentId/:type/:value',
        name: 'departmentCompletedProject',
        component: departmentCompletedProject
      },
      {
        path: '/departmentExaminerGroup/:departmentId',
        name: 'departmentExaminerGroup',
        component: departmentExaminerGroup,
        children: [
          {
            path: '/departmentExaminerList/:departmentId/:group',
            name: 'departmentExaminerList',
            component: departmentExaminerList
          }
        ]
      },

      {
        path: '/departmentStudentGroup/:departmentId',
        name: 'departmentStudentGroup',
        component: departmentStudentGroup
      },
      {
        path: '/departmentFormGroup/:departmentId',
        name: 'departmentFormGroup',
        component: departmentFormGroup
      },
      {
        path: '/departmentProjectInfo/:departmentId/:id',
        name: 'departmentProjectInfo',
        component: departmentProjectInfo
      }
    ]
  }
  //   {
  //     path: '/FECE',
  //     name: 'FECE',
  //     component: FECE
  //   },
  //   {
  //     path: '/ComputerEng',
  //     name: 'ComputerEng',
  //     component: ComputerEng
  //   },
  //   {
  //     path: '/ElectricalEng',
  //     name: 'ElectricalEng',
  //     component: ElectricalEng
  //   },

  //   {
  //     path: '/UploadInfo',
  //     name: 'UploadInfo',
  //     component: UploadInfo
  //   },
  //   {
  //     path: '/SignUp',
  //     name: 'SignUp',
  //     component: SignUp
  //   },
  //   {
  //     path: '/ProjectDetail',
  //     name: 'ProjectDetail',
  //     component: ProjectDetail
  //   },
  //   {
  //     path: '/LogoutUser',
  //     name: 'LogoutUser',
  //     component: LogoutUser
  //   },
  //   {
  //     path: '/LogoutAdmin',
  //     name: 'LogoutAdmin',
  //     component: LogoutAdmin
  //   },
  //   // {
  //   //   path: '/LoginAdvisor',
  //   //   name: 'LoginAdvisor',
  //   //   component: LoginAdvisor
  //   // },
  //   {
  //     path: '/Admin',
  //     name: 'Admin',
  //     component: Admin
  //   },
  //   {
  //     path: '/DownloadFile',
  //     name: 'DownloadFile',
  //     component: DownloadFile
  //   },
  //   {
  //     path: '/SearchBar',
  //     name: 'SearchBar',
  //     component: SearchBar
  //   },
  //   {
  //     path: '/Notices',
  //     name: 'Notices',
  //     component: Notices
  //   },
  //   {
  //     path: '/ProjectList',
  //     name: 'ProjectList',
  //     component: ProjectList
  //   },
  //   {
  //     path: '/TitleSubmission',
  //     name: 'TitleSubmission',
  //     component: TitleSubmission
  //   },
  //   {
  //     path: '/Login',
  //     name: 'Login',
  //     component: Login
  //   },
  //   {
  //     path: '/LoginAdmin',
  //     name: 'LoginAdmin',
  //     component: LoginAdmin
  //   },

  //   {
  //     path: '/FormInput',
  //     name: 'FormIput',
  //     component: FormInput
  //   },
  //   {
  //     path: '/TitleView',
  //     name: 'TitleView',
  //     component: TitleView
  //   },
  //  /* {
  //     path: '/PdfView',
  //     name: 'PdfView',
  //     component: PdfView
  //   },
  //   */
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: function () {
  //       return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //     }
  //   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
