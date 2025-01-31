import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { store } from "./store";
import { Provider } from "react-redux";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import ModulesPage from "./pages/ModulesPage";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import UserSettingsPage from "./pages/UserSettingsPage";
import ModuleDetailsPage from "./pages/ModuleDetailsPage";
import ModulesUnclockedPage from "./pages/ModulesUnclockedPage";
import NotFoundPage from "./pages/NotFoundPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route element={<PublicLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="user-settings" element={<UserSettingsPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="module/details/:id" element={<ModuleDetailsPage />} />
            <Route path="modules/unlocked" element={<ModulesUnclockedPage />} />
          </Route>
          <Route path=":notFound" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
