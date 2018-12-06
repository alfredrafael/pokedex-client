import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

function StatsTab (props) {
  const { stats } = props

  const baseHp = stats.find(e => e.stat.name === 'hp')
  const baseAtk = stats.find(e => e.stat.name === 'attack')
  const baseDef = stats.find(e => e.stat.name === 'defense')
  const baseSpeed = stats.find(e => e.stat.name === 'speed')
  const baseSpecAtk = stats.find(e => e.stat.name === 'special-attack')
  const baseSpecDef = stats.find(e => e.stat.name === 'special-defense')

  const totalStats = baseHp.base_stat + baseAtk.base_stat + baseDef.base_stat + baseSpecAtk.base_stat + baseSpecDef.base_stat + baseSpeed.base_stat

  const chartData = {
    labels: ['HP', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Speed'],
    datasets: [{
      data: [baseHp.base_stat, baseAtk.base_stat, baseDef.base_stat, baseSpecAtk.base_stat, baseSpecDef.base_stat, baseSpeed.base_stat],
      backgroundColor: ['#F4E580', '#C97487', '#769BDE', '#AF75D6', '#9CDE95', '#9CE0E4']
    }]
  }

  const chartOptions = {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    },
    legend: {
      display: false
    }
  }

  return (
    <React.Fragment>
      <h5>Total Base Stats: {totalStats}</h5>
      <HorizontalBar data={chartData} options={chartOptions} />
    </React.Fragment>
  )
}

export default StatsTab