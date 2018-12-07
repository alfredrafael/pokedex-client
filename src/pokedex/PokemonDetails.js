import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Tabs, Row, Col, Tag } from 'antd'
import Responsive from 'react-responsive'
import apiUrl from '../apiConfig'
import axios from 'axios'

import './PokemonDetails.scss'
import StatsTab from './StatsTab.js'
import MovesTab from './MovesTab.js'

const Md = props => <Responsive {...props} minWidth={768} />

const TabPane = Tabs.TabPane


const typeColors = {
  normal: '#a8a878',
  fire: '#f08030',
  fighting: '#c03028',
  water: '#6890f0',
  flying: '#a890f0',
  grass: '#78c850',
  poison: '#a040a0',
  electric: '#f8d030',
  ground: '#e0c068',
  psychic: '#f85888',
  rock: '#b8a038',
  ice: '#98d8d8',
  bug: '#a8b820',
  dragon: '#7038f8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac'
}

class PokemonDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: null
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + this.props.match.params.id + '/', {crossDomain: true})
      .then(res => res.status === 200 ? res : new Error())
      .then(res => this.setState({pokemon: res.data}))
      .catch(() => this.props.flash('API Error', 'flash-error'))
  }

  render() {
    const pokemon = this.state.pokemon

    const detailContent = pokemon === null ? (
      <h2>Loading...</h2>
    ) : (
      <React.Fragment>
        <div className='name-container'>
          <h1>{this.capitalize(pokemon.name)}</h1>
          {pokemon.types.map(type => (
            <Tag color={typeColors[type.type.name.toLowerCase()]} key={type.type.name + '-' + pokemon.name}>{this.capitalize(type.type.name)}</Tag>
          ))}
        </div>
        <Row >
          <Col xs={{span: 24}} md={{span: 12}} lg={{span: 8, offset: 2}} xl={{span: 6, offset: 3}} >
            <div className='sprite-container' >
              <img className='normal-sprite' src={`https://img.pokemondb.net/sprites/x-y/normal/${pokemon.name}.png`} alt={pokemon.name} /><br></br>
              <Md>
                <img className='shiny-sprite' src={`https://img.pokemondb.net/sprites/x-y/shiny/${pokemon.name}.png`} alt={'shiny ' + pokemon.name} />
              </Md>
            </div>
          </Col>
          <Col xs={{span: 24}} md={{span: 12}} lg={{span: 12, offset: 2}} xl={{span: 12, offset: 3}} >
            <Tabs type="card">
              <TabPane tab='Stats' key='stats'>
                <div className='tab-container'>
                  <StatsTab stats={pokemon.stats} />
                </div>
              </TabPane>
              <TabPane tab="Move Set" key="moves">
                <div className='tab-container'>
                  <MovesTab moves={pokemon.moves} />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>

    )

    return (
      <React.Fragment>
        {detailContent}
      </React.Fragment>
    )
  }
}

export default PokemonDetails