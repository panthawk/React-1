import React from 'react' ;
import {Battle} from '../utils/api'

export default class Results extends React.Component {
  
  componentDidMount(){      
    const { playerOne, playerTwo } = this.props;
        Battle([playerOne, playerTwo])
        .then((players)=>{console.log(players)});
    }
    render() {
        return (
            <pre>{JSON.stringify(this.props, null,2)}</pre>
        )
    }
}