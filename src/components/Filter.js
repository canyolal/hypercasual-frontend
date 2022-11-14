import React, { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import gameService  from '../services/gameService'
import Game from './Game'

const Filter = () => {

    const [getName, setGetName] = useState("")
    const [getGenre, setGetGenre] = useState("")
    const [getPublisher, setGetPublisher] = useState("")
    const [metadata,setMetadata] = useState(null)
  
    const [getResult, setGetResult] = useState(null)
  
    const fortmatResponse = (res) => {
      return JSON.stringify(res,null, 2);
    }
  
    const {isLoading: isLoadingGames, refetch: getAllGames} = useQuery("query-games",
      async() => {
        return await gameService.get("/games");
      },
      {
        enabled: false,
        onSuccess: (res) => {
          const result = {
            status : res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };
          setGetResult(fortmatResponse(result));
        },
        onError : (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isLoadingGames) setGetResult("loading...");
    },[isLoadingGames]);
  
    function getAllData() {
      try{
        getAllGames();
      }catch(err) {
        setGetResult(fortmatResponse(err));
      }
    }
  
    const {isLoading: isLoadingGame, refetch: getGamesByName} = useQuery(
      "query-games-by-name",
      async () => {
        return await gameService.get(`/games?name=${getName}`);
      },
      {
        enabled: false,
        onSuccess: (res) => {
          const result = {
            status : res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };
          setGetResult(fortmatResponse(result));
        },
        onError : (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isLoadingGame) setGetResult("loading...");
    }, [isLoadingGame]);
  
    function getDataByName() {
      if (getName) {
        try {
          getGamesByName();
        } catch (err) {
          setGetResult(fortmatResponse(err));
        }
      }
    }
  
    const {isLoading: isSearchingGame, refetch: findGamesByGenre} = useQuery(
      "query-games-by-genre",
      async () => {
        return await gameService.get(`/games?genre=${getGenre}`);
      },
      {
        enabled: false,
        onSuccess: (res) => {
          const result = res.data.games
          const md = res.data.metadata
          // const result = {
          //   status : res.status + "-" + res.statusText,
          //   headers: res.headers,
          //   data: res.data,
          // };
          setMetadata(fortmatResponse(md));
          setGetResult(fortmatResponse(result));
        },
        onError : (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isSearchingGame) setGetResult("loading...");
    }, [isSearchingGame]);
  
    function getDataByGenre() {
      if (getGenre) {
        try {
          findGamesByGenre();
        } catch (err) {
          setGetResult(fortmatResponse(err));
        }
      }
    }
  
    const clearGetOutput =() => {
      setGetResult(null);
    }


    return(
    <div className='card'>
        <div className='card-header input-group-sm'> GET Request </div>
        <div className='card-body'>
          <div className='input-group input-group-sm'>
            <button className='btn btn-sm btn-primary' onClick={getAllData}>
              Get All
            </button>
            <input
              type="text"
              value={getName}
              onChange={(e) => setGetName(e.target.value)}
              className='form-control ml-2'
              placeholder='Name'
              />
            <div className='input-group-append'>
              <button className="btn btn-sm btn-primary" onClick={getDataByName}>
                Get by Name
              </button>
            </div>
            <input
                type="text"
                value={getGenre}
                onChange={(e) => setGetGenre(e.target.value)}
                className="form-control ml-2"
                placeholder="Genre"
                />
             <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataByGenre}>
                Find By Genre
              </button>
            </div>
            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>
              Clear
            </button>
          </div>
          {getResult && (
              <div className='alert alert-secondary mt-2' role='alert'>
              <pre>{getResult}</pre>
            </div>
          )}
        </div>
      </div>
      )
    }

export default Filter;