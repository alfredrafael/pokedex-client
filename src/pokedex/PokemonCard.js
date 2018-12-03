import React from 'react'
import { Card } from 'antd'

const headStyle = {
  background: '#ee1515',
  color: '#f0f0f0'
}

const PokemonCard = props => (
  <Card hoverable 
    headStyle={headStyle} 
    title={props.name}
    cover={<img alt="sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} />} 
  >
  </Card>
)

export default PokemonCard