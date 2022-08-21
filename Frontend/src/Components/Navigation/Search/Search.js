import React, {useEffect, useRef, useState} from 'react';
import "../Navigation.css"
import "./Search.css"
import {TextField} from "@mui/material";
import {getRecommendations} from "../../../API/api";
import {update} from "../searchSlice";
import {useDispatch} from "react-redux";



const Search = ({getCoord}) => {

    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false)
    const [seconds, setSeconds] = useState(0);
    const [change, setChange] = useState(false);
    const [results, setResults] = useState([]);
    const [cursor, setCursor] = useState(-1);

    const dispatch = useDispatch();

    useEffect(()=>{
       if(change && seconds >= 1 && value !== ''){
           // console.log(`Sending API call ${value}`)
           // axios.get()
            getRecommendations(value).then((res)=>{
                // console.log(res.data)
                let cities = res.data.features.map(city => {
                    let name = city.place_name;
                    let coord = city.geometry.coordinates;
                    [coord[0], coord[1]] = [coord[1], coord[0]];
                    if(name.length > 50) name = name.slice(0, 53) + '...';
                    return {name, coord};
                })
                setResults(cities)
                // console.log(cities)

            }).catch((e)=>{
                console.log(e)
            })



           setChange(false);
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

    const handleCoordinate = (coord) => {
        // console.log(dispatch(update(coord)))

        // getCoord(coord)
        dispatch(update(coord))
        setResults([])
    }

    const handleKeyBoard = (e) => {
        if(cursor > 0 && e.keyCode === 38) setCursor(cursor - 1);
        if(cursor < 4 && e.keyCode === 40) setCursor(cursor + 1);
        if(e.keyCode !== 38 && e.keyCode !== 40) setCursor(-1);
    }

    useEffect(()=> {
        let coord = results[cursor]?.coord;
        if(coord !== undefined) {
            // console.log(cursor, coord)
            // getCoord(coord)
            dispatch(update(coord))
        }
    },[cursor])


    return (
        <div>
            <TextField
                onFocus={()=>{setFocus(true)}}
                onBlur={()=>{setFocus(false);setSeconds(0)}}
                onChange={handleInput}
                onKeyDown={handleKeyBoard}
                id="outlined-basic"
                variant="outlined"
                size="small"
            />
            <div className={"dataResult"} >
                    {results.map((result, index) =>
                        <a
                            onClick={() => handleCoordinate(result.coord)}
                            key={index}
                            className={`dataItem ${cursor === index ? 'active':''}`}
                            target="_blank">
                            <p>{result.name} </p>
                        </a>
                    )}
            </div>
        </div>
    );
};

export default Search;