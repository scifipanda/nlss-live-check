import React from 'react';
import './css/StreamInfo.css';
import twitch from './api/twitch';
import twittersvg from './images/twitter.svg';
import youtubesvg from './images/youtube.svg';

// Global variables
let live = 'Live';
let offline = 'Offline';
let status = offline;
let streamInfo;

class StreamInfo extends React.Component {

    state = { [this.props.user[0]]: offline, game: undefined, title: undefined};

    componentDidMount() {
        this.checkLive(this.props.user[0])
    }
    
    checkLive = async streamer => { // Function to check who is live and to set title to live channels title
        let thisState = this
        
        const response = await twitch.get('/streams/', {
            params: { user_login: streamer }
        })

        if(response.data.data[0]) {
            streamInfo = response.data.data[0];
            let un = streamInfo.user_name.toLowerCase();
            
            thisState.setState({title: streamInfo.title})

            const game = await twitch.get('/games/', {
                params: { id: response.data.data[0].game_id}
            })
            
            thisState.setState({game: game.data.data[0].name})
            
            thisState.setState({[un]: live});
        }
    }
 
    getGame = () => { // Function to get current game being played by live channel
        let thisState = this

        if(status === live) {
            return <div className="stream-info">{thisState.game}</div>
        }
    }    

    render(){
        if(!this.props.isHidden || this.state[this.props.user[0]] === live) { // Only renders if channel is live or if channel is not marked hidden
           return(
            <div className={'stream-container bold center ' + this.state[this.props.user[0]]}>
                <a href={'https://twitch.tv/' + this.props.user[0]}><h1 className='user'>{this.props.user[0].toUpperCase()}</h1></a>

                <div className="stream-info-container">
                    <a href={'https://twitter.com/' + this.props.user[1]}><img className="icon" src={twittersvg} alt="twitter"/> </a>
                    <div>{this.state[this.props.user[0]]}</div>
                    <a href={'https://youtube.com/' + this.props.user[2]}><img className="icon" src={youtubesvg} alt="youtube" /></a>
                </div>
                
                <hr />

                <div className="stream-title">{this.state.title}</div>
                <div className="stream-title">{this.state.game}</div>
            </div>
        ) 
        }
        return <div className="hidden"></div> // renders invisible div if marked hidden
    }
    
}

export default StreamInfo;