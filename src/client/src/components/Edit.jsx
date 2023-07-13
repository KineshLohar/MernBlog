import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/${id}`)
      .then((response) => {
        console.log("Fetched single blog:", response.data);
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching single blog:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/blog/${id}`, {title: blog.title, content: blog.content});
      console.log("Blog updated");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="exampleFormControlInput1"
            value={blog.title || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            value={blog.content || ""}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Edit;
