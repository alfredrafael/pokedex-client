import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, Row, Col } from 'antd'
import apiUrl from '../apiConfig'
import axios from 'axios'

import './PokemonHome.scss'

class PokemonHome extends Component {
  render () {
    return (
      <div className="card-container">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" >Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" >Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" >Card content</Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PokemonHome