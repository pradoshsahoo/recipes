import React, { useState } from "react";
function Card1() {
  const [obj,setObj]=useState([])
    const handleClick=()=>{
        setObj([1,2,3]);
    }
    console.log(obj)
}
export default Card1;
