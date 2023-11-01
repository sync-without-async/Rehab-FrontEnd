import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MyUserPage from "./pages/User/MyUserPage.jsx";
import DevelopPage from "./pages/DevelopPage.jsx";
import UserUntactReservePage from "./pages/User/UserUntactReservePage.jsx";
import UserReservePage from "./pages/User/UserReservePage.jsx";
import DoctorDashBoardPage from "./pages/Doctor/DoctorDashBoardPage.jsx";
import DoctorChartPage from "./pages/Doctor/DoctorChartPage.jsx";
import DoctorDetailPage from "./pages/Doctor/DoctorDetailPage.jsx";
import DoctorPatientListPage from "./pages/Doctor/DoctorPatientListPage.jsx";
import DoctorUntactReservePage from "./pages/Doctor/DoctorUntactReservePage.jsx";
import TheraDashBoardPage from "./pages/Therapist/TheraDashBoardPage.jsx";
import TheraUntactReservePage from "./pages/Therapist/TheraUntactReservePage.jsx";
import TheraPatientListPage from "./pages/Therapist/TheraPatientListPage.jsx";
import TheraDetailPage from "./pages/Therapist/TheraDetailPage.jsx";
import TheraExerciseListPage from "./pages/Therapist/TheraExerciseListPage.jsx";
import TheraExerciseAddPage from "./pages/Therapist/TheraExerciseAddPage.jsx";
import TheraMakeAssignPage from "./pages/Therapist/TheraMakeAssignPage.jsx";
import styled from "styled-components";
import "./App.scss";
import { ReducerContext } from "./reducer/context.js";

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
            <Route
              path="/useruntactreserve"
              element={<UserUntactReservePage />}
            />
            <Route path="/userreserve" element={<UserReservePage />} />
            <Route path="/doctordash" element={<DoctorDashBoardPage />} />
            <Route path="/doctorchart" element={<DoctorChartPage />} />
            <Route path="/doctordetail" element={<DoctorDetailPage />} />
            <Route
              path="/doctorpatientlist"
              element={<DoctorPatientListPage />}
            />
            <Route
              path="/doctoruntactreserve"
              element={<DoctorUntactReservePage />}
            />
            <Route path="/theradashboard" element={<TheraDashBoardPage />} />
            <Route
              path="/therauntactreserve"
              element={<TheraUntactReservePage />}
            />
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
            <Route path="/theramakeassgin" element={<TheraMakeAssignPage />} />
          </Routes>
        </Container>
      </Router>
    </ReducerContext.Provider>
  );
}

export default App;
