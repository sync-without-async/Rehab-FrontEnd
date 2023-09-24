import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx";
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
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
