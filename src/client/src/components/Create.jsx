import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [savedDraft, setSavedDraft] = useState(null);

  useEffect(() => {
    getDraft();
  }, []);

  const getDraft = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getDraft");
      const draftData = response.data;
      if (draftData) {
        setSavedDraft(draftData);
        setPostTitle(draftData.title);
        setPostBody(draftData.content);
      }
    } catch (error) {
      console.error("Error getting draft:", error);
    }
  };

  const saveDraft = async () => {
    try {
      await axios.post("http://localhost:3000/autosave", {
        postTitle,
        postBody,
      });
      console.log("Draft saved");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/createBlog", {
        postTitle,
        postBody,
      });

      console.log("Blog created");
      setSavedDraft(null); // Clear the saved draft
      navigate("/");
      // Perform any further actions after successful blog creation
    } catch (error) {
      console.error("Error creating blog:", error);
      // Handle the error accordingly
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "postTitle") {
      setPostTitle(value);
    } else if (name === "postBody") {
      setPostBody(value);
    }
    saveDraft(); // Autosave draft on input change
  };

  return (
    <div className="container">
      <h1>Compose</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="postTitle"
            className="form-control"
            id="exampleFormControlInput1"
            value={postTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postBody" className="form-label">
            Post
          </label>
          <textarea
            name="postBody"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            value={postBody}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" name="submit" className="btn btn-primary">
          Publish
        </button>
      </form>
    </div>
  );
}

export default Create;
