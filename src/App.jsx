import { Route, Routes } from "react-router-dom";
import DashboardStyle from "./style/DashboardStyle";
import DashboardContent from "./components/Dashboard/DashboardContent";
import PosterContent from "./components/Poster/PosterContent";
import Docvideo from "./components/docvideo/Docvideo";
import Login from "./components/login/login";
import ProtectdRoute from "./protectedRoutes/ProtectdRoute";
import AdminLogin from "./Admin/login/ALogin";
import Reports from "./Admin/Reports/DocReports";
import ViewDoc from "./Admin/ViewDoc/ViewDoc";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin></AdminLogin>} />
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/viewdoc/:id" element={<ViewDoc />} />
        <Route path="/" element={<Login />} />
        <Route element={<DashboardStyle />}>
          <Route
            path="/dashboard"
            element={
              <ProtectdRoute>
                <DashboardContent />
              </ProtectdRoute>
            }
          />
          <Route
            path="/dashboard/poster/:id"
            element={
              <ProtectdRoute>
                <PosterContent />
              </ProtectdRoute>
            }
          />
          <Route path="/dashboard/video/:name/:id" element={<Docvideo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
