import React, { Component } from "react";
import './Cards.css';
import SingleCard from './SingleCard';
import axios from 'axios';
import { v4 as uuid } from 'uuid';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInfo: '',
      cardsArray: []
    };
    this.addCard = this.addCard.bind(this);
    this.randomStyle=this.randomStyle.bind(this);
  }

  //add a card to state.cardsarray in addition to two random amout for translate and rotate
  async addCard() {
    let newArray = this.state.cardsArray;
    await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckInfo.deck_id}/draw/`).then(response => {
      newArray.push({...response.data,rotate:this.randomStyle(80),translate:this.randomStyle(15)})
    });

    if((newArray[newArray.length-1].remaining===0&& !newArray[newArray.length-1].success)){
      alert("The Cards Are Finished")
    }else{
      this.setState(state => ({
        cardsArray: newArray
      }))
    }
    
   
  }
//get a positive or negative random number using for style
  randomStyle(max) {
    let randNum = Math.floor(Math.random() * max);
    let state=Math.floor(Math.random() * 2);
    if(state){
      return randNum;
    }else{
      return -randNum;
    }
  }

  //get the deck info (deck_id) at first
  componentDidMount() {
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle").then(response => {
      this.setState({
        deckInfo: response.data
      })
    })
  }

  render() {
    return (
      <div id="deck">

        <div id="header">
          <h2> &#9830; Card Dealer &#9830;</h2>
          <h4> &#9830; A little Demo Made With React &#9830;</h4>
          <button onClick={this.addCard}>Add Card</button>
        </div>

        <div id="cardContainer">
          {this.state.cardsArray.map(img => (
            <SingleCard sr={img.cards[0].image}
              alt={`${img.cards[0].value} ${img.cards[0].suit}`}
              key={uuid() }
              rotate={img.rotate}
              translate={img.translate}
            />
          ))}

        </div>

      </div>
    )
  }
}

export default Cards;