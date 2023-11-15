import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DevelopPage from "./pages/DevelopPage.jsx";
import ReservationCreatePage from "./pages/Reservation/ReservationCreatePage.jsx";
import DoctorChartPage from "./pages/Doctor/DoctorChartPage.jsx";
import DoctorDetailPage from "./pages/Doctor/DoctorDetailPage.jsx";
import TheraDetailPage from "./pages/Therapist/TheraDetailPage.jsx";
import TheraExerciseListPage from "./pages/Therapist/TheraExerciseListPage.jsx";
import TheraExerciseAddPage from "./pages/Therapist/TheraExerciseAddPage.jsx";
import TheraMakeAssignPage from "./pages/Therapist/TheraMakeAssignPage.jsx";
import styled from "styled-components";
import "./App.scss";
import { ReducerContext } from "./reducer/context.js";
import ReservationListPage from "./pages/Reservation/ReservationListPage.jsx";
import ReservationMeetingPage from "./pages/Reservation/ReservationMeetingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PatientListPage from "./pages/PatientListPage.jsx";
import ProgramPage from "./pages/ProgramPage.jsx";

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
            <Route path="/" element={<DevelopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/meeting/create" element={<ReservationCreatePage />} />
            <Route path="/chart/create" element={<DoctorChartPage />} />
            <Route path="/chart/:id" element={<DoctorDetailPage />} />
            <Route path="/chart" element={<PatientListPage />} />
            {/* <Route path="/chart/:id" element={<TheraDetailPage />} /> */}
            <Route path="/video" element={<TheraExerciseListPage />} />
            <Route path="/video/create" element={<TheraExerciseAddPage />} />
            <Route path="/chart/:id/assign" element={<TheraMakeAssignPage />} />
            <Route path="/meeting" element={<ReservationListPage />} />
            <Route
              path="/meeting/room/:uuid"
              element={<ReservationMeetingPage />}
            />
            <Route path="/program/:id" element={<ProgramPage />} />
          </Routes>
        </Container>
      </Router>
    </ReducerContext.Provider>
  );
}

export default App;
