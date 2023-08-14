import "./DashboardContent.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASEURL } from "../../constant/constant";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationPopup from "./popup";
import Loader from "../utils/Loader";
import CropImg from "../utils/CropImg";
//import ConfirmationPopup1 from "./popupSubmit";

const DashboardContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [doctordata, setDoctordata] = useState([]);

  const [name, setName] = useState("");
  const [city, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [specility, setSpecility] = useState("");
  const [img, setImage] = useState("");
  const [img1, setImage1] = useState("");
  const [vid, setVideo] = useState("");
  const [videoname, setVideoName] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [cropper, setCropper] = useState();
  const [cropmodel, setCropmodel] = useState(false);
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "docimage.png");
        });
      if (file) {
        setImage(file);
      }
    }
    setCropmodel(false);
  };

  const setCropperFun = (cropvalue) => {
    setCropper(cropvalue);
  };

  useEffect(() => {
    getDoctor();
  }, []);

  async function getDoctor() {
    const response = await fetch(`${BASEURL}/doc-data`);
    const data = await response.json();
    setDoctordata(data);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!img || !name || !city || !mobile || !specility || !vid || !videoname) {
      toast.error("Missing required fields");
      return;
    }
    setShowConfirmation(true);

    // try {
    //   //toast.info("Loading...");
    //   setLoading(true);
    //   const formdata = new FormData();

    //   formdata.append("image", img);
    //   formdata.append("name", name);
    //   formdata.append("city", city);
    //   formdata.append("mobile", mobile);
    //   formdata.append("specility", specility);

    //   const doctorPromise = await axios.post(`${BASEURL}/add-doctor`, formdata);

    //   let user_id = doctorPromise.data.doctorId;

    //   await getDoctor();
    //   setLoading(false);
    //   toast.success("Doctor created successfully");
    //   const videoform = new FormData();
    //   videoform.append("video", vid);
    //   videoform.append("user_id", user_id);
    //   videoform.append("videoname",videoname)
    //   axios.post(`${BASEURL}/add-video`, videoform);
    // } catch (error) {
    //   console.log(error);
    // }
    // setName("");
    // setAddress("");
    // setMobile("");
    // setImage("");
    // setVideo("");
    // setSpecility("");
    // setQrcode(false);
    // setCurrentIndex(0);

    //console.log("inside form",name,city,mobile,img,vid);
  };

  const handleConfirm = async () => {
    try {
      //toast.info("Loading...")

      setShowConfirmation(false);
      setLoading(true);
      const formdata = new FormData();

      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("city", city);
      formdata.append("mobile", mobile);
      formdata.append("specility", specility);

      const doctorPromise = await axios.post(`${BASEURL}/add-doctor`, formdata);

      let user_id = doctorPromise.data.doctorId;

      await getDoctor();
      setLoading(false);
      toast.success("Doctor created successfully");
      const videoform = new FormData();
      videoform.append("video", vid);
      videoform.append("user_id", user_id);
      videoform.append("videoname", videoname);
      axios.post(`${BASEURL}/add-video`, videoform);
    } catch (error) {
      console.log(error);
    }
    setName("");
    setAddress("");
    setMobile("");
    setImage("");
    setVideo("");
    setSpecility("");
    setVideoName("");
    setQrcode(false);
    setCurrentIndex(0);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="content-header mainheader">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6"></div>
            <div className="col-sm-12 text-right">
              <button
                type="button"
                id="Login1"
                className="docbtn btn btn-primary"
                data-toggle="modal"
                data-target="#adddoc"
              >
                <i className="fas fa-plus m-1"></i>
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <section
          className="content mt-5"
          style={{ width: "90%", margin: "auto" }}
        >
          <div className="container-fluid">
            <div className="row">
              {doctordata &&
                doctordata.map((doctor, i) => {
                  return (
                    <DoctorList
                      key={i}
                      uploadFile={""}
                      getDoctor={getDoctor}
                      doctor={doctor}
                    ></DoctorList>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <div
        className="modal fade show"
        id="adddoc"
        data-backdrop="static"
        data-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        style={{ paddingRight: "17px" }}
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>

              <div id="container">
                {currentIndex === 3 ? (
                  <div className="contentdiv active">
                    <form id="formlogin" onSubmit={handelSubmit}>
                      <div id="Register" className="AddDocMain text-cente">
                        <h3>Add Doctors Details</h3>

                        <div
                          className="docform  mt-5"
                          style={{ height: "200px" }}
                        >
                          <button
                            type="button"
                            className="btn btn-block bg-gradient-success btn-lg"
                            onClick={() => {
                              setQrcode(true);
                            }}
                          >
                            Generate QR Code
                          </button>
                          {qrcode && <QRCodeSVG value="" />}
                        </div>
                      </div>

                      <input
                        className="btn btn-primary"
                        style={{ width: "200px", marginLeft: "20vw" }}
                        type="submit"
                      />
                    </form>
                  </div>
                ) : currentIndex === 1 ? (
                  <div className="contentdiv active">
                    <form id="formlogin">
                      <div id="Register" className="AddDocMain text-cente">
                        <h3>Add Doctors Details</h3>

                        <div
                          className="docform mt-5"
                          style={{ height: "300px" }}
                        >
                          <div className="form-group">
                            <label>Upload Video*</label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="custom-file-input"
                                  //id="exampleInputFile"
                                  name="video"
                                  onChange={(e) => {
                                    setVideo(e.target.files[0]);
                                  }}
                                />
                                <label className="custom-file-label">
                                  Choose file
                                </label>
                              </div>
                              <div className="input-group-append">
                                <span className="input-group-text" id="">
                                  Upload
                                </span>
                              </div>
                            </div>

                            <div className="row-sm-6">
                              <div
                                className="form-group"
                                style={{
                                  display: "flex",

                                  justifyContent: "space-around",
                                  width: "80%",
                                  marginTop: "10px",
                                  textAlign: "center",
                                }}
                              >
                                <label style={{ marginTop: "5px" }}>
                                  Add Video Name*
                                </label>
                                <input
                                  style={{ width: "50%" }}
                                  type="text"
                                  className="form-control"
                                  value={videoname}
                                  onChange={(e) => {
                                    setVideoName(e.target.value);
                                  }}
                                />
                              </div>
                            </div>

                            {vid && (
                              <div>
                                <video width="250" height="200">
                                  <source
                                    src={URL.createObjectURL(vid)}
                                  ></source>
                                </video>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : currentIndex === 2 ? (
                  <div className="contentdiv active">
                    <form id="formlogin">
                      <div id="Register" className="AddDocMain text-cente">
                        <h3> Doctors Details Preview</h3>

                        <div
                          className="docform mt-5"
                          style={{ height: "300px" }}
                        >
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-12 mt-3">
                                <div className="card">
                                  <div className="card-horizontal">
                                    <div className="img-square-wrapper">
                                      {img && (
                                        <img
                                          className=""
                                          src={URL.createObjectURL(img)}
                                          alt="Doctor Image"
                                          style={{
                                            height: "200px",
                                            width: "180px",
                                          }}
                                        />
                                      )}
                                    </div>
                                    <div className="card-body">
                                      <p className="card-text">
                                        <span className="btcolor">
                                          Dr Name :
                                        </span>{" "}
                                        {name}
                                      </p>

                                      <p className="card-text">
                                        <span className="btcolor">City :</span>{" "}
                                        {city}
                                      </p>
                                      <p className="card-text">
                                        <span className="btcolor">
                                          Mobile No. :
                                        </span>
                                        {mobile}
                                      </p>
                                      <p className="card-text">
                                        <span className="btcolor">
                                          Specility:{" "}
                                        </span>
                                        {specility}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="contentdiv active">
                    <form id="formlogin">
                      <div id="Register" className="AddDocMain text-center">
                        <h3>Add Doctors Details</h3>
                        <div className="docphoto">
                          <div className=" text-center">
                            <img
                              src={
                                img
                                  ? URL.createObjectURL(img)
                                  : "/images/profile_pic.png"
                              }
                              alt=""
                              className="avatar1"
                            />
                            <label htmlFor="upload-input">
                              <div className="icon-container">
                                <i className="fas fa-pen"></i>
                              </div>
                            </label>
                            <input
                              id="upload-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                setCropmodel(true);
                                setImage1(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                            <p>Doctor Photo</p>
                          </div>
                        </div>
                        <div className="docform">
                          <div className="row mt-2">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Dr Name*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value.trim());
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Address*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Address"
                                  maxLength="18"
                                  placeholder=" "
                                  value={city}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Mobile*</label>
                                <input
                                  className="form-control"
                                  type="tel"
                                  name="mobileNumber"
                                  value={mobile}
                                  pattern="\d{10}"
                                  maxLength="10"
                                  onChange={(e) => {
                                    setMobile(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Speciality*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Specility"
                                  maxLength="18"
                                  placeholder=" "
                                  value={specility}
                                  onChange={(e) => {
                                    setSpecility(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-center mt-3">
                            {/* <!-- <button type="button" id="Login1" className="docbtn btn btn-success">Submit</button> --> */}
                            <span className="error regspan"></span>
                            <div
                              style={{
                                fontSize: "13px",
                                color: "#ca1111",
                                textAlign: "left",
                                fontWeight: "700",
                              }}
                            >
                              * Some fields are mandatory to fill.
                              <br />* Image size should be less than 2 MB
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    {cropmodel && (
                      <CropImg
                        img1={img1}
                        setCropperFun={setCropperFun}
                        getCropData={getCropData}
                      />
                    )}
                  </div>
                )}
              </div>

              <button
                id="previousButton"
                className="btn btn-primary "
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                id="nextButton"
                className="btn btn-primary float-right"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {showConfirmation && (
          <ConfirmationPopup
            message="Are you sure you want to Add Doctor?"
            onConfirm={() => handleConfirm()}
            onCancel={handleCancel}
          />
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardContent;

function DoctorList({ doctor, getDoctor }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [img, setImage] = useState(null);
  const [img1, setImage1] = useState("");

  const [name, setName] = useState(doctor.name);
  const [city, setAddress] = useState(doctor.city);
  const [mobile, setMobile] = useState(doctor.mobile);
  const [specility, setSpecility] = useState(doctor.specility);
  const [loading1, setLoading1] = useState(false);

  const [video, setVideo] = useState(null);
  const [videoname, setVideoName] = useState("");

  const [cropper, setCropper] = useState();
  const [cropmodel, setCropmodel] = useState(false);

  const handelEditSubmit = async (e) => {
    e.preventDefault();
    if (video && !videoname) {
      toast.error("videoname is required");
      return;
    }
    if (videoname && !video) {
      toast.error("video is required");
      return;
    }

    setShowConfirmation(true);
  };

  const handelDelete = async (id) => {
    try {
      setLoading1(true);
      await axios.delete(`${BASEURL}/delete/video/${id}`);
      await axios.delete(`${BASEURL}/delete/${id}`);

      await getDoctor();
      setLoading1(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = async (id) => {
    // Hide the confirmation popup
    setShowConfirmation(false);
    setLoading1(true);
    try {
      const formdata = new FormData();

      formdata.append("image", img);
      formdata.append("name", name);
      formdata.append("city", city);
      formdata.append("mobile", mobile);
      formdata.append("specility", specility);

      const doctorPromise = axios.patch(`${BASEURL}/update/${id}`, formdata);

      // toast.promise(doctorPromise, {
      //   pending: 'Updating doctor...',
      //   success: 'Doctor updated successfully',
      //   error: 'Error updating doctor',
      // });
      await doctorPromise;
      await getDoctor();
      toast.success("Doctor Update successfully");
      // setName('');
      // setAddress('');
      // setMobile('');
      // setImage('');
      // setSpecility('')

      if (video) {
        const videoform = new FormData();
        videoform.append("video", video);
        videoform.append("user_id", id);
        videoform.append("videoname", videoname);

        axios.post(`${BASEURL}/add-video`, videoform);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Hide the loader when the operation is complete
      setLoading1(false);
    }
    setVideoName("");
    setVideo("");
  };

  const handleCancel = () => {
    // Hide the confirmation popup
    setShowConfirmation(false);
    // Handle cancellation as needed...
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "docimage.png");
        });
      if (file) {
        setImage(file);
      }
    }
    setCropmodel(false);
  };

  const setCropperFun = (cropvalue) => {
    setCropper(cropvalue);
  };

  const modalId = `infodoc-${doctor.id}`;
  const editId = `editdoc-${doctor.id}`;

  return (
    <div className="col-md-2 p-1">
      {loading1 ? (
        <Loader />
      ) : (
        <div className="card doc_card">
          <div style={{ position: "relative" }}>
            <div className="img__wrap text-center">
              <img
                id=""
                src={`${BASEURL}/uploads/${doctor.imgurl}`}
                width="199"
                height="177"
                className="img__img"
              />

              <div id="outer" className="img__description">
                <div className="inner">
                  <Link to={`poster/${doctor.id}`} title="View">
                    <i className="nav-icon fas fa-image"></i>
                  </Link>
                </div>

                <div className="inner">
                  <a
                    title="Info"
                    data-toggle="modal"
                    data-target={`#${modalId}`}
                  >
                    <i className="nav-icon fas fa-info"></i>
                  </a>
                </div>

                <div className="inner">
                  <a
                    href=""
                    title="Edit"
                    data-toggle="modal"
                    data-target={`#${editId}`}
                  >
                    <i className="nav-icon fas fa-edit"></i>
                  </a>
                </div>

                <div className="inner" onClick={() => handelDelete(doctor.id)}>
                  <a title="Delete">
                    <i className="nav-icon fas fa-trash"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body ">
            <h5
              className="card-title text-center"
              style={{ fontSize: "1.0rem" }}
            >
              <b>{doctor.name}</b>
            </h5>
          </div>
        </div>
      )}

      <div
        className="modal fade show"
        id={modalId}
        // data-backdrop="static"
        //data-keyboard="false"
        style={{ paddingRight: "17px" }}
        //aria-labelledby={`${modalId}-label`}
        // aria-modal="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>

              <div id="Register1" className="AddDocMain text-center">
                <h3> Doctors Details</h3>
                <div className="docphoto">
                  <img
                    // src="dist/img/avatar04.png"
                    src={`${BASEURL}/uploads/${doctor.imgurl}`}
                    alt="doctor-photo"
                    //className="img-circle img-fluid"
                    className="avatar1"
                  />

                  <p>Doctor Photo</p>
                </div>
                <div className="docform">
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Dr Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Name1"
                          maxLength="50"
                          //tabIndex="1"
                          placeholder=" "
                          value={`Dr. ${doctor.name}`}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`Address-${doctor.id}`}
                          maxLength="200"
                          placeholder=" "
                          value={doctor.city}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input
                          type="text"
                          id={`Mobile-${doctor.id}`}
                          className="form-control"
                          maxLength="200"
                          placeholder=" "
                          disabled
                          value={doctor.mobile}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Speciality*</label>
                        <input
                          type="text"
                          className="form-control"
                          id={`Specility-${doctor.id}`}
                          maxLength="18"
                          disabled
                          value={doctor.specility}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade show"
        id={editId}
        style={{ paddingRight: "17px" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close basicedit"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <form onSubmit={(e) => handelEditSubmit(e, doctor.id)}>
                <div className="AddDocMain text-center">
                  <h3>Edit Doctors Details</h3>
                  <div className="docphoto">
                    <div className=" text-center">
                      <img
                        src={
                          img
                            ? URL.createObjectURL(img)
                            : `${BASEURL}/uploads/${doctor.imgurl}`
                        }
                        alt=""
                        className="avatar1"
                      />

                      {/* <label htmlFor="upload-input1">
                                          <div className="icon-container">
                                            <i className="fas fa-pen"></i>
                                          </div>
                                        </label> */}
                      <input
                        // id="upload-input1"
                        style={{ display: "block" }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setCropmodel(true);
                          setImage1(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      <p>Doctor Photo</p>
                    </div>
                  </div>
                  <div className="docform">
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Dr Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value.trim());
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Address*</label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength="18"
                            value={city}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Mobile*</label>
                          <input
                            className="form-control"
                            type="tel"
                            name="mobileNumber"
                            value={mobile}
                            pattern="\d{10}"
                            maxLength="10"
                            onChange={(e) => {
                              setMobile(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Speciliaty*</label>
                          <input
                            type="text"
                            className="form-control"
                            value={specility}
                            onChange={(e) => {
                              setSpecility(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="custom-file">
                      <input
                        type="file"
                        accept="video/*"
                        className="custom-file-input"
                        //id="exampleInputFile"
                        name="video"
                        onChange={(e) => {
                          setVideo(e.target.files[0]);
                        }}
                      />
                      <label className="custom-file-label">
                        Add Doctor Video
                      </label>
                    </div>

                    <div className="row-sm-6">
                      <div
                        className="form-group"
                        style={{
                          display: "flex",

                          justifyContent: "space-around",
                          width: "80%",
                          marginTop: "10px",
                          textAlign: "center",
                        }}
                      >
                        <label style={{ marginTop: "5px" }}>
                          Add Video Name*
                        </label>
                        <input
                          style={{ width: "50%" }}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setVideoName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center mt-3">
                      <input
                        type="submit"
                        value="Submit"
                        style={{ width: "22%" }}
                        className="btn btn-primary"
                      />
                      <span className="error regspan"></span>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#ca1111",
                          textAlign: "left",
                          fontWeight: "700",
                        }}
                      >
                        * Some fields are mandatory to fill.
                        <br />* Image size should be less than 2 MB
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {cropmodel && (
                <CropImg
                  img1={img1}
                  setCropperFun={setCropperFun}
                  getCropData={getCropData}
                />
              )}
            </div>
            {showConfirmation && (
              <ConfirmationPopup
                message="Are you sure you want to edit?"
                onConfirm={() => handleConfirm(doctor.id)}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
