import React, { Component } from "react";
import './SingleCard.css';

class SingleCard extends Component {


//show an image with getting src and two amounts for random style
  render() {
    return (
      <img className="singleCard" src={this.props.sr} alt={this.props.alt} 
      style={{ transform: `translate(${this.props.translate}%, ${this.props.translate}%) rotate(${this.props.rotate}deg)` }}
      />
    )
  }
}

export default SingleCard;