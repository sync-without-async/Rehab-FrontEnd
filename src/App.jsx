import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DevelopPage from "./pages/DevelopPage.jsx";
import ReservationCreatePage from "./pages/Reservation/ReservationCreatePage.jsx";
import DoctorChartPage from "./pages/Doctor/DoctorChartPage.jsx";
import DoctorDetailPage from "./pages/Doctor/DoctorDetailPage.jsx";
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
import AuthorizedRoute from "./components/Route/AuthorizedRoute.jsx";
import { ROLE_TYPE } from "./librarys/type.js";
import { ToastContainer } from "react-toastify";
import LogoutPage from "./pages/LogoutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ConvertChartPage from "./pages/ConvertChartPage.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getMyInfo, loadTokens } from "./redux/userSlice.js";

const VISITOR = ROLE_TYPE.VISITOR;
const USER = ROLE_TYPE.USER;
const DOCTOR = ROLE_TYPE.DOCTOR;
const THERAPIST = ROLE_TYPE.THERAPIST;

const Container = styled.div`
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow: auto;
`;

const routes = [
  {
    path: "/dev",
    element: <DevelopPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    role: [VISITOR],
  },
  {
    path: "/logout",
    element: <LogoutPage />,
    role: [VISITOR, USER, DOCTOR, THERAPIST],
  },
  {
    path: "/register",
    element: <SignupPage />,
    role: [VISITOR],
  },
  {
    path: "/",
    element: <DashboardPage />,
    role: [USER, DOCTOR, THERAPIST],
  },
  {
    path: "/meeting",
    element: <ReservationListPage />,
    role: [USER, DOCTOR, THERAPIST],
  },
  {
    path: "/meeting/room/:uuid",
    element: <ReservationMeetingPage />,
    role: [USER, DOCTOR, THERAPIST],
  },
  {
    path: "/meeting/create",
    element: <ReservationCreatePage />,
    role: [USER],
  },
  {
    path: "/program/:pno/:ord",
    element: <ProgramPage />,
    role: [USER],
  },
  {
    path: "/chart/create",
    element: <DoctorChartPage />,
    role: [DOCTOR],
  },
  {
    path: "/chart/:id",
    element: <DoctorDetailPage />,
    role: [DOCTOR, THERAPIST],
  },
  {
    path: "/chart-id/:id",
    element: <ConvertChartPage />,
    role: [DOCTOR, THERAPIST],
  },
  {
    path: "/chart",
    element: <PatientListPage />,
    role: [DOCTOR, THERAPIST],
  },
  {
    path: "/video",
    element: <TheraExerciseListPage />,
    role: [THERAPIST],
  },
  {
    path: "/video/create",
    element: <TheraExerciseAddPage />,
    role: [THERAPIST],
  },
  {
    path: "/chart/:id/assign",
    element: <TheraMakeAssignPage />,
    role: [THERAPIST],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    role: [VISITOR, USER, DOCTOR, THERAPIST],
  },
];

routes.forEach((item) => {
  if (item.role && Array.isArray(item.role)) {
    item.element = (
      <AuthorizedRoute whitelist={item.role} to={item.redirect}>
        {item.element}
      </AuthorizedRoute>
    );
  }
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) return () => {};
    const id = Cookies.get("id");
    const role = Cookies.get("role");

    dispatch(getMyInfo({ id, role, accessToken }));
  }, []);

  return (
    <ReducerContext.Provider value={[null, null]}>
      <Router>
        <Header />
        <Container>
          <Routes>
            {routes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
        </Container>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </ReducerContext.Provider>
  );
};

export default App;
