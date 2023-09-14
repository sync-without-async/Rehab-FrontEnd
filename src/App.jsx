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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./App.scss";

const Container = styled.div`
  background-color: transparent;
  height: 100%;
`;

const routerList = [
  { path: "/", element: <MainPage /> },
  { path: "/program/:pno", element: <CourseDetail />, role: 1 },
  { path: "/program/:id/play", element: <PlayerPage />, role: 1 },
  { path: "/mycourse", element: <MyCourse />, role: 1 },
  { path: "/register", element: <AddExercise />, role: 2 },
];

routerList.forEach((item) => {
  if (item.role && item.role > 0) {
    item.element = (
      <ProtectedRoute role={item.role} to={item.redirect}>
        {item.element}
      </ProtectedRoute>
    );
  }
});

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
              {routerList.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Routes>
          </Router>
        </Container>
      </ModalProvider>
    </Provider>
  );
}

export default App;
