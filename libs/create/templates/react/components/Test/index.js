import React, { Component } from 'react'
import './index.scss'

class <%= conf.componentName || 'Test' %> extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div><%= conf.componentName || 'Test' %></div>
    )
  }
}
