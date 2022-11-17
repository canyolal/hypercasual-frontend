import {useState} from 'react';

//TODO endpoint should be added for subscribing
//and POST request should be handled here
const SubscribeGames = () => {
    //const [mail, setEmail] = useState("")

    return (
        <div className="subscribeGames">
            <input className='subscribeToGames'
                type="e-mail"
                placeholder=" e-mail"
            />
            <button 
                className="subscribeToGames"
                >
                <i class="fas fa-check"></i>  Subscribe
            </button>
        </div>
    )
}

export default SubscribeGames;