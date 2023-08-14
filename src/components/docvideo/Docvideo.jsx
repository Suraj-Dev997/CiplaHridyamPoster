import { Link, useParams } from "react-router-dom";
import "./Docvideo.css";
import { useEffect, useState } from "react";
import { BASEURL } from "../../constant/constant";
const Docvideo = () => {
  const { name, id } = useParams();

  const [videos, setGetDoctorVideo] = useState([]);
  const [getDoctor, setGetDoctor] = useState({});

  const [isOpen, setOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleOpenModal = (videoIndex) => {
    setOpen(true);
    setCurrentVideoIndex(videoIndex);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentVideoIndex(0);
  };

  useEffect(() => {
    GetDoctorById();
  }, []);

  useEffect(() => {
    GetVideosById();
  }, [videos]);

  async function GetVideosById() {
    try {
      let response = await fetch(`${BASEURL}/getvideos/${id}`);
      let data = await response.json();
      setGetDoctorVideo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetDoctorById() {
    try {
      let response = await fetch(`${BASEURL}/getdoctor/${id}`);

      let data = await response.json();
      setGetDoctor(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {getDoctor && (
        <div className="insta_body">
          <div className="insta-main">
            <div className="insta-wrapper">
              <div className="insta-banner">
                <canvas
                  style={{ backgroundColor: "#3372b58a", width: "100%" }}
                ></canvas>
              </div>
              <div className="insta-details">
                <div className="insta-dp">
                  <img
                    width="150"
                    height="150"
                    src={`${BASEURL}/uploads/${getDoctor.imgurl}`}
                    alt=""
                  />
                </div>
                <div className="insta-name">
                  <h2>
                    {" "}
                    Dr. {getDoctor.name}
                    <span>{getDoctor.specility}</span>
                    <span>{getDoctor.mobile}</span>
                    <span>{getDoctor.city}</span>
                  </h2>
                </div>

                {videos &&
                  videos.map((video, index) => (
                    <div key={index} className="insta-button">
                      <div onClick={() => handleOpenModal(index)}>
                        {video.videoname}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          {/* Video element */}
          <div
            style={{
              position: "relative",
              padding: "10px",
              backgroundColor: "#fff",
              maxWidth: "80%",
              maxHeight: "80%",
              overflow: "hidden",
              borderRadius: "5px",
            }}
          >
            <video
              controls
              autoPlay
              style={{ width: "100%", height: "100%" }}
              onEnded={handleCloseModal}
            >
              <source
                src={`${BASEURL}/uploads/${videos[currentVideoIndex].videourl}`}
                type="video/mp4"
              />
              {/* Add more video formats if needed */}
            </video>

            {/* Close button */}
            {/* <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '50px',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              &times;
            </button> */}

            {/* Video name and close button */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {/* <p>{videos[currentVideoIndex].videoname}</p> */}
              <button
                onClick={handleCloseModal}
                style={{
                  background: "#0e3e6d",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  float: "right",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Docvideo;
