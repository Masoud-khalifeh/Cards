import React, { Component } from "react";
import './Cards.css';
import SingleCard from './SingleCard';
import axios from 'axios';


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckInfo: '',
      cardsArray: []
    };
    this.addCard = this.addCard.bind(this)
  }
  async addCard() {

    let newArray = this.state.cardsArray;
    await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckInfo.deck_id}/draw/`).then(response => {
      newArray.push(response.data)
    });
    this.setState(state => ({
      cardsArray: newArray
    }))
  }

  componentDidMount() {
    axios.get("https://deckofcardsapi.com/api/deck/new/shuffle").then(response => {
      this.setState({
        deckInfo: response.data
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.cardsArray.map(img => (
          <SingleCard sr={img.cards[0].image}
            alt={`${img.cards[0].value} ${img.cards[0].suit}`}
          />
        ))}
        <button onClick={this.addCard}>"Add Card"</button>
      </div>
    )
  }
}

export default Cards;