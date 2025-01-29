import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="" element={<HomePage />} />

        {/* <Route element={<PublicLayout />}></Route>
        <Route element={<AuthLayout />}>
          <Route path="my-clubs" element={<MyClubPage />} />
          <Route
            path="update-club/:clubId/:myClubId"
            element={<ClubUpdatePage />}
          />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
