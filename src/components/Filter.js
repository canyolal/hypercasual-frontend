import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Pagination from 'react-bootstrap/Pagination'

import gameService  from '../services/gameService'
import GameTable from './GameTable'
import Notification from './Notification';
import GenreForm from './GenreForm';
import PublisherForm from './PublisherForm';
import PageSizeForm from './PageSizeForm';
import PaginationElement from './PaginationElement'

const Filter = () => {

  const [Name, setName] = useState("")
  const [Genre, setGenre] = useState("")
  const [Publisher, setPublisher] = useState("")
  const [metadata,setMetadata] = useState([])
  const [message , setMessage] = useState(null)
  const [pageSize, setPageSize] = useState(20)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  
  const [Games, setGames] = useState([])

  var pages =[]
  const updatePagination = () => {
    pages = []
    for (let number = 1; number <= metadata.last_page; number++) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === metadata.current_page}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  }
  updatePagination()
  

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

  const paginate = (number) => {
    let qry = serializeQuery({page: number, name : Name, genre: Genre, publisher_name: Publisher, page_size: pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      if (!res.data.games){
        setGames(res.data.games)
        setMetadata(res.data.metadata)
        setPageNum(number)
        setPageSize(res.data.metadata.page_size)
        setMessage(null)
      } else {
        setGames(res.data.games)
        setPageCount(res.data.metadata.last_page)
        setMetadata(res.data.metadata)
        setPageSize(res.data.metadata.page_size)
      }
    })
  }

  const findGamesWithQuery = () => {
    let qry =serializeQuery({name: Name, genre: Genre, publisher_name : Publisher, page_size : pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      if (!res.data.games){
        setGames(res.data.games)
        setMetadata(res.data.metadata)
        setPageSize(20)
        setPageNum(1)
        setPageCount(res.data.metadata.last_page)
        setMessage(null)
      } else{
        setGames(res.data.games)
        setPageCount(res.data.metadata.last_page)
        setMetadata(res.data.metadata)
        setPageSize(res.data.metadata.page_size)
        setPageNum(1)
      }
    })
  }

  useEffect(() => {
    const getDataByQuery = () => {
      try {
        findGamesWithQuery();
      } catch (err) {
        setMessage(fortmatResponse(err));
      }
  }
    getDataByQuery()
  },[Name,Genre,Publisher,pageSize]);

  useEffect(() => {
      let qry = serializeQuery({page: pageNum, name : Name, genre: Genre, publisher_name: Publisher, page_size: pageSize})
      gameService.get(`/games?${qry}`)
      .then(res => {
        setGames(res.data.games)
        setMetadata(res.data.metadata)
        setPageNum(pageNum)
        setPageCount(res.data.metadata.last_page)
        setPageSize(res.data.metadata.page_size)
        setMessage(null)
      })
  }, [pageNum])

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
        <GameTable games={Games} />  
        <PaginationElement
          pagesCount={pageCount}
          currentPage={pageNum}
          setPageNum={setPageNum} 
          alwaysShown={false}/>

        </div>
      </>
      )
    }

export default Filter;