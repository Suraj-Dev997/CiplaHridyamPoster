
import { useState } from "react";
import style from "./ALogin.module.css"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(username==="admin" && password==="admin123"){
        navigate("/report")
        toast.success("Login successful");

    }
    else{
        toast.error("Invalid Credential");
    }
    // Add your login logic here, using 'username' and 'password' state
  };

  return (
    <div className={style.main_div_container}>
        <section className={style.ftco_section}>
      <div className={style.container}>
        <div className={`${style.row} ${style.justify_content_center}`}>
          <div className={`${style.col_md_7} ${style.col_lg_5}`}>
            <div className={`${style.login_wrap} ${style.p_1} ${style.p_md_5} ${style.pb_1}`}>
              <div className={style.d_flex}>
                <div className={`${style.w_100} ${style.mt_1} ${style.text_center}`}>
                  <h2 style={{ color: "#fff", fontWeight: 600 }}>Admin Login</h2>
                </div>
              </div>
              <form onSubmit={handleSubmit} className={style.login_form}>
                <div className={style.form_group}>
                  <div className={`${style.icon} ${style.d_flex} ${style.align_items_center} ${style.justify_content_center}`}>
                    <span className="fa fa-user"></span>
                  </div>
                  <input
                    type="text"
                    className={`${style.form_control} ${style.rounded_left} ${style.mg_bot}`}
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={style.form_group}>
                  <div className={`${style.icon} ${style.d_flex} ${style.align_items_center} ${style.justify_content_center}`}>
                    <span className="fa fa-lock"></span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className={`${style.form_control} ${style.rounded_left} ${style.mg_bot}`}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={`${style.form_group} ${style.d_flex} ${style.align_items_center}`}>
                  <div className={`${style.w_100} ${style.d_flex} ${style.justify_content_end}`}>
                    <button type="submit" className={`${style.btn} ${style.mg_bot} ${style.btn_primary} ${style.rounded} ${style.submit}`}>
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </section>
    </div>
  );
};

export default AdminLogin;
