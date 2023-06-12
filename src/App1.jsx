import Navbar from "./components/Navbar.jsx";
import Card from "./components/card.jsx";
import "./components/App.css";
import { useState, useEffect, useContext } from "react";
import SearchContext from "./store/searchContext.js";

function App1() {
  const [arr, setArr] = useState([]);
  const [newArr, setNewArr] = useState([]);
  // const [str, setStr] = useState("");
  const { str } = useContext(SearchContext);
  const [page, setPage] = useState(1);
  // const [pageClass, setPageClass] = useState("unselected");
  const [wholeArr, setWholeArr] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
    rating: "",
    desc: "",
  });
  let pageArr = [];
  let i = 1;
  const elePerPage = 3;
  while (i <= Math.ceil(wholeArr.length / elePerPage)) {
    pageArr.push(i);
    i++;
  }
  const handleChange1 = (ele) => {
    setPage(ele);
    // setPageClass
  };
  const getData = async () => {
    await fetch("http://localhost:5501/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.reverse();
        setWholeArr(data);
        const end = page * elePerPage;
        const start = (page - 1) * elePerPage;
        const new_arr = data.slice(start, end);
        setArr(new_arr);
      });
  };
  // const handleChange = (e) => {
  //   setStr(e.target.value);
  // };
  const handleSearch = () => {
    const new_arr = wholeArr.filter((ele) =>
      ele.title.toLowerCase().includes(str)
    );
    setNewArr(new_arr);
  };
  useEffect(() => {
    handleSearch();
  }, [str, wholeArr]);
  // const handleSearchResults = (e) => {
  //   // getData();
  // };

  const resetFields = () => {
    var fields = document.getElementsByClassName("iEle");
    // console.log(fields[0]);
    for (let i = 0; i < fields.length; i++) {
      fields[i].value = "";
    }
  };
  const handlePost = async () => {
    resetFields();
    document.getElementById("input").style.display = "none";
    await fetch("http://localhost:5501/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        rating: form.rating,
        image: form.image,
        desc: form.desc,
        id: Date.now(),
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Food added successfully");
        return response.json();
      } else {
        alert("Something went wrong");
      }
    });
    setForm({
      title: "",
      image: "",
      rating: "",
      desc: "",
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleForm = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Navbar />

      <div id="input" style={{ display: "none" }}>
        <div className="inputEle">
          <input
            type="text"
            name="title"
            id="inputTitle"
            placeholder="Enter title"
            className="iEle"
            onChange={handleForm}
          />
        </div>
        <div className="inputEle">
          <input
            type="text"
            name="image"
            id="inputTitle"
            placeholder="Enter image"
            className="iEle"
            onChange={handleForm}
          />
        </div>
        <div className="inputEle">
          <input
            type="text"
            name="rating"
            id="inputTitle"
            placeholder="Enter rating"
            className="iEle"
            onChange={handleForm}
          />
        </div>
        <button id="add" onClick={handlePost}>
          post
        </button>
        <button
          id="cancel"
          onClick={() => {
            document.getElementById("input").style.display = "none";
          }}
        >
          cancel
        </button>
      </div>
      {str == "" && (
        <div id="showmovies">
          {arr.map((el, id) => {
            return (
              <Card
                image={el.image}
                title={el.title}
                rating={el.rating}
                desc={el.desc}
                id={el.id}
                key={id}
                getData={getData}
              />
            );
          })}
        </div>
      )}
      {str && newArr.length > 0 && (
        <div id="showmovies">
          {newArr.map((el, id) => {
            return (
              <Card
                image={el.image}
                title={el.title}
                rating={el.rating}
                id={el.id}
                key={id}
                getData={getData}
              />
            );
          })}
        </div>
      )}
      {str && newArr.length == 0 && <div id="nodata">No data found</div>}
      {!str && (
        <div className="pageButtons">
          {pageArr.map((ele, id) => {
            return (
              <button
                className="unselected"
                key={id}
                onClick={(e) => handleChange1(ele)}
              >
                {ele}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App1;
