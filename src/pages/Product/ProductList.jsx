import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import productService from "../../services/product.service";
import cartService from "../../services/cart.service";

export default function ProductList() {
  const userRole = localStorage.getItem("role");

  // Columns
  const columns = [
    {
      cell: (row) =>
          <img src={"http://localhost:8083/uploads/" + row.image} alt="Product" style={{width: 100, height: 100}}  />
        ,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Id",
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand.brandName,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => <div>{row.description}</div>,
      sortable: true,
    },
    {
      name: "Lager",
      selector: (row) => row.lager,
      sortable: true,
    },
    {
      cell: (row) =>
        userRole === "ROLE_STAFF" && (
          <Link className="btn btn-warning" to={`/product/edit/${row.productId}`}>
            Edit
          </Link>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) =>
        userRole === "ROLE_STAFF" && (
          <button className="btn btn-danger" onClick={() => deleteRecord(row.productId)} id={row.productId}>
            Delete
          </button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) =>
        userRole === "ROLE_CUSTOMER" && (
          <button className="btn btn-success" onClick={() => addToCart(row.productId)} id={"product" + row.productId}>
          To Cart
        </button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (row) =>
        userRole === "ROLE_CUSTOMER" && (
          <Link className="btn btn-warning" to={`/product/overview/${row.productId}`}>
            Details
          </Link>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // State
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [brandFilter, setBrandFilter] = useState("");

  useEffect(() => {
    productService.getAll().then((response) => {
      console.log(response.data);
      setData(response.data);
      setFilteredData(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(filterText.toLowerCase()) &&
          item.price <= maxPrice &&
          item.brand.brandName.toLowerCase().includes(brandFilter.toLowerCase())
      )
    );
  }, [filterText, maxPrice, brandFilter]);

  function addToCart(productId) {
    const product = data.find(x => x.productId === productId);
    cartService.addToCart(product);
    alert("Uspesno dodat proizvod!")
  }

  const searchMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText || maxPrice !== 100000 || brandFilter) {
        setFilterText("");
        setMaxPrice(100000);
        setBrandFilter("");
      }
    };

    return (
      <>
       <div style={{ display: "flex", alignItems: "center" }}>
  <label style={{ marginRight: "10px" }}>Max price for product:</label>
  <input
    type="range"
    min={0}
    max={100000}
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    style={{
        appearance: "none",
        background: "red",
        width: "100%",
        height: "8px",
        borderRadius: "5px",
        outline: "none",
        opacity: "1",
        transition: "opacity 0.2s",
        marginLeft: "10px"
      }}
  />
  <span>{maxPrice}</span>
</div>


        <div>
          <input
            type="text"
            placeholder="Filter by brand"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter by product name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <button onClick={handleClear}>Clear</button>
        </div>
      </>
    );
  }, [filterText, maxPrice, brandFilter]);

  function deleteRecord(id) {
    productService
      .delete(id)
      .then(() => {
        const newData = data.filter((x) => x.productId !== id);
        const newFilteredData = filteredData.filter((x) => x.productId !== id);
        setData(newData);
        setFilteredData(newFilteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <>
      {userRole === "ROLE_STAFF" && (
        <div>
          <Link to="/product/add" className="btn btn-success">
            New product
          </Link>
        </div>
      )}

      

      <div className="col-md-12">
        <DataTable
          title="Product List"
          columns={columns}
          data={filteredData}
          pagination
          subHeader
          subHeaderComponent={searchMemo}
          selectableRows
          persistTableHead
        />
      </div>
    </>
  );
}