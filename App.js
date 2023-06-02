import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screen/SplashScreen';
import LoginScreen from './screen/LoginScreen';
import Dashboard from './screen/Student/Dashboard';
import AttendenceCourses from './screen/Student/AttendanceCourses';
import Attendence from './screen/Student/Attendance';
import ContestScreen from './screen/Student/ContestScreen';
import Timetable from './screen/Student/Timetable';
import Datesheet from './screen/Student/Datesheet';
import StudentPerformance from './screen/Student/StudentPerformance';
import AsgDetails from './screen/Student/AsgDetails';
import AsgQuizzMarks from './screen/Student/AsgQuizzMarks';
import ExamsDetails from './screen/Student/ExamsDetails';
import Assessment from './screen/Student/Assessment';
import Evaluate from './screen/Student/Evaluate';
import ExamsMarks from './screen/Student/ExamsMarks';
import Enrollment from './screen/Student/Enrollment';
import TeacherCourses from './screen/Teacher/TeacherCourses';
import ViewContests from './screen/Teacher/ViewContests';
import MarkAttendance from './screen/Teacher/MarkAttendance';
import GradeStudent from './screen/Teacher/GradeStudent';
import EvaluationTeacher from './screen/Teacher/EvaluationTeacher';
import ContestSetting from './screen/Teacher/ContestSetting';
import AttendanceDashboard from './screen/Teacher/AttendanceDashboard';
import TeacherDashboard from './screen/Teacher/TeacherDashboard';
import AddTimetable from './screen/Admin/AddTimetable'
import AssessmentSetting from './screen/Admin/AssessmentSetting';
import CheckFeedback from './screen/Admin/CheckFeedback';
import CourseAllocation from './screen/Admin/CourseAllocation';
import DashboardAdmin from './screen/Admin/DashboardAdmin';
import QuestionRating from './screen/Admin/QuestionRating';
import AddDateSheet from './screen/Admin/AddDatesheet';
import Finance from './screen/Student/Finance';
import FeeChallan from './screen/Student/FeeChallan';
import FeeDetails from './screen/Student/FeeDetails';
import ViewChallan from './screen/Student/ViewChallan';
import UploadChallan from './screen/Student/UploadChallan';
import ViewFeeStatus from './screen/Student/ViewFeeStatus';
import StudentList from './screen/Admin/StudentList';
import StudentFeeStatus from './screen/Admin/StudentFeeStatus';
import HandleFinance from './screen/Admin/HandleFinance';
import FinancialAssitanceRequest from './screen/Admin/FinancialAssitanceRequest';
import RequestDetail from './screen/Admin/RequestDetail';
import FineList from './screen/Admin/FineList';
import AddFine from './screen/Admin/AddFine';
import TakeFine from './screen/Admin/TakeFine';
import FinancialAssistance from './screen/Student/FinancialAssistance';
import FineDetail from './screen/Student/FineDetail';
import UploadFine from './screen/Student/UploadFine';
import ParentDashboard from './screen/Parent/ParentDashboard';
import AddNoticeboard from './screen/Admin/AddNoticeboard';
import NoticeboardDetail from './screen/Admin/NoticeboardDetail';
import ViewNoticeboard from './screen/Student/ViewNoticeboard';
import ViewFineDetail from './screen/Admin/ViewFineDetail';
import AddCourseAdvisor from './screen/Admin/AddCourseAdvisor';
import CourseAdvisor from './screen/Teacher/CourseAdvisor';
import CourseAdvisorInformation from './screen/Teacher/CourseAdvisorInformation';
import ViewAdvise from './screen/Student/ViewAdvise';
import AddPeerEvaluation from './screen/Admin/AddPeerEvaluation';
import ViewEvaluationTeacher from './screen/Teacher/ViewEvaluationTeacher';
import TeacherQuestions from './screen/Teacher/TeacherQuestions';
import TeacherRanking from './screen/Student/TeacherRanking';
import ViewRanking from './screen/Student/ViewRanking';
import InstallmentList from './screen/Admin/InstallmentList';
import InstallmentDetail from './screen/Admin/InstallmentDetail';
import ViewAttendenceCourses from './screen/Parent/ViewAttendanceCourses';
import ViewAsgDetails from './screen/Parent/ViewAsgDetails';
import ViewStudentPerformance from './screen/Parent/ViewStudentPerformance';
import ViewExamsDetails from './screen/Parent/ViewExamsDetails';
const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="AddDateSheet"
                    component={AddDateSheet}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AsgQuizzMarks"
                    component={AsgQuizzMarks}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="TeacherDashboard"
                    component={TeacherDashboard}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ExamsMarks"
                    component={ExamsMarks}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ExamsDetails"
                    component={ExamsDetails}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Assessment"
                    component={Assessment}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Evaluate"
                    component={Evaluate}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AttendenceCourses"
                    component={AttendenceCourses}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Enrollment"
                    component={Enrollment}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewContests"
                    component={ViewContests}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="TeacherCourses"
                    component={TeacherCourses}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AttendanceDashboard"
                    component={AttendanceDashboard}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="EvaluationTeacher"
                    component={EvaluationTeacher}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ContestSetting"
                    component={ContestSetting}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />


                <Stack.Screen
                    name="Attendence"
                    component={Attendence}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ContestScreen"
                    component={ContestScreen}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Timetable"
                    component={Timetable}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="MarkAttendance"
                    component={MarkAttendance}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="AsgDetails"
                    component={AsgDetails}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Datesheet"
                    component={Datesheet}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="StudentPerformance"
                    component={StudentPerformance}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="GradeStudent"
                    component={GradeStudent}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="DashboardAdmin"
                    component={DashboardAdmin}
                    options={{
                        headerShown: false

                    }}
                />
                <Stack.Screen
                    name="AddTimetable"
                    component={AddTimetable}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AssessmentSetting"
                    component={AssessmentSetting}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="CheckFeedback"
                    component={CheckFeedback}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="CourseAllocation"
                    component={CourseAllocation}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="QuestionRating"
                    component={QuestionRating}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="Finance"
                    component={Finance}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FeeChallan"
                    component={FeeChallan}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FeeDetails"
                    component={FeeDetails}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewChallan"
                    component={ViewChallan}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="UploadChallan"
                    component={UploadChallan}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewFeeStatus"
                    component={ViewFeeStatus}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="StudentList"
                    component={StudentList}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="StudentFeeStatus"
                    component={StudentFeeStatus}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="HandleFinance"
                    component={HandleFinance}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FinancialAssitanceRequest"
                    component={FinancialAssitanceRequest}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="RequestDetail"
                    component={RequestDetail}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FineList"
                    component={FineList}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AddFine"
                    component={AddFine}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="TakeFine"
                    component={TakeFine}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FinancialAssistance"
                    component={FinancialAssistance}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="FineDetail"
                    component={FineDetail}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="UploadFine"
                    component={UploadFine}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ParentDashboard"
                    component={ParentDashboard}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AddNoticeboard"
                    component={AddNoticeboard}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="NoticeboardDetail"
                    component={NoticeboardDetail}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewNoticeboard"
                    component={ViewNoticeboard}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewFineDetail"
                    component={ViewFineDetail}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AddCourseAdvisor"
                    component={AddCourseAdvisor}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="CourseAdvisor"
                    component={CourseAdvisor}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="CourseAdvisorInformation"
                    component={CourseAdvisorInformation}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name="ViewAdvise"
                    component={ViewAdvise}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="AddPeerEvaluation"
                    component={AddPeerEvaluation}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewEvaluationTeacher"
                    component={ViewEvaluationTeacher}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="TeacherQuestions"
                    component={TeacherQuestions}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="TeacherRanking"
                    component={TeacherRanking}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewRanking"
                    component={ViewRanking}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="InstallmentList"
                    component={InstallmentList}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="InstallmentDetail"
                    component={InstallmentDetail}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewAttendenceCourses"
                    component={ViewAttendenceCourses}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewAsgDetails"
                    component={ViewAsgDetails}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewStudentPerformance"
                    component={ViewStudentPerformance}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
                <Stack.Screen
                    name="ViewExamsDetails"
                    component={ViewExamsDetails}
                    options={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor: '#099e78',
                        }
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};
export default App;




