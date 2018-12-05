import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Tabs, Row, Col } from 'antd'
import Responsive from 'react-responsive'
import apiUrl from '../apiConfig'
import axios from 'axios'

import './PokemonDetails.scss'
import StatsTab from './StatsTab.js'

const Md = props => <Responsive {...props} minWidth={768} />

const TabPane = Tabs.TabPane

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
  }

  log(key) {
    console.log(key)
  }

  render() {
    const pokemon = this.state.pokemon
    console.log(pokemon)

    const detailContent = pokemon === null ? (
      <h2>Loading...</h2>
    ) : (
      <React.Fragment>
        <h1>{this.capitalize(pokemon.name)}</h1>
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
            <Tabs onChange={this.log} type="card">
              <TabPane tab='Stats' key='stats'>
                <div className='stats-container'>
                  <StatsTab stats={pokemon.stats} />
                </div>
              </TabPane>
              <TabPane tab="Tab 1" key="1">
                <Tabs onChange={this.log} tabPosition='left' >
                  <TabPane tab='Inner Tab 1' key='inner1'>Inner Content 1</TabPane>
                  <TabPane tab='Inner Tab 2' key='inner2'>Inner Content 2</TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
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