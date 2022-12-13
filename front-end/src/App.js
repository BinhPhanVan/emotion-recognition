import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [avatarRes, setavatarRes] = useState("");
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
    setavatarRes("");
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image_url", userInfo.file);
    axios
      .post("http://127.0.0.1:8000/api/v1/users/", formdata)
      .then((response) => {
        setSuccess("scess");
        setavatarRes(response.data["image_url"]);
      })
      .catch((err) => {
        setavatarRes(
          "https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg"
        );
      });
  };

  return (
    <div class="bg">
      <div className="container-fluid">
        <div className="formdesign pt-5 pb-3">
          <div className="form-row">
            <label className="text-white">Select Image :</label>
            <input
              type="file"
              className="form-control"
              name="upload_file"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div class="container px-4 text-center position-absolute top-50 start-50 translate-middle">
            <div class="row gx-5">
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
                <div className="form-row text-center position-absolute top-50 start-50 translate-middle">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => submit(e)}
                  >
                    {" "}
                    Emotion recognition{" "}
                  </button>
                </div>
              </div>
              <div class="col">
                <div class="p-3 border bg-light">
                  {avatarRes !== "" ? (
                    <img
                      className="previewimg"
                      src={avatarRes}
                      alt="UploadImage"
                    />
                  ) : (
                    <img className="previewimg" src="" alt="UploadImage" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
