import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px" }}>
        <nav style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/author" style={{ color: "white", textDecoration: "none" }}>Authors</Link>
          <Link to="/book" style={{ color: "white", textDecoration: "none" }}>Books</Link>
          <Link to="/publisher" style={{ color: "white", textDecoration: "none" }}>Publishers</Link>
          <Link to="/category" style={{ color: "white", textDecoration: "none" }}>Categories</Link>
          <Link to="/borrow" style={{ color: "white", textDecoration: "none" }}>Borrow</Link>
        </nav>
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
};

export default Layout;
