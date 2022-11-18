import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import {Row,Col,Container} from 'react-bootstrap'

import gameService  from '../services/gameService'

import GameTable from './GameTable'
import GenreForm from './GenreForm';
import PublisherForm from './PublisherForm';
import PageSizeForm from './PageSizeForm';
import PaginationElement from './PaginationElement'
import SubscribeGames from './SubscribeGames'

const GamesComponent = () => {

  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [publisher, setPublisher] = useState("")
  const [pageSize, setPageSize] = useState("")
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  
  const [Games, setGames] = useState([])

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findGamesWithQuery = () => {
    let qry =serializeQuery({name: name, genre: genre, publisher_name : publisher, page_size : pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      setGames(res.data.games)
      setPageCount(res.data.metadata.last_page)        
      setPageNum(1)
    }
    )
  }

  useEffect(findGamesWithQuery,[name,genre,publisher,pageSize]);

  const changePageNumber = () =>{
    let qry = serializeQuery({page: pageNum, name : name, genre: genre, publisher_name: publisher, page_size: pageSize})
    gameService.get(`/games?${qry}`)
    .then(res => {
      setGames(res.data.games)
      setPageCount(res.data.metadata.last_page)        
      setPageNum(pageNum)
    })
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(changePageNumber, [pageNum])

  return(
    <div className='singlePages'>
        <br/>
        <br/>
        <h1> Top publisher's Hypercasual Games </h1>
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
          <Form.Control className='form-control-sm' placeholder='Game' type='text' value={name} onChange={(e) => setName(e.target.value)} />
          <GenreForm setGenre={setGenre}/>
          <PublisherForm setPublisher={setPublisher} />
        </Stack>

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