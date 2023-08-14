import "../../plugins/daterangepicker/daterangepicker.css";
import "../../plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "../../plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css";
import "../../plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "../../plugins/select2/css/select2.min.css";
import "../../plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../../plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css";
import "../../plugins/fontawesome-free/css/all.min.css";

import "../../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css";
import "../../plugins/datatables-responsive/css/responsive.bootstrap4.min.css";
import "../../plugins/select2/css/select2.min.css";
import "../../plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "../../diste/css/adminlte.min.css";
import "../../diste/css/style.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
//import { useContext } from "react";
//import { IdContext } from "../context/AuthContext";

const DashboardStyle = () => {
  //const {handelLogin} = useContext(IdContext)
  const navigate = useNavigate();
  const handelLogout = () => {
    console.log("handellogout");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand navbar-dark navbar-navy">
          <ul className="navbar-nav">
            <li className="nav-item" hidden>
              <a className="nav-link" data-widget="pushmenu" role="button">
                <i className="fas fa-bars"></i>
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown">
                <i className="far fa-user"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <div className="dropdown-item">
                  <div className="media">
                    <img
                      src="/images/avatar5.png"
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">Welcome Admin</h3>
                      <p className="text-sm"></p>
                      {/* <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1"></i> 4 Hours Ago
                      </p> */}
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-item" onClick={handelLogout}>
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a className="brand-link text-center">
            <span className="brand-text font-weight-light">
              <img
                src="/images/logoRounded.png"
                alt=""
                style={{ width: "70%" }}
              />
            </span>
          </a>

          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item ">
                  <Link to="/dashboard" className="nav-link active">
                    <i className="nav-icon fas fa-user"></i>
                    <p>Manage Doctor</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper bgcw">
          {" "}
          <Outlet />
        </div>
        {/* <!-- /.content-wrapper --> */}
      </div>
    </div>
  );
};

export default DashboardStyle;
