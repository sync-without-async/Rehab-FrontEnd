import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import styled from "styled-components";

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
        </Routes>
      </Router>
    </Container>
  );
}

export default App;


