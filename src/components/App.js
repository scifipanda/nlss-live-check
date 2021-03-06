import React from 'react';
import './css/main.css'; 
import StreamInfo from './StreamInfo';
import ls from 'local-storage'

let streamers = [ // List of current streamers [twitch channel, twitter account, youtube channel]
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
    ['sinowbeats', 'sinowbeats', 'channel/UCQghs_p93F6BdyRiPJST2rg'],
    ['skadj', 'skadjak', 'no-youtube'],
    ['chiblee', 'chibleee', 'no-youtube']
]

class App extends React.Component {
    constructor(props) {
        super();
        this.renderStreamer = this.renderStreamer.bind(this);
    }
    
    state = { hide: false, dark: false, menu: false }

    componentDidMount() {  // Sets state to saved preference if it exists
        if(ls.get('dark')) {
            this.setState({ dark: ls.get('dark') })
        }
    }

    isDark = () => {  // Returns either darkmode or litemode class depending on which is currently selected
        if(this.state.dark) {
            return ' darkmode';
        }else {
            return ' litemode';
        }
    }

    darkToggle = () => { // Toggles this.state.dark
        this.setState({dark: !this.state.dark});
        ls.set('dark', !this.state.dark );
    }

    renderStreamer(streamer) {// Dynamically adds any number of streamers to make adding more later easier
        return <StreamInfo isDark={this.isDark()} isHidden={this.state.hide === true} user={streamer} key={streamer} /> 
    }

    hideOffline = () => { // Changes state to mark offline channel as hidden
        this.setState({ hide: !this.state.hide })
    }

    // showMenu = () => {
    //     this.setState({ menu: !this.state.menu })
    // }

    render() {
        return(
            <div className={'main-container ' + this.isDark()}>
                
                {/* <div onClick={() => this.showMenu()} className="menuToggle"></div>  Coming soon

                <div className={this.state.menu ? 'menu' : 'hidden'}>
                    <p className="menu-item">NLSS Schedule</p>
                    <p className="menu-item">NLSS Extended Universe</p>
                </div>
 
                <div className="schedule">

                </div> */}

                <h1 className="title center">NLSS Live Stream Check</h1>
                <div className='button center'>
                    <button className="shadow" onClick={() => this.hideOffline()}>{this.state.hide ? 'Show all streams' : 'Only show live streams'}</button>
                </div>
                <div className="button center">
                   <button className="shadow" onClick={() => this.darkToggle()}>Darkmode toggle</button> 
                </div>
                
                <div className="people-container">
                    {streamers.map(this.renderStreamer)}
                </div>

                <div className='footer center'>
                    <p style={{padding: '0 10px'}}>Contact me on <a href='https://reddit.com/message/compose/?to=scifi_panda'>Reddit</a> or <a href='https://twitter.com/Scifi_Panda'>Twitter</a>.</p>
                    <p style={{padding: '0 10px'}}>Original by <a href='https://twitter.com/eluctweets'>@eluctweets</a></p>
                </div>
            </div>
        )
    }
}

export default App;
