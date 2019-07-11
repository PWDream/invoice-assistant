/**
 *  Created by pw on 2019-07-10 16:15.
 */

import Taro, { Component } from '@tarojs/taro'
import '../assets/IconFont/iconfont'

interface Props {
  name: string
  className?: string
  style?: any
  onClick?: () => void
}

export default class AIIcon extends Component<Props> {
  handleOnClick = () => {
    let { onClick } = this.props
    onClick && onClick()
  }

  render() {
    let { name, className = '', style = {} } = this.props

    return (
      <svg className={`icon ${className}`} style={style} aria-hidden="true" onClick={this.handleOnClick}>
        <use xlinkHref={name} />
      </svg>
    )
  }
}
