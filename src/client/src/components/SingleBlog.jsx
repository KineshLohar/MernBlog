import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link , useNavigate} from "react-router-dom";


function SingleBlog() {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:3000/blog/${id}`)
      .then(() => {
        console.log("Blog deleted");
        navigate("/"); // Redirect to home page after deleting
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };


  return (
    <div className="single-blog">
      <div className="single-blog-btns">
      <Link to={`/edit/${id}`} className="edit-button">Edit</Link>
      <button onClick={handleDelete} className="btn btn-warning">Delete</button>
      </div>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this blog post?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      
      <h2 className="blog-title">{blog.title}</h2>
      <hr style={{border:"1px solid #555", width:"100%"}}/>
      <p className="blog-content">{blog.content}</p>
      
    </div>
  );
}

export default SingleBlog;
