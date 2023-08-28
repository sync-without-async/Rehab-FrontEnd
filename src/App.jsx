import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import styled from "styled-components";
import MyCourse from "./pages/MyCourse.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import AddExercise from "./pages/AddExercise.jsx";
import { ModalProvider } from './librarys/context.jsx'; 
import PlayerPage from "./pages/PlayerPage.jsx";
import store from './redux/store.js';

const Container = styled.div`
  background-color: transparent;
  height: 100%;
`;

function App() {
  return (
    <Provider store={store}>
    <ModalProvider>
    <Container>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<AddExercise />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/coursedetail/:id" element={<CourseDetail />} />
        </Routes>
      </Router>
    </Container>
    </ModalProvider>
    </Provider>
  );
}

export default App;
