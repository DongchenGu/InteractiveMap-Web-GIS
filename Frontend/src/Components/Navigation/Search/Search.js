import React, {useEffect, useState} from 'react';
import "../Navigation.css"
import {TextField} from "@mui/material";


const Search = () => {

    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false)
    const [seconds, setSeconds] = useState(0);
    const [change, setChange] = useState(false);

    useEffect(()=>{
       if(change && seconds >= 2 && value !== ''){
           console.log(`Sending API call ${value}`)
           setChange(false)
       }
    },[seconds])

    const handleInput = e =>{
        setValue(e.target.value);
        setChange(true)
        setSeconds(0);
    }

    useEffect(() => {
        let interval = null;
        if (focus) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!focus && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
  }, [focus, seconds]);







    return (
        <div>
            <TextField onFocus={()=>{setFocus(true)}} onBlur={()=>{setFocus(false);setSeconds(0)}} onChange={handleInput} id="outlined-basic" variant="outlined"  size="small"/>
            <div style={{width:"300px", backgroundColor:"white", marginTop:"5px", borderRadius:"2px",minHeight:"200px"}}>{value}</div>
        </div>
    );
};

export default Search;