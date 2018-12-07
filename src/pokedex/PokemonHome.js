import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

import './PokemonHome.scss'
import PokemonSource from './PokemonSource.js'
import Pokemonlist from './PokemonList.js'

class PokemonHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pokedex: undefined
    }
  }

  componentDidMount() {
    this.update()
  }

  update = () => {
    if (this.props.user) {
      axios.get(apiUrl + '/pokedex/', {headers: {Authorization: 'bearer ' + this.props.user.token}})
        .then(res => {
          if (res.status === 204) {
            axios.post(apiUrl + '/pokedex/', {pokedex: {title: 'first-pokedex', pokemon: [25]}} ,{headers: {Authorization: 'Bearer ' + this.props.user.token, 'Content-Type': 'application/json'}})
              .then(response => this.setState({pokedex: response.data.pokedex}))
              .catch(response => this.props.flash('POST Failed', 'flash-error'))
          }
          return res
        })
        .then(res => res.status === 200 ? this.setState({pokedex: res.data.pokedexes[0]}) : '' )
        .catch(res => this.props.flash('GET-update Failed', 'flash-error'))
    }
  }

  render() {
    return (
      <React.Fragment>
        <Pokemonlist change={this.update} flash={this.props.flash} user={this.props.user} pokemon={PokemonSource} history={this.props.history} add={this.props.user ? true : false} pokedex={this.state.pokedex} />
      </React.Fragment>
    )
  }
}

export default PokemonHome