import React from 'react';
import './css/StreamInfo.css';
import twitch from './api/twitch';
import twittersvg from './images/twitter.svg';
import youtubesvg from './images/youtube.svg';
import twittersvgDark from './images/twitterDark.svg';
import youtubesvgDark from './images/youtubeDark.svg';

// Global variables
let live = 'Live';
let offline = 'Offline';
let status = offline;
let streamInfo;

// this.props.user[0] = twitch;
// this.props.user[1] = twitter;
// this.props.user[2] = youtube;

class StreamInfo extends React.Component {

    state = { [this.props.user[0]]: offline, game: undefined, title: undefined};

    componentDidMount() {
        this.checkLive(this.props.user[0])
        this.darkIcon();
    }
    
    checkLive = async streamer => { // Function to check who is live and to set title to live channels title
        let thisState = this
        
        const response = await twitch.get('/streams/', { // Calls twitch api and gets info about streamer
            params: { user_login: streamer }
        })

        if(response.data.data[0]) { // Checks if streamer is online
            streamInfo = response.data.data[0];
            let un = streamInfo.user_name.toLowerCase();
            
            thisState.setState({title: streamInfo.title})

            const game = await twitch.get('/games/', {
                params: { id: streamInfo.game_id}
            })
            
            thisState.setState({game: game.data.data[0].name}) // Sets this.state.game to current game being played by streamer
            
            thisState.setState({[un]: live}); // Marks streamer as live
        }
    }

    getGame = () => { // Function to get current game being played by live channel
        let thisState = this

        if(status === live) {
            return <div className="stream-info">{thisState.game}</div>
        }
    }    

    darkIcon = (icon) => { // Changes icon depending on if it's dark or litemode
        if(icon === 'youtubesvg') {
            if(this.props.isDark === ' darkmode') {
                return youtubesvgDark
            }else {
                return youtubesvg
            }
        }
        else {
            if(this.props.isDark === ' darkmode') {
                return twittersvgDark
            }else {
                return twittersvg
            }
        }
    }

    hasYoutube = () => {
        if(this.props.user[2] !== 'no-youtube') {
            return <a href={'https://youtube.com/' + this.props.user[2]}><img className="icon" src={this.darkIcon('youtubesvg')} alt="youtube"/> </a>
        }else {
            return <img className="icon hide" src={youtubesvg} alt="youtube"/> 
        }
    }

    displayTitle = () => {
        if(this.state[this.props.user[0]] === live) {
            return (
                <div>
                    <div className="stream-title"><span>{this.state.title}</span></div>
                    <div className={"stream-title title-hover" + this.props.isDark}><span>{this.state.title}</span></div>
                    <div className="stream-title"><span>{this.state.game}</span></div>
                </div>
            )
        }
    }

    render(){
        if(!this.props.isHidden || this.state[this.props.user[0]] === live) { // Only renders if channel is live or if channel is not marked hidden
           return(
            <div className={'stream-container shadow bold center ' + this.state[this.props.user[0]] + this.props.isDark}>
                <a href={'https://twitch.tv/' + this.props.user[0]}><h1 className='user'>{this.props.user[0].toUpperCase()}</h1></a>

                <div className="stream-info-container">
                    <a href={'https://twitter.com/' + this.props.user[1]}><img className="icon" src={this.darkIcon('twittersvg')} alt="twitter"/> </a>
                    <div className='center'>{this.state[this.props.user[0]]}</div>
                    {this.hasYoutube()}
                </div>
                
                <hr className="hr" />

                {this.displayTitle()}
            </div>
        ) 
        }
        return <div className="hidden"></div> // renders invisible div if marked hidden
    }
    
}

export default StreamInfo;