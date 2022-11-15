import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import gameService  from '../services/gameService'
import GameTable from './GameTable'
import Notification from './Notification';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
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

      useEffect(() => {
        if (getGenre != null){
          getDataByGenre()
        }
      },[getGenre]);

      useEffect(() => {
        if (getPublisher != null){
          getDataByPublisher()
        }
      },[getPublisher])

      useEffect(() => {
        if (getName != null){
          getDataByName()
        }
      },[getName])

    return(
    <>
        <div> GET Request </div>
        <div>
          <Button size='sm' onClick={getAllData}>
            Get All
          </Button>
          <br />
          <ButtonGroup className='mb-2' size='sm'>
            <InputGroup className='mb-3'>
              <Form.Control placeholder='Name' type='text' value={getName} onChange={(e) => setGetName(e.target.value)} />
              <Button size='sm' onClick={getDataByName}>
                Find by Name
              </Button>
            </InputGroup>

            <Form.Select
              onChange={(e) => setGetGenre(e.target.value)}
              >
              <option value='null'>Select Genre</option>
              <option value='simulation'>Simulation</option>
              <option value='action'>Action</option>
              <option value='casual'>Casual</option>
            </Form.Select>

            <Form.Select
              onChange={(e) => setGetPublisher(e.target.value)}
              >
              <option value='null'>Select Publisher</option>
              <option value='Voodoo'>Voodoo</option>
              <option value='Good Job Games'>Good Job Games</option>
              <option value='Ketchapp'>Ketchapp</option>
            </Form.Select>

            {/* <InputGroup className='mb-3'>
              <Form.Control placeholder='Genre' type='text' value={getGenre} onChange={(e) => setGetGenre(e.target.value)} />
              <Button size='sm' onClick={getDataByGenre}>
                Find by Genre
              </Button>
            </InputGroup> */}

            {/* <InputGroup className='mb-3'>
              <Form.Control placeholder='Publisher' type='text' value={getPublisher} onChange={(e) => setGetPublisher(e.target.value)} />
              <Button size='sm' onClick={getDataByPublisher}>
                Find by Publisher
              </Button>
            </InputGroup> */}

          </ButtonGroup>
          {message === "loading..." ? null : <Notification message={message} />}
          <GameTable games={getGames} />  
        </div>
      </>
      )
    }

export default Filter;