import React from 'react';

class Hello extends React.Component{
    render() {
        return (
            <React.Fragment>
                <p>Hey Welcome back {this.props.name} {this.props.lastName} you also called as {this.props.Aka}</p>
            </React.Fragment>
        );
    }
}

export default Hello;