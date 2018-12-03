import React from 'react'
import Responsive from 'react-responsive'

const XLarge = props => <Responsive {...props} minWidth={1200} />
const Large = props => <Responsive {...props} minWidth={901} maxWidth={1199}/>
const Medium = props => <Responsive {...props} minWidth={601} maxWidth={900} />
const Small = props => <Responsive {...props} minWidth={451} maxWidth={600}/>
const XSmall = props => <Responsive {...props} maxWidth={450} />

export {XLarge, Large, Medium, Small, XSmall}