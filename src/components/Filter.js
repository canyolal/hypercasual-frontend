import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import gameService  from '../services/gameService'
import GameTable from './GameTable'
import Notification from './Notification';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import '../App.css'
import GenreForm from './GenreForm';
import PublisherForm from './PublisherForm';
import PageSizeForm from './PageSizeForm';

const Filter = () => {

  const [Name, setName] = useState("")
  const [Genre, setGenre] = useState("")
  const [Publisher, setPublisher] = useState("")
  const [metadata,setMetadata] = useState([])
  const [message , setMessage] = useState(null)
  const [pageSize, setPageSize] = useState(20)
  
  const [getGames, setgetGames] = useState([])

  const fortmatResponse = (res) => {
    return JSON.stringify(res,null, 2);
  }

  const serializeQuery = (queryParams) =>{
    const arr = []
    for (let key in queryParams){
      if (queryParams[key] === ""){
        continue
      }
      arr.push(`${key}=${queryParams[key]}`)
    }
    const qryString = arr.join("&")
    console.log("qryString: ",qryString)
    return qryString
  }
  
  const {isLoading: isQueryingGame, refetch: findGamesWithQuery} = useQuery(
    "query-games-by-query",
    async () => {
      let qry =serializeQuery({name: Name, genre: Genre, publisher_name : Publisher, page_size : pageSize})
      return await gameService.get(`/games?${qry}`);
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
   if (isQueryingGame) setMessage("loading...");
  }, [isQueryingGame]);
    
  

  useEffect(() => {
    const getDataByQuery = () => {
      try {
        findGamesWithQuery();
      } catch (err) {
        setMessage(fortmatResponse(err));
      }
  }
    if (Name || Genre || Publisher || pageSize)
      getDataByQuery()
  },[Name,Genre,Publisher,pageSize]);

    return(
    <>
        <h1> Top Publisher's Hypercasual Games </h1>
        <div>

        <Stack direction='horizontal' gap={2}>
          <Form.Control className='form-control-sm' placeholder='Game' type='text' value={Name} onChange={(e) => setName(e.target.value)} />
          <GenreForm setGenre={setGenre}/>
          <PublisherForm setPublisher={setPublisher} />
          <PageSizeForm setPageSize={setPageSize} />
        </Stack>

          {message === "loading..." ? null : <Notification message={message} />}
          <GameTable games={getGames} />  
        </div>
      </>
      )
    }

export default Filter;