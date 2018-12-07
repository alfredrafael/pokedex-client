import React, { Component } from 'react'
import apiUrl from '../apiConfig.js'
import axios from 'axios'

import './PokemonHome.scss'
import PokemonSource from './PokemonSource.js'
import Pokemonlist from './PokemonList.js'

class UserPokedex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokemon: [],
      pokedex: ''
    }
  }

  changePokemon = () => {
    axios.get(apiUrl + '/pokedex/', {headers: {Authorization: 'bearer ' + this.props.user.token}, crossDomain: true})
      .then(res => this.setState({pokemon: res.data.pokedexes[0].pokemon, pokedex: res.data.pokedexes[0]}))
      .catch(res => this.props.flash('API Error', 'flash-error'))
  }

  componentDidMount() {
    this.changePokemon()
  }

  render() {
    const pokedexContent = this.state.pokemon.length > 0 ? (
      <Pokemonlist flash={this.props.flash} change={this.changePokemon} user={this.props.user} pokemon={PokemonSource.filter(pokemon => this.state.pokemon.includes(pokemon.id))} history={this.props.history} delete={true} pokedex={this.state.pokedex} />
    ) : <h4>Empty Pokédex!</h4>
    return (
      <React.Fragment>
        {pokedexContent}
      </React.Fragment>
    )
  }
}

export default UserPokedex