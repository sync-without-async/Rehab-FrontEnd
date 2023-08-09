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
          <Route path="/" element={<MainPage/>} />
          <Route path="/mycourse" element={<MyCourse/>} />
          <Route path="/coursedetail" element={<CourseDetail/>} /> 
        </Routes>
      </Router>
    </Container>
  );
}
//<Route path="/coursedetail" element={<CourseDetail/>} /> 코스 세부 정보 페이지 조회를 위해 임시로 연결한 것입니다. 나중에 지울 예정 
export default App;


