import { useEffect, useRef, useState } from "react";
import {  Link, useParams } from "react-router-dom"
import { BASEURL } from "../../constant/constant";
import domtoimage from "dom-to-image";
import jsPDF from 'jspdf';
import "./PosterContent.css"
import {QRCodeSVG} from 'qrcode.react';
import QRCode from 'react-qr-code';
const PosterContent = () => {

  const [singalDocData ,setSinglDocData] = useState({});
  let {id} = useParams();

  

  const posterRef1 = useRef(null)
  const posterRef2 = useRef(null)


  useEffect(()=>{
       
    GetDoctorById()
  },[])

 async function GetDoctorById(){
  
 
  try {
    let response = await fetch(`${BASEURL}/getdoctor/${id}`);
    let data = await response.json();
    setSinglDocData(data[0]);
  } catch (error) {
    console.log(error)
  }
  }


  
  const profileImageUrl = singalDocData.imgurl || '';


  // const handleSave = async (posterRef,type) => {
  //   const poster = posterRef.current;
  //   const profileImage = poster.querySelector(".profile-poster");
  //   profileImage.style.width = "300px"; // Adjust the width as needed
  //   profileImage.style.height = "300px"; // Adjust the height as needed
  //   const dataUrl = await domtoimage.toPng(poster,{width:700,height:1150});
    
   
  //     if(type==="img"){
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = "poster.png";
  //     link.click();
  //     }
  //     else{
        
  
  //   // // Create a new jsPDF instance
  //    const pdf = new jsPDF();
  
  //   // // Add image to PDF
  //    pdf.addImage(dataUrl, 'PNG', 10, 10, 190, 280);
  
  //   // // Save PDF
  //    pdf.save('poster.pdf');
  //     }
    
  //     const profileImage1 = poster.querySelector(".profile-poster");
  //     profileImage1.style.width = "6em"; // Adjust the width as needed
  //     profileImage1.style.height = "6em"; // Adjust the height as needed
   
  // };

  const handleSave = async (posterRef,type) => {
    const poster = posterRef.current;
  
    // Create a clone of the poster element
    const posterClone = poster.cloneNode(true);
    const profileImageClone = posterClone.querySelector(".profile-poster");
    const profilenameClone = posterClone.querySelector(".name1");
    const mobileClone = posterClone.querySelector(".mobilediv1");
    const cityClone = posterClone.querySelector(".city1");
    
  
    // Modify the clone
   
    profileImageClone.style.width = "700px"; // Adjust the width as needed
    profileImageClone.style.height = "700px"; // Adjust the height as needed
    profileImageClone.style.position = "absolute";
    profileImageClone.style.top = "29%";
    profileImageClone.style.left = "33%";
    profileImageClone.style.borderRadius = "50%";
    
    profilenameClone.style.position = "absolute";
    profilenameClone.style.top = "57%"
    profilenameClone.style.left = "40%";
    profilenameClone.style.fontSize = "150px";
    
    mobileClone.style.position = "absolute";
    mobileClone.style.top = "68.5%"
    mobileClone.style.left = "16%";
    mobileClone.style.fontSize = "90px";
    
    cityClone.style.position = "absolute";
    cityClone.style.top = "68%"
    cityClone.style.left = "55%";
    cityClone.style.fontSize = "100px";
     

    // Create a temporary <img> element with the background image as its source
    const bgImg = new Image();
    bgImg.src = '/images/poster.jpg';
  
    // Wait for the background image to load before generating the image
    bgImg.onload = async () => {
      // Create a temporary canvas
      const canvas = document.createElement("canvas");
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      const ctx = canvas.getContext("2d");
  
      // Draw the background image onto the canvas
      ctx.drawImage(bgImg, 0, 0);
  
      // Draw the poster content on top of the background image
      const dataUrl = await domtoimage.toPng(posterClone, {
        width: 2000,
        height: 3181,
      });
      
      // Get the Image data from the poster content
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        // Draw the poster content on top of the background image
        ctx.drawImage(img, 0, 0);
  
        // Convert the canvas to a data URL and create a download link
        const imageWithBackground = canvas.toDataURL("image/png");
        if(type==="img"){
        const link = document.createElement("a");
        link.href = imageWithBackground;
        link.download = "poster.png";
        link.click();
        }
        else{

          const pdf = new jsPDF();
              pdf.addImage(imageWithBackground, 'PNG', 10, 10, 190, 280);
             pdf.save('poster.pdf');
          
        }
  
        // Clean up the temporary canvas
        canvas.remove();
      };
    };
  };
  const handleSave2 = async (posterRef,type,qrSize) => {
    const poster = posterRef.current;
  
    // Create a clone of the poster element
    const posterClone = poster.cloneNode(true);
    const profileImageClone = posterClone.querySelector(".profile-poster");
    const qrClone = posterClone.querySelector(".qr");

    const profilenameClone = posterClone.querySelector(".name1");
    const mobileClone = posterClone.querySelector(".mobilediv1");
    const cityClone = posterClone.querySelector(".city1");
   
   

    
  
    // Modify the clone
   
    profileImageClone.style.width = "700px"; // Adjust the width as needed
    profileImageClone.style.height = "700px"; // Adjust the height as needed
    profileImageClone.style.position = "absolute";
    profileImageClone.style.top = "29%";
    profileImageClone.style.left = "33%";
    profileImageClone.style.borderRadius = "50%";
    
    profilenameClone.style.position = "absolute";
    profilenameClone.style.top = "57%"
    profilenameClone.style.left = "40%";
    profilenameClone.style.fontSize = "150px";
    
    mobileClone.style.position = "absolute";
    mobileClone.style.top = "68.5%"
    mobileClone.style.left = "16%";
    mobileClone.style.fontSize = "90px";
    
    cityClone.style.position = "absolute";
    cityClone.style.top = "68%"
    cityClone.style.left = "55%";
    cityClone.style.fontSize = "100px";
    

    qrClone.setAttribute("size", qrSize);
    qrClone.style.height="500"
    qrClone.style.width="500"

    console.log(posterClone.innerHTML)
    // Create a temporary <img> element with the background image as its source
    const bgImg = new Image();
    bgImg.src = '/images/poster.jpg';
  
    // Wait for the background image to load before generating the image
    bgImg.onload = async () => {
      // Create a temporary canvas
      const canvas = document.createElement("canvas");
      canvas.width = bgImg.width;
      canvas.height = bgImg.height;
      const ctx = canvas.getContext("2d");
  
      // Draw the background image onto the canvas
      ctx.drawImage(bgImg, 0, 0);
  
      // Draw the poster content on top of the background image
      const dataUrl = await domtoimage.toPng(posterClone, {
        width: 2000,
        height: 3181,
      });
      
      // Get the Image data from the poster content
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        // Draw the poster content on top of the background image
        ctx.drawImage(img, 0, 0);
  
        // Convert the canvas to a data URL and create a download link
        const imageWithBackground = canvas.toDataURL("image/png");
        if(type==="img"){
        const link = document.createElement("a");
        link.href = imageWithBackground;
        link.download = "poster.png";
        link.click();
        }
        else{

          const pdf = new jsPDF();
              pdf.addImage(imageWithBackground, 'PNG', 10, 10, 190, 280);
             pdf.save('poster.pdf');
          
        }
  
        // Clean up the temporary canvas
        canvas.remove();
      };
    };
  };
  return (
 
        <div>
           
            <div className="content-header" style={{ backgroundColor: "#c0ebff" }}>
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                      
                        </div>
                      
                        <Link to="/dashboard" className="col-sm-12 text-left">
                          <button type="button"  className="docbtn btn btn-primary">
                            <i className="fas fa-arrow-left"></i>
                            </button>
                          </Link>
                    </div>
                </div>
            </div>
           
            <section className="content mt-5" style={{width:"90%",margin:"auto"}} >
                <div className="container-fluid"  >
                    <div className="row">
                        <div  >
                            <div className="card bg-light mg-l" style={{width:"270px"}} >
                              
                              <div className="card-body pt-0 poster-image" ref={posterRef1}>
                                <div className="row">
                                 
                                  <div className=" text-center">
                                   
                                    <div className="profile-image">
                          <img
                            src={`${BASEURL}/uploads/${profileImageUrl}`}
                            alt=""
                            className="profile-poster"
                          />
                        <div className="name1">
                         {singalDocData.name}
                      </div>
                      <div className="mobilediv1">
                         {singalDocData.mobile}
                      </div>
                      <div className="city1">
                         {singalDocData.city}
                      </div>
                        </div>

                       
                      
                       
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                                
                                <div className="text-center ">
                                    <div onClick={() => handleSave(posterRef1,"img")} className="btn btn-sm btn-danger m-1">
                                        <i className="fas fa-download"></i>  Image
                                      </div>
                                      <div onClick={() => handleSave(posterRef1)} className="btn btn-sm btn-danger m-1">
                                        <i className="fas fa-download"></i>  Pdf
                                      </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        
                          <div >
                          <div className="card bg-light mg-l" style={{width:"270px"}} >
                              
                              <div className="card-body pt-0 poster-image" ref={posterRef2}>
                               <div style={{position:"absolute",top:"4%",zIndex:0}}>
                               <QRCodeSVG className="qr" size={100} value={`https://qrcode.netcastservice.co.in/dashboard/video/${singalDocData.name}/${id}`} />
                               </div>
                                
                                <div className="row">
                                  <div className=" text-center">

                                    <div className="profile-image">
                          <img
                            src={`${BASEURL}/uploads/${profileImageUrl}`}
                            alt=""
                            className="profile-poster"
                          />

                        <div className="name1">
                         {singalDocData.name}
                      </div>
                      <div className="mobilediv1">
                         {singalDocData.mobile}
                      </div>
                      <div className="city1">
                         {singalDocData.city}
                      </div>
                        </div>
                          
                        
                                  </div>
                                </div>
                              </div>
                              <div className="card-footer">
                              
                                <div className="text-center">
                                    <div onClick={() => handleSave2(posterRef2,"img",500)} className="btn btn-sm btn-danger m-1">
                                        <i className="fas fa-download"></i>  Image
                                      </div>
                                      <div onClick={() => handleSave2(posterRef2)} className="btn btn-sm btn-danger m-1">
                                        <i className="fas fa-download"></i>  Pdf
                                      </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          

                    </div>
                    
                </div>
            </section>

        </div>
       
   
  )
}

export default PosterContent

