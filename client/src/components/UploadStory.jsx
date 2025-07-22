import React, { useState } from "react";
import axios from "axios";

const UploadStory = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    // Replace this with your actual upload endpoint (e.g., Cloudinary or your backend)
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/user/getstoriesuri",
      formData
    ); // change this

    await axios.post(
      "http://localhost:8000/api/v1/user/stories",
      { mediaUrl: data.url },
      { withCredentials: true }
    );
    alert("Story uploaded!");
    setFile(null);
    setPreview("");
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

 return (
  <div className="bg-white p-4 border rounded shadow w-full">
    <h2 className="text-lg font-semibold mb-2">Upload a Story</h2>
    <input
      type="file"
      accept="image/*,video/*"
      onChange={handleFileChange}
      className="mb-2 block"
    />

    {preview && (
      <div className="mb-2">
        <img
          src={preview}
          alt="Preview"
          className="h-40 w-auto rounded border"
        />
      </div>
    )}

    <button
      onClick={handleUpload}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      Upload Story
    </button>
  </div>
);}

export default UploadStory;
