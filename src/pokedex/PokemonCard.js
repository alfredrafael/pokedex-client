import React from 'react'
import { Card, Tag, Button } from 'antd'
import axios from 'axios'
import apiUrl from '../apiConfig'

import PokemonSource from './PokemonSource.js'

import './PokemonCard.scss'

const headStyle = {
  background: '#ee1515',
  color: '#f0f0f0'
}

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

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function handleAdd (event, user, pokedex, pokeId, change, flash) {
  const newPokemonArray = pokedex.pokemon.slice()
  newPokemonArray.push(pokeId)

  event.preventDefault()
  event.stopPropagation()

  axios.patch(apiUrl + '/pokedex/' + pokedex._id, 
    {
      pokedex: 
      {
        pokemon: newPokemonArray
      }
    },
    {
      headers: 
        {'Authorization': 'bearer ' + user.token,
          'Content-Type': 'application/json'}
    })
    .then(() => flash(`Added ${PokemonSource.find(pokemon => pokemon.id === pokeId).name}`,'flash-success'))
    .then(() => change())
    .catch(res => flash('PATCH-Add Error', 'flash-error'))
}

function handleRemove (event, user, pokedex, pokeId, change) {
  const newPokemonArray = pokedex.pokemon.slice().filter(num => num !== pokeId)

  event.preventDefault()
  event.stopPropagation()

  axios.patch(apiUrl + '/pokedex/' + pokedex._id, 
    {
      pokedex: 
      {
        pokemon: newPokemonArray
      }
    },
    {
      headers: 
        {'Authorization': 'bearer ' + user.token,
          'Content-Type': 'application/json'}
    })
    .then(() => change())
    .catch(res => flash('PATCH-Remove Error', 'flash-error'))
}

const PokemonCard = props => (
  <Card hoverable 
    headStyle={headStyle}
    title={props.name}
    extra={'#'+props.dexNumber}
    cover={<img alt={props.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.dexNumber}.png`} />} 
  >
    <div className='type-container'>
      {props.types.map(type => (
        type === '' ? '' : <Tag color={typeColors[type.toLowerCase()]} key={type + '-' + props.name}>{capitalize(type)}</Tag>
      ))}
    </div>
    <div className='button-container'>
      {props.add ? <Button onClick={event => handleAdd(event, props.user, props.pokedex, props.dexNumber, props.change, props.flash)} size='small'>Add</Button> : ''}
      {props.delete ? <Button onClick={event => handleRemove(event, props.user, props.pokedex, props.dexNumber, props.change)} size='small' type='danger'>Remove</Button> : ''}
    </div>
  </Card>
)

export default PokemonCard