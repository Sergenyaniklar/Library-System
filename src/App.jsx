import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Author from "./pages/Author/Author";
import Book from "./pages/Book/Book";
import Publisher from "./pages/Publisher/Publisher";
import Category from "./pages/Category/Category";
import Borrow from "./pages/Borrow/Borrow";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/author" element={<Author />} />
          <Route path="/book" element={<Book />} />
          <Route path="/publisher" element={<Publisher />} />
          <Route path="/category" element={<Category />} />
          <Route path="/borrow" element={<Borrow />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
