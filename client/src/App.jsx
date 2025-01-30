import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ModulesPage from "./pages/ModulesPage";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserSettingsPage from "./pages/UserSettingsPage";
import ModuleDetailsPage from "./pages/ModuleDetailsPage";
import ModulesUnclockedPage from "./pages/ModulesUnclockedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="user-settings" element={<UserSettingsPage />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="module/details/:id" element={<ModuleDetailsPage />} />
          <Route path="modules/unlocked" element={<ModulesUnclockedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
