import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MyUserPage from "./pages/User/MyUserPage.jsx";
import DevelopPage from "./pages/DevelopPage.jsx";
import ReservationCreatePage from "./pages/Reservation/ReservationCreatePage.jsx";
import DoctorDashBoardPage from "./pages/Doctor/DoctorDashBoardPage.jsx";
import DoctorChartPage from "./pages/Doctor/DoctorChartPage.jsx";
import DoctorDetailPage from "./pages/Doctor/DoctorDetailPage.jsx";
import DoctorPatientListPage from "./pages/Doctor/DoctorPatientListPage.jsx";
import TheraDashBoardPage from "./pages/Therapist/TheraDashBoardPage.jsx";
import TheraPatientListPage from "./pages/Therapist/TheraPatientListPage.jsx";
import TheraDetailPage from "./pages/Therapist/TheraDetailPage.jsx";
import TheraExerciseListPage from "./pages/Therapist/TheraExerciseListPage.jsx";
import TheraExerciseAddPage from "./pages/Therapist/TheraExerciseAddPage.jsx";
import TheraMakeAssignPage from "./pages/Therapist/TheraMakeAssignPage.jsx";
import styled from "styled-components";
import "./App.scss";
import { ReducerContext } from "./reducer/context.js";
import ReservationListPage from "./pages/Reservation/ReservationListPage.jsx";
import ReservationMeetingPage from "./pages/Reservation/ReservationMeetingPage.jsx";

const Container = styled.div`
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow: auto;
`;

function App() {
  return (
    <ReducerContext.Provider value={[null, null]}>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<DevelopPage />} />
            <Route path="/userdash" element={<MyUserPage />} />
            <Route path="/userreserve" element={<ReservationCreatePage />} />
            <Route path="/doctordash" element={<DoctorDashBoardPage />} />
            <Route path="/doctorchart" element={<DoctorChartPage />} />
            <Route path="/doctordetail" element={<DoctorDetailPage />} />
            <Route
              path="/doctorpatientlist"
              element={<DoctorPatientListPage />}
            />
            <Route path="/theradashboard" element={<TheraDashBoardPage />} />
            <Route
              path="/therapatientlist"
              element={<TheraPatientListPage />}
            />
            <Route path="/theradetail" element={<TheraDetailPage />} />
            <Route
              path="/theraexerciselist"
              element={<TheraExerciseListPage />}
            />
            <Route
              path="/theraexerciseadd"
              element={<TheraExerciseAddPage />}
            />
            <Route
              path="/program/assign/:id"
              element={<TheraMakeAssignPage />}
            />
            <Route path="/untact/list" element={<ReservationListPage />} />
            <Route
              path="/untact/meeting/:uuid"
              element={<ReservationMeetingPage />}
            />
          </Routes>
        </Container>
      </Router>
    </ReducerContext.Provider>
  );
}

export default App;
