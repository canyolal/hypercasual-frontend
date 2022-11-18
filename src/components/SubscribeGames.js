import {useState} from 'react';
import gameService  from '../services/gameService'
import Notification from './Notification';

const SubscribeGames = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState(null)
    const [messageTitle, setMessageTitle] = useState(null)
    const [messageStatus, setMessageStatus] = useState(null)

    const subscribeToMail = () => {
        gameService.post(`/subscribe`, {email: email})
        .then((res) => {
            if (res.status === 202) {
                setMessage("Subscribed!")
                setMessageStatus("success")
                setMessageTitle("")
                setTimeout(() => {
                    setMessage(null)
                    setMessageStatus(null)
                    setMessageTitle(null)
                    }, 3000)
                }
        }).catch ( err => {
            if (err.response.status === 500){
                setMessageTitle("")
                setMessage(Object.values(err.response.data.error))
                setMessageStatus("danger")
                setTimeout(() => {
                    setMessage(null)
                    setMessageStatus(null)
                    setMessageTitle(null)
                    }, 3000)
            } else if (err.response.status === 422) {
                setMessageTitle("")
                setMessage(Object.values(err.response.data.error))
                setMessageStatus("warning")
                setTimeout(() => {
                    setMessage(null)
                    setMessageStatus(null)
                    setMessageTitle(null)
                    }, 3000)
            }
        })
    }
    return (
        <div className="subscribeGames">
            <Notification message={message} title={messageTitle} status={messageStatus}/>
            <input className='subscribeToGames'
                type="e-mail"
                placeholder=" e-mail"
                onChange={(e) => setEmail(e.target.value)}
            />
            <button 
                className="subscribeToGames"
                onClick={subscribeToMail}
                >
                <i className="fas fa-check"></i>  Subscribe
            </button>
        </div>
    )
}

export default SubscribeGames;