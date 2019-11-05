import React from 'react';
import './css/main.css'; 
import StreamInfo from './StreamInfo';
import ls from 'local-storage'

// northernlion: offline, rockleesmile: offline, dumbdog: offline, michaelalfox: offline, jsmithoti: offline, alpacapatrol: offline, cobaltstreak: offline, baertaffy: offline, dangheesling: offline, sinvicta: offline, lovelymomo: offline, mathas: offline, flackblag: offline, hcjustin: offline, itshafu: offline
// let dark = localStorage.getItem('darkMode');

let streamers = [ // List of current streamers [twitch channel] [twitter account] [youtube channel]
    ['northernlion', 'northernlionlp', 'northernlion'],
    ['rockleesmile', 'rockleesmile', 'rockleesmile'],
    ['dumbdog', 'verydumbdog', 'lastgreywolf'],
    ['michaelalfox', 'michaelalfox', 'michaelalfox'],
    ['jsmithoti', 'jsmithoti', 'jsmithoti'],
    ['alpacapatrol', 'alpacapatrol', 'alpacapatrol'],
    ['cobaltstreak', 'cobaltstreak', 'cobaltstreak'],
    ['baertaffy', 'baertaffy', 'baertaffy'],
    ['dangheesling', 'dangheesling', 'dangheesling'],
    ['sinvicta', 'sinvicta316', 'sinvicta'],
    ['lovelymomo', 'katelovelymomo', 'proboxstudio'],
    ['mathasgames', 'mathasgames', 'mathasgames'],
    ['flackblag', 'flackblag7', 'flackblag', ],
    ['hcjustin', 'hcjustinn', 'hcjustin', ],
    ['itshafu', 'itshafu', 'channel/UCddX-H9xUwQH6jOOHuL2vYw'],
    ['unrulybabs', 'unrulybabs', 'no-youtube'],
    ['sinowbeats', 'sinowbeats', 'channel/UCQghs_p93F6BdyRiPJST2rg']
]




class App extends React.Component {
    constructor(props) {
        super();
        this.renderStreamer = this.renderStreamer.bind(this);
    }
    
    state = { hide: false, dark: false }

    componentDidMount() {
        if(ls.get('dark')) {
            this.setState({ dark: ls.get('dark') })
        }
    }

    isDark = () => {
        if(this.state.dark) {
            return ' darkmode';
        }else {
            return ' litemode';
        }
    }

    darkToggle = () => {
        this.setState({dark: !this.state.dark});
        ls.set('dark', !this.state.dark );
    }

    renderStreamer(streamer) {// Dynamically adds any number of streamers to make adding more later easier
        return <StreamInfo isDark={this.isDark()} isHidden={this.state.hide === true} user={streamer} key={streamer} /> 
    }

    hideOffline = () => { // Changes state to mark offline channel as hidden
        this.setState({ hide: !this.state.hide })
    }

    render() {
        return(
            <div className={'main-container ' + this.isDark()}>
                
                <h1 className="center">Who is live?</h1>
                <div className='button'>
                    <button onClick={() => this.hideOffline()}>{this.state.hide ? 'Show all streams' : 'Only show live streams'}</button>
                </div>
                <div className="button">
                   <button onClick={() => this.darkToggle()}>Darkmode toggle</button> 
                </div>
                
                <div className="people-container">
                    {streamers.map(this.renderStreamer)}
                </div>

                <div className='footer'>
                    <p>Contact me on <a href='reddit.com/message/compose/?to=scifi_panda'>Reddit</a> or <a href='https://twitter.com/Scifi_Panda'>Twitter</a>.</p>
                    <p>Original by <a href='https://twitter.com/eluctweets'>@eluctweets</a></p>
                </div>
            </div>
        )
    }
}

export default App;