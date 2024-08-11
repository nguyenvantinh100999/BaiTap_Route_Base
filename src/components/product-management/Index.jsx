import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const Index = () => {
  const [arrProduct, setArrProduct] = useState([]);
  const [search, setSearch] = useSearchParams();
  const kw = search.get("prodName");
  const handleChange = (e) => {
    //Đưa dữ liệu lên thanh url
    setSearch({
      prodName: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const getArrProductApi = async () => {
    let url = "";
    if (kw) {
      url = `https://apitraining.cybersoft.edu.vn/api/ProductApi/getall?keyword=${kw}`;
    } else {
      url = "https://apitraining.cybersoft.edu.vn/api/ProductApi/getall";
    }
    const res = await fetch(url);
    const data = await res.json();
    setArrProduct(data);
    console.log(data);
  };
  useEffect(() => {
    getArrProductApi();
  }, [kw]);
  return (
    <div className="container ">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Products &gt; List</h2>
          <NavLink className={"btn btn-primary mb-2"} to={"./create"}>
            New product
          </NavLink>
          <form className="input-group mb-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              aria-label="Search products..."
              aria-describedby="button-addon2"
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type={"submit"}
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    <input type="checkbox" />
                  </th>
                  <th scope="col">NAME</th>
                  <th scope="col">IMG</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">TYPE</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {arrProduct.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <img
                          className="product-img"
                          width={50}
                          src={item.img}
                          alt="Product 1"
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{item.type}</td>
                      <td>
                        <NavLink
                          to={`./update/${item.id}`}
                          href="#"
                          className="btn btn-sm btn-primary me-1"
                        >
                          Edit
                        </NavLink>
                        <button
                          onClick={async (e) => {
                            if (window.confirm("Bạn có muốn xoá không ?")) {
                              //Gọi api xoá
                              const res = await axios.delete(
                                `https://apitraining.cybersoft.edu.vn/api/ProductApi/delete/${item.id}`
                              );
                              //Sau khi xoá thành công thì load lại api get all product
                              getArrProductApi();
                            }
                          }}
                          href="#"
                          className="btn btn-sm btn-danger me-1"
                        >
                          Delete
                        </button>
                        {/* <a href="#" className="btn btn-sm btn-info">
                          View detail
                        </a> */}
                        <NavLink
                          to={`../update/${item.id}`}
                          href="#"
                          className="btn btn-sm btn-primary me-1"
                        >
                          View Detail
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span>Showing 1 to 3 of 3 results</span>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Per page: 10
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  10
                </a>
                <a className="dropdown-item" href="#">
                  25
                </a>
                <a className="dropdown-item" href="#">
                  50
                </a>
                <a className="dropdown-item" href="#">
                  100
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
