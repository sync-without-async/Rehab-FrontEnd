import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import styled from "styled-components";
import MyCourse from "./pages/MyCourse.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import AddExercise from "./pages/AddExercise.jsx";
import { ModalProvider } from "./librarys/context.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";
import store from "./redux/store.js";

import LoginModal from "./components/LoginModal.jsx";
import { useEffect } from "react";
import { loadToken } from "./librarys/login-api.js";
import { login } from "./redux/userSlice.js";

const Container = styled.div`
  background-color: transparent;
  height: 100%;
`;

function App() {
  const dispatch = store.dispatch;

  // Login logic
  useEffect(() => {
    loadToken().then((result) => {
      if (!result) {
        return;
      } else {
        dispatch(login(result));
      }
    });
  });

  return (
    <Provider store={store}>
      <ModalProvider>
        <Container>
          <LoginModal />
          <Router>
            <Routes>
              <Route path="/program/:pno" element={<CourseDetail />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<AddExercise />} />
              <Route path="/player/:id" element={<PlayerPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/mycourse" element={<MyCourse />} />
            </Routes>
          </Router>
        </Container>
      </ModalProvider>
    </Provider>
  );
}

export default App;