import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image_url", userInfo.file);

    axios
      .post("http://127.0.0.1:8000/api/v1/users/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        this.file = [];
        this.filepreview = null;
        setSuccess("Image upload successfully");
        console.log(response.data);
        return response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <form class="form-signin">
        <div className="formdesign">
          {isSucces !== null ? <h4> {isSucces} </h4> : null}
          <div className="form-row">
            <label className="text-white">Select Image :</label>
            <input
              type="file"
              className="form-control"
              name="upload_file"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={(e) => submit(e)}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </form>

      <div class="container px-4 text-center position-absolute top-50 start-50 translate-middle">
        <div class="row gx-5" >
          <div class="col">
            <div class="p-3 border bg-light">
              {userInfo.filepreview !== null ? (
                <img
                  className="previewimg"
                  src={userInfo.filepreview}
                  alt="UploadImage"
                />
              ) : null}
            </div>
          </div>
          <div class="col">
            <div class="p-3 border bg-light">
            {userInfo.filepreview !== null ? (
                <img
                  className="previewimg"
                  src={userInfo.filepreview}
                  alt="UploadImage"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
