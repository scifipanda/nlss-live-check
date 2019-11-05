import React from 'react';

const Icon = props => {
    return <a href={props.link}><img className="icon" src={props.source} alt="youtube"/> </a>
}

export default Icon;