import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MyUserPage from './pages/User/MyUserPage.jsx';
import DevelopPage from './pages/DevelopPage.jsx';
import UserUntactReservePage from './pages/User/UserUntactReservePage.jsx';
import UserReservePage from './pages/User/UserReservePage.jsx';
import DoctorDashBoardPage from './pages/Doctor/DoctorDashBoardPage.jsx';
import DoctorChartPage from './pages/Doctor/DoctorChartPage.jsx';
import DoctorDetailPage from './pages/Doctor/DoctorDetailPage.jsx';
import DoctorPatientListPage from './pages/Doctor/DoctorPatientListPage.jsx';
import DoctorUntactReservePage from './pages/Doctor/DoctorUntactReservePage.jsx';
import TheraDashBoardPage from './pages/Therapist/TheraDashBoardPage.jsx';
import TheraUntactReservePage from './pages/Therapist/TheraUntactReservePage.jsx';
import styled from "styled-components";
import "./App.scss";

const Container = styled.div`
  background-color: transparent;
  height: 100%;
`;

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<DevelopPage />} />
          <Route path="/userdash" element={<MyUserPage/>}/>
          <Route path="/useruntactreserve" element={<UserUntactReservePage/>} />
          <Route path="/userreserve" element={<UserReservePage />} />
          <Route path="/doctordash" element={<DoctorDashBoardPage />} />
          <Route path="/doctorchart" element={<DoctorChartPage />} />
          <Route path="/doctordetail" element={<DoctorDetailPage />} />
          <Route path="/doctorpatientlist" element={<DoctorPatientListPage />} />
          <Route path="/doctoruntactreserve" element={<DoctorUntactReservePage />} />
          <Route path="/theradashboard" element={<TheraDashBoardPage  />} />
          <Route path="/therauntactreserve" element={<TheraUntactReservePage  />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
