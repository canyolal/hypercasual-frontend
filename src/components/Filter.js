import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import gameService  from '../services/gameService'
import GameTable from './GameTable'
import Notification from './Notification';
import '../App.css'

const Filter = () => {

    const [getName, setGetName] = useState("")
    const [getGenre, setGetGenre] = useState("")
    const [getPublisher, setGetPublisher] = useState("")
    const [metadata,setMetadata] = useState([])
    const [message , setMessage] = useState(null)
  
    const [getGames, setgetGames] = useState([])
  
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
            setMetadata(fortmatResponse(result.data.metadata));
            setgetGames(result.data.games);
            setMessage(null)
        },
        onError : (err) => {
          setMessage(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isLoadingGames) setMessage("loading...");
    },[isLoadingGames]);
  
    function getAllData() {
      try{
        getAllGames();
      }catch(err) {
        setMessage(fortmatResponse(err));
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
            setMetadata(fortmatResponse(result.data.metadata));
            setgetGames(result.data.games);
            setMessage(null)
        },
        onError : (err) => {
          setMessage(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isLoadingGame) setMessage("loading...");
    }, [isLoadingGame]);
  
    function getDataByName() {
      if (getName) {
        try {
          getGamesByName();
        } catch (err) {
          setMessage(fortmatResponse(err));
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
          const result = {
            status : res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };
          setMetadata(fortmatResponse(result.data.metadata));
          setgetGames(result.data.games);
          setMessage(null)
        },
        onError : (err) => {
          setMessage(fortmatResponse(err.response?.data || err));
        },
      }
    );
  
    useEffect(() => {
      if (isSearchingGame) setMessage("loading...");
    }, [isSearchingGame]);
  
    function getDataByGenre() {
      if (getGenre) {
        try {
          findGamesByGenre();
        } catch (err) {
          setMessage(fortmatResponse(err));
        }
      }
    }

    const {isLoading: isLookingGame, refetch: findGamesByPublisher} = useQuery(
        "query-games-by-publisher",
        async () => {
          return await gameService.get(`/games?publisher_name=${getPublisher}`);
        },
        {
          enabled: false,
          onSuccess: (res) => {
            const result = {
              status : res.status + "-" + res.statusText,
              headers: res.headers,
              data: res.data,
            };
            setMetadata(fortmatResponse(result.data.metadata));
            setgetGames(result.data.games);
            setMessage(null)
          },
          onError : (err) => {
            setMessage(fortmatResponse(err.response?.data || err));
          },
        }
      );
    
      useEffect(() => {
        if (isLookingGame) setMessage("loading...");
      }, [isLookingGame]);
    
      function getDataByPublisher() {
        if (getPublisher) {
          try {
            findGamesByPublisher();
          } catch (err) {
            setMessage(fortmatResponse(err));
          }
        }
      }
  
    const clearGetOutput =() => {
      setMessage(null);
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
            <input
                type="text"
                value={getPublisher}
                onChange={(e) => setGetPublisher(e.target.value)}
                className="form-control ml-2"
                placeholder="Publisher"
                />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataByPublisher}>
                Find By Publisher
              </button>
            </div>
            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>
              Clear
            </button>
          </div>
          <Notification message={message} />
          <GameTable games={getGames} />
          
        </div>
      </div>
      )
    }

export default Filter;