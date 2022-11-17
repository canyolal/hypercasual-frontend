import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Pagination from 'react-bootstrap/Pagination'
import {Row,Col,Container} from 'react-bootstrap'

import gameService  from '../services/gameService'
import GameTable from './GameTable'
import Notification from './Notification';
import GenreForm from './GenreForm';
import PublisherForm from './PublisherForm';
import PageSizeForm from './PageSizeForm';
import PaginationElement from './PaginationElement'
import SubscribeGames from './SubscribeGames'

const GamesComponent = () => {

  const [Name, setName] = useState("")
  const [Genre, setGenre] = useState("")
  const [Publisher, setPublisher] = useState("")
  const [metadata,setMetadata] = useState([])
  const [message , setMessage] = useState(null)
  const [pageSize, setPageSize] = useState("")
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
    return qryString
  }

  const paginate = (number) => {
    let qry = serializeQuery({page: number, name : Name, genre: Genre, publisher_name: Publisher, page_size: pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      setGames(res.data.games)
      setMetadata(res.data.metadata)
    })
  }

  const findGamesWithQuery = () => {
    let qry =serializeQuery({name: Name, genre: Genre, publisher_name : Publisher, page_size : pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      setGames(res.data.games)
      setMetadata(res.data.metadata)
      setPageCount(res.data.metadata.last_page)        
      setPageNum(1)
    }
    )
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

  const changePageNumber = () =>{
    let qry = serializeQuery({page: pageNum, name : Name, genre: Genre, publisher_name: Publisher, page_size: pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      setGames(res.data.games)
      setMetadata(res.data.metadata)
      setPageCount(res.data.metadata.last_page)        
      setPageNum(pageNum)
    })
  }

  useEffect(() => {
    changePageNumber()
  }, [pageNum])

  return(
    <div class='singlePages'>
        <h1> Top Publisher's Hypercasual Games </h1>
        <br />
        <p className='gamesComponent'>
          <span>
            Top 25 Hypercasual mobile game publishers' titles database can be found here. 
            You can subscribe to database and get notified when a new game is released!
          </span>
        </p>
        <br />
        <SubscribeGames />
        <br />

        <Stack direction='horizontal' gap={2}>
          <Form.Control className='form-control-sm' placeholder='Game' type='text' value={Name} onChange={(e) => setName(e.target.value)} />
          <GenreForm setGenre={setGenre}/>
          <PublisherForm setPublisher={setPublisher} />
        </Stack>

        {message === "loading..." ? null : <Notification message={message} />}
        <br/>
        <GameTable games={Games} />  
        <Container>
          <Row>
            <Col sm={9}>
              <PaginationElement
                pagesCount={pageCount}
                currentPage={pageNum}
                setPageNum={setPageNum} 
                alwaysShown={false}/>
            </Col>
            <Col sm={3}>
              <PageSizeForm setPageSize={setPageSize} />            
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default GamesComponent;