

import { Link } from "react-router-dom";
import "./DocReports.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../constant/constant";
import FileSaver from "file-saver";
import JSZip from "jszip";
const Reports = () => {
 
  const [emp,setEmp] = useState([]);
  const [emplength,setEmpLength] = useState("")
  const [currentPage,setCurrentPage] = useState(1);

  const handelNext = ()=>{
    setCurrentPage((prev)=> prev+1);
  }
  const handelPrevious = ()=>{
    if(currentPage>1){
      setCurrentPage((prev)=>prev-1)
    }
  }
  // useEffect(()=>{
  //   getAllEmp(currentPage)
  // },[currentPage])
   
  useEffect(()=>{
    getAllEmp1()
  },[])
  // async function getAllEmp(page){
  //   try {
  //      let res = await axios.get(`${BASEURL}/getemp?page=${page}&limit=3`);
  //      setEmp(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  async function getAllEmp1(){
    try {
       let res = await axios.get(`${BASEURL}/getAllEmp`);
       setEmp(res.data)
       setEmpLength(res.data.length)
    } catch (error) {
      console.log(error)
    }
  }


  const entriesPerPage = 3;
  const startingEntry = (currentPage - 1) * entriesPerPage + 1;
  const endingEntry = startingEntry+2;
   
  const employeeData = [
    {
      id: 1,
      name: "Employee 1",
      posters: [
        
        
        {  posterUrl: "http://res.cloudinary.com/dlj6ncya1/image/upload/v1690546646/images/rjkmybhmf0asbbwswuae.jpg" },
        {  posterUrl: "http://res.cloudinary.com/dlj6ncya1/image/upload/v1690546646/images/rjkmybhmf0asbbwswuae.png" },
      ],
    },
    {
      id: 2,
      name: "Employee 2",
      posters: [
        {  posterUrl: "https://images.unsplash.com/photo-1682685796186-1bb4a5655653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" },
        {  posterUrl: "http://example.com/posterD.png" },
      ],
    },
    // Add more employees and doctors here
  ];

  // const handelDownload = ()=>{
    
  //   const zip = new JSZip();

  //   // Loop through the employee data
  //   employeeData.forEach((employee) => {
  //     const { name, posters } = employee;
  //     const employeeFolder = zip.folder(name);

  //     // Add doctor posters to the employee folder
  //     posters.forEach((poster, index) => {
  //       // Assuming the poster is a binary or URL representing the poster file
  //       // You need to adjust this part based on your actual data structure
  //       const posterFileName = `poster_${index + 1}.jpg`;
  //       employeeFolder.file(posterFileName, poster.posterUrl, { binary: true });
  //     });
  //   });
  //    // Generate the zip file
  //    zip.generateAsync({ type: 'blob' }).then((content) => {
  //     // Save the zip file
  //     FileSaver.saveAs(content, 'employee_posters.zip');
  //   });
  // }

  const handelDownload = async () => {
    const zip = new JSZip();
  
    // Loop through the employee data
    for (const employee of employeeData) {
      const { name, posters } = employee;
      const employeeFolder = zip.folder(name);
  
      // Add doctor posters to the employee folder
      for (let i = 0; i < posters.length; i++) {
        try {
          const response = await fetch(posters[i].posterUrl);
          const blob = await response.blob();
          employeeFolder.file(`poster_${i + 1}.jpg`, blob, { binary: true });
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }
  
    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Save the zip file
      FileSaver.saveAs(content, "employee_posters.zip");
    });
  };


  return (
    <div className="page-container">
      <div className="page-sidebar">
        {/* X-NAVIGATION */}
        <ul className="x-navigation">
          <li className="xn-logo">
            <Link to={"/report"}>
              <h1>Logo</h1>
            </Link>
           
          </li>
        
          <li>
            <Link to={"/report"}>
              <span className="fa fa-file-pdf-o"></span> <span className="xn-text">Reports</span>
            </Link>
          </li>
        </ul>
        {/* END X-NAVIGATION */}
      </div>

      {/* PAGE CONTENT */}
      <div className="page-content">
        {/* START X-NAVIGATION VERTICAL */}
        <ul className="x-navigation x-navigation-horizontal x-navigation-panel">
        

          <li className="xn-icon-button pull-right dropdown">
            <a href="#" data-toggle="dropdown">
              <span className="fa fa-user"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a  className="dropdown-item">
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
                  
                  <Link to={"/AdminLogin"} className="dropdown-item">
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </Link>
                </a>
              </div>
          </li>
        </ul>

        <div className="page-title">
          <h2> All users</h2>
        </div>

        {/* PAGE CONTENT WRAPPER */}
        <div className="page-content-wrap">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <select
                  name=""
                  id=""
                  className=""
                  style={{
                    padding: '5px',
                    borderRadius: '0.4em',
                    width: '60%',
                  }}
                >
                  <option value="">Filter1</option>
                  <option value="">Filter2</option>
                </select>
              </div>
              <div className="col-md-5"></div>
              <div className="col-md-3 ">
                <button className="btn btn-success btn-block mb-5 createuser" 
                onClick={handelDownload}
                >Download</button>
              </div>

              {/* START DEFAULT DATATABLE */}
              <div className="panel panel-default">
                <div className="row treg">
                  <div className="col-md-4 col20">
                    <div className="bgc bgc_4">
                      <span>Total Employees</span>
                      <h2 className="h2cus">
                        {' '}
                        {emplength && <span id="totalreg">{emplength}</span>}{' '}
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4 col20">
                    <div className="bgc bgc_2">
                      <span>Total Doctor Poster</span>
                      <h2 className="h2cus">
                        {' '}
                        <span id="totalreg">1</span>{' '}
                      </h2>
                    </div>
                  </div>

                  <div className="col-md-4 col20">
                    <div className="bgc bgc_5">
                      <span>
                        Total Uploaded Poster on <span id="seldatespan"></span>{' '}
                      </span>
                      <h2 className="h2cus">
                        {' '}
                        <span id="todayreg">0</span>{' '}
                        <span className="iconh" data-toggle="modal" data-target="#exampleModal">
                          {' '}
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <table className="table datatable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>HQ</th>
                        
                        
                        <th>Designation</th>
                        
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emp && emp.map((employee)=>{
                        return(
                      <tr key={employee.EmpCode}>
                        <td>{employee.name}</td>
                        
                        <td>{employee.city}</td>
                      
                        
                        <td>{"ME"}</td>
                        
                        <td>
                          {' '}
                          <Link to={`/viewdoc/${employee.emp_id}`}>
                            {' '}
                            <button type="button" className="btn btn-info active">
                              <span className="fa fa-file"></span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                        )
                      })}
                      
                    </tbody>
                  </table>
                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      padding:"0px 10px"
                    }}>
                      <div> Showing {startingEntry} to {endingEntry} of {emplength} entries</div>
                      <div>
                        <button className="pag-but" onClick={handelPrevious}>Previous</button>
                         <button className="pag-but pag-but-bg" >{currentPage}</button>
                        <button className="pag-but" onClick={handelNext}>Next</button>
                      </div>
                    </div>
                </div>
              </div>
              {/* END DEFAULT DATATABLE */}
            </div>
          </div>
        </div>
        {/* PAGE CONTENT WRAPPER */}
      </div>
      {/* END PAGE CONTENT */}
    </div>
   
  );
};

export default Reports;