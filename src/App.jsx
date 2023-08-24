import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import styled from "styled-components";
import MyCourse from "./pages/MyCourse.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";

const Container = styled.div`
  background-color: transparent;
  height: 100%;
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
