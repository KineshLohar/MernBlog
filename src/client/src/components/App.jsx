import React from "react";
import Header from './Header.jsx';
// import Footer from "./Footer";

import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  import Bloglist from "./Bloglist";
  import Create from "./Create";
  import About from "./About";
  import SingleBlog from "./SingleBlog";
import Edit from "./Edit.jsx";

function App(){
    return(
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Bloglist />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/blog/:id" element={<SingleBlog />} />
                    <Route path="/edit/:id" element={<Edit />} />
                </Routes>
                {/* <Footer /> */}
            </div>
        </Router>
    )
};

export default App;