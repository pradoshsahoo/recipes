import React from "react";
import "./cardnew.css";
import { useState } from "react";
function Card1({ image, title, rating, id, getData, desc }) {
  const [disp, setDisp] = useState("none");
  const [form, setForm] = useState({
    title: "",
    image: "",
    rating: "",
    desc: "",
  });
  console.log(form);
  const handleForm = async (e) => {
    console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async () => {
    disp == "none" ? setDisp("block") : setDisp("none");
  };
  const handlePut = async () => {
    const obj = {};
    if (form.title) {
      obj.title = form.title;
    }
    if (form.image) {
      obj.image = form.image;
    }
    if (form.rating) {
      obj.rating = form.rating;
    }
    console.log(obj);
    await fetch(`http://localhost:5501/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((response) => {
      if (response.ok) {
        alert("Updated name!");
        handleUpdate();
      }
    });
    getData();
  };
  const handleDelete = async () => {
    await fetch(`http://localhost:5501/data/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        alert("Deleted name!");
      }
    });
    getData();
  };
  return (
    <>
      {disp == "none" ? (
        <div className="carddiv">
          <img src={image}></img>
          <h3>{title}</h3>
          <p id="rate">{rating}</p>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div id="updForm" style={{ display: { disp } }}>
          <div className="updateEle">
            <input
              type="text"
              name="title"
              id="inputTitle"
              placeholder="Enter title"
              className="uEle"
              defaultValue={title}
              onChange={handleForm}
            />
          </div>
          <div className="updateEle">
            <input
              type="text"
              name="image"
              id="inputTitle"
              placeholder="Enter image"
              className="uEle"
              defaultValue={image}
              onChange={handleForm}
            />
          </div>
          <div className="updateEle">
            <input
              type="text"
              name="rating"
              id="inputTitle"
              placeholder="Enter rating"
              className="uEle"
              defaultValue={rating}
              onChange={handleForm}
            />
          </div>
          <button id="update" onClick={handlePut}>
            Update
          </button>
          <button id="ucancel" onClick={handleUpdate}>
            cancel
          </button>
        </div>
      )}
    </>
  );
}
export default Card1;
