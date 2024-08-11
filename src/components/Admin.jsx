import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 py-4">
          <div className="title">
            <i className="fa fa-home"></i>
            <span className="fs-5 fw-bold ms-2">Dashboard</span>
          </div>

          <NavLink
            className={"nav-link fw-bold py-2"}
            style={{ color: "white", backgroundColor: "orange" }}
            to={"/admin"}
          >
            Products
          </NavLink>
        </div>
        <div className="col-9" style={{ backgroundColor: "#ccc" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
