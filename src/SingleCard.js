import React, { Component } from "react";
import './SingleCard.css';

class SingleCard extends Component {
  render() {
    return (
      <img src={this.props.sr} alt={this.props.alt} />
        )
  }
}

        export default SingleCard;