import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import MyUserPage from './pages/User/MyUserPage.jsx';
import DevelopPage from './pages/DevelopPage.jsx';
import UserUntactReservePage from './pages/User/UserUntactReservePage.jsx';
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
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
