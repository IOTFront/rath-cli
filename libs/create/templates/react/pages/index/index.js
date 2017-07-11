import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.scss'

class <%= conf.componentName || 'App' %> extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className={styles.<%= conf.componentName || 'App' %>}><%= conf.componentName || 'App' %></div>
    )
  }
}

ReactDOM.render(<<%= conf.componentName || 'App' %> />, document.getElementById('root'))
