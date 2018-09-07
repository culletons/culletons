import BasicInfo from './BasicInfo.jsx'
import React from 'react'

class Forms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basicToggle: true
    }
  }

  render() {
    return (
      <div>
      <BasicInfo user={this.props.user} />
      </div>
    )
  }
}

export default Forms