import React from 'react'
import { Tabs, Table } from 'antd'

const TabPane = Tabs.TabPane

function MovesTab (props) {
  const { moves } = props

  const parsedMoves = {
    'red-blue': [],
    'yellow': [],
    'gold-silver': [],
    'crystal': [],
    'ruby-sapphire': [],
    'emerald': [],
    'firered-leafgreen': [],
    'diamond-pearl': [],
    'platinum': [],
    'heartgold-soulsilver': [],
    'black-white': [],
    'black-2-white-2': [],
    'x-y': [],
    'omega-ruby-alpha-sapphire': [],
    'sun-moon': []
  }

  const tabNames = {
    'red-blue': 'Red/Blue',
    'yellow': 'Yellow',
    'gold-silver': 'Gold/Silver',
    'crystal': 'Crystal',
    'ruby-sapphire': 'Ruby/Sapphire',
    'emerald': 'Emerald',
    'firered-leafgreen': 'FR/LG',
    'diamond-pearl': 'Diamond/Pearl',
    'platinum': 'Platinum',
    'heartgold-soulsilver': 'HG/SS',
    'black-white': 'Black/White',
    'black-2-white-2': 'Black2/White2',
    'x-y': 'X/Y',
    'omega-ruby-alpha-sapphire': 'OR/AS',
    'sun-moon': 'Sun/Moon'
  }

  Object.keys(parsedMoves).forEach((version, i) => {
    const temp = moves.filter(e => e['version_group_details'].some(detail => detail['version_group'].name === version && detail['level_learned_at'] > 0))
    temp.forEach(e => {
      const levelUp = e.version_group_details.find(detail => detail.version_group.name === version && detail.level_learned_at > 0)
      parsedMoves[version].push({
        name: e.move.name,
        level: levelUp ? levelUp.level_learned_at : 0
      })
    })
  })

  return (
    <React.Fragment>
      <Tabs tabPosition='left' >
        {Object.entries(parsedMoves).map(version => (
          <TabPane tab={tabNames[version[0]]} key={version[0]}>{
            <Table 
              columns={[{
                title: 'Move',
                dataIndex: 'move',
                key: 'move',
              }, {
                title: 'Level Learned',
                dataIndex: 'level-learned',
                key: 'level-learned',
              }]}
              dataSource={
                version[1].sort((moveA, moveB) => moveA.level - moveB.level).map((move, i) => (
                  {
                    key: i,
                    move: move.name.replace('-', ' '),
                    'level-learned': move.level
                  }
                ))
              }
              pagination={false}
            />
            
          }
          </TabPane>
        ))}
      </Tabs>
    </React.Fragment>
  )
}

export default MovesTab