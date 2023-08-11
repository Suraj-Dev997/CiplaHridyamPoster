import "./popupSubmit.css"
const ConfirmationPopup1 = ({name,city,mobile,img,specility, onConfirm, onCancel }) => {
    return (
      <div className="popup-container">
        
        <div className="popup">
        <div className="container-fluid">
    <div className="row">
        <div className="col-12 mt-3">
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                        {img && <img className="" src={URL.createObjectURL(img)} alt="Card image cap" 
                        style={{height:"200px",width:"150"}}/>}
                    </div>
                    <div className="card-body">
                        <p className="card-text"><span className="btcolor">Dr Name :</span> {name}</p>
       
                        <p className="card-text"><span className="btcolor">City :</span> {city}</p>
                        <p className="card-text"><span className="btcolor">Mobile No. :</span>{mobile}</p>
                        <p className="card-text"><span className="btcolor">Specility: </span>{specility}</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
          <p>Are you sure you want to add Doctor?</p>
          <div className="popup-buttons">
            <button onClick={onCancel}>Cancel</button>
            <button data-dismiss="modal"
                         aria-label="Close"
                         onClick={onConfirm}>OK</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationPopup1;