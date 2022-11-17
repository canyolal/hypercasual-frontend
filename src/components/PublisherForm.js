import Form from 'react-bootstrap/Form'

const PublisherForm = ({setPublisher}) => {

    return (
        <Form.Select
              onChange={(e) => setPublisher(e.target.value)}
              className='form-inline form-select-sm'
              >
              <option value=''>Select Publisher</option>
              <option value='Voodoo'>Voodoo</option>
              <option value='Good Job Games'>Good Job Games</option>
              <option value='Ketchapp'>Ketchapp</option>
              <option value='Green Panda Games'>Green Panda Games</option>
              <option value='Homa'>Homa</option>
              <option value='YSO Corp'>YSO Corp</option>
              <option value='BoomBit'>BoomBit</option>
              <option value='Playgendary'>Playgendary</option>
              <option value='Alictus'>Alictus</option>
              <option value='SayGames'>SayGames</option>
              <option value='Supersonic'>Supersonic</option>
              <option value='Tastypill'>Tastypill</option>
              <option value='JoyPac'>JoyPac</option>
              <option value='Moonee'>Moonee</option>
              <option value='Ducky'>Ducky</option>
              <option value='Coda'>Coda</option>
              <option value='Lion Studios'>Lion Studios</option>
              <option value='TapNation'>TapNation</option>
              <option value='Zplay'>Zplay</option>
              <option value='Kwalee'>Kwalee</option>
              <option value='Crazy Labs'>Crazy Labs</option>
              <option value='Amanotes'>Amanotes</option>
              <option value='Azur Games'>Azur Games</option>
              <option value='Gismart'>Gismart</option>
              <option value='Rollic'>Rollic</option>
              <option value='Matchingham'>Matchingham</option>
              <option value='Miniclip'>Miniclip</option>
        </Form.Select>
    )
}

export default PublisherForm;