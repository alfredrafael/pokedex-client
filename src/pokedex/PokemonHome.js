import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'

import { XLarge, Large, Medium, Small, XSmall } from '../MediaQueries.js'
import './PokemonHome.scss'
import PokemonCard from './PokemonCard.js'
import PokemonSource from './PokemonSource.js'

const Search = Input.Search

class PokemonHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: PokemonSource,
      search: ''
    }
  }

  populateCols = (colCount, i) => {
    const colRet = []

    for (let j = 0; j < colCount; j++) {
      if (i + j <= this.state.pokemon.length - 1) {
        colRet.push(
          <Col key={j.toString()} span={24 / colCount} >
            <div onClick={this.handleClick} id={this.state.pokemon[i + j].id} >
              <PokemonCard name={this.state.pokemon[i + j].name} dexNumber={this.state.pokemon[i + j].id} types={this.state.pokemon[i + j].types} />
            </div>
          </Col>
        )
      }
    }

    return colRet
  }

  populateRows = colCount => {
    const rowRet = []

    for (let i = 0; i <= this.state.pokemon.length - 1; i += colCount) {
      rowRet.push(
        <div key={i} style={{padding: '0 0 16px 0'}} >
          <Row gutter={16}>
            {this.populateCols(colCount, i)}
          </Row>
        </div>
      )
    }

    return rowRet
  }

  handleChange = event => {
    this.setState({
      search: event.target.value,
      pokemon: PokemonSource.filter(pokemon => (pokemon.name.toLowerCase().includes(event.target.value.toLowerCase()) || pokemon.id.toString() === event.target.value))
    })
  }

  handleClick = event => {
    this.props.history.push('/pokemon/' + event.currentTarget.id)
  }

  render () {
    return (
      <div>
        <div className='search-container'>
          {/* Search bar for real-time search */}
          <Search
            className='search-bar'
            placeholder='Name or Pokédex Number'
            value={this.state.search}
            onChange={this.handleChange}
            style={{ width: 300, padding: '30px 0 30px 0',  }}
          />
        </div>

        <div className="card-container">
          {/* Use different number of columns based on screen size */}
          <XSmall>
            {this.populateRows(1)}
          </XSmall>
          <Small>
            {this.populateRows(2)}
          </Small>
          <Medium>
            {this.populateRows(3)}
          </Medium>
          <Large>
            {this.populateRows(4)}
          </Large>
          <XLarge>
            {this.populateRows(6)}
          </XLarge>
        </div>
      </div>
    )
  }
}

export default PokemonHome