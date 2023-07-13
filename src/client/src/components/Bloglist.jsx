import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Bloglist() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the API
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [blogs]);

  const trimContent = (content) => {
    if (content.length > 100) {
      return content.substring(0, 100) + "...";
    }
    return content;
  };

  return (
    <div>
       <div className="blog-list">
      {
      blogs.length === 0 ? <h1 style={{position:"absolute", justifySelf:"center"}}>Create some blogs to show</h1> :
      blogs.map((blog) => (
        <div key={blog._id} className="blog-post">
          <Link to={`/blog/${blog._id}`}>
              <h3 className="blog-title">{blog.title}</h3>
            </Link>
            <p className="blog-content">{trimContent(blog.content)}</p>
          <hr style={{width:"80%", color:"#000", marginTop:"40px"}}/>
        </div>  
      ))
      
      }
    </div>
    <Footer />
    </div>
   
  );
}

export default Bloglist;
