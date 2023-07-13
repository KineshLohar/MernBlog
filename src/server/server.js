const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

mongoose
  .connect("mongodb://localhost:27017/MERNblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully with the database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const Blog = require("./models/Blog.js");
let savedDraft = null;


router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.post("/autosave", async (req, res) => {
  try {
    const { postTitle, postBody } = req.body;
    savedDraft = {
      title: postTitle,
      content: postBody,
    };
    console.log("Draft saved:", savedDraft);
    res.status(200).json(savedDraft);
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ error: "Failed to save draft" });
  }
});

router.get("/getDraft", async (req, res) => {
  try {
    res.status(200).json(savedDraft);
  } catch (error) {
    console.error("Error getting draft:", error);
    res.status(500).json({ error: "Failed to get draft" });
  }
});

router.post("/createBlog", async (req, res) => {
  try {
    const { postTitle, postBody } = req.body;
    const newBlog = new Blog({
      title: postTitle,
      content: postBody,
    });
    const savedBlog = await newBlog.save();
    console.log("Saved Blog:", savedBlog);

    savedDraft = null;
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error saving blog post:", error);
    res.status(500).json({ error: "Failed to save blog post" });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
});


router.delete("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    console.log("Blog deleted");
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

app.use("/", router); // Mount the router at the root path

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started running on 3000");
});
