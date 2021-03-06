/**
 *  Created by pw on 2019-07-08 13:50.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import classnames from 'classnames'
import './index.less'
import { HomeInvoiceListIF } from '../../types/InvoiceIF'
import { InvoiceStore } from '../../store'
import HomeActionSheet from './HomeActionSheet'
import AIIcon from '../../components/AIIcon'
import HomeCard from '../../components/HomeCard'
import { getHomeAddBottom } from '../../multiport/styleConfig'

interface Props {
  invoiceStore?: typeof InvoiceStore
}

interface State {
  isOpened: boolean
}

@inject('invoiceStore')
@observer
export default class Home extends Component<Props, State> {
  state = {
    isOpened: false
  }

  handleClickItem = (home: HomeInvoiceListIF) => {
    let url = `/pages/invoice-detail/index?id=${home.id}`
    if (home.entityId !== 'system_发票主体') {
      url = `/pages/invoice-detail/TicketDetail?id=${home.id}`
    }
    Taro.navigateTo({
      url
    })
  }

  handleActionSheet = () => {
    this.setState({ isOpened: true })
  }

  handleActionClick = (type: string) => {
    console.log(type)
    this.setState({ isOpened: false })
  }

  render() {
    if (!this.props.invoiceStore) {
      return null
    }
    const bottom = getHomeAddBottom()
    return (
      <View className="home_wrapper">
        <View
          className={classnames({
            home_list: this.props.invoiceStore.homeList.length
          })}
        >
          <AtList>
            {this.props.invoiceStore.homeList.map((homeModel: HomeInvoiceListIF) => {
              return <HomeCard key={homeModel.id} homeModel={homeModel} onClickItem={this.handleClickItem} />
            })}
          </AtList>
        </View>
        <View className="add_button" style={{ bottom: `${bottom}px` }} onClick={this.handleActionSheet}>
          <AIIcon className="icon" name="plus-default" size={30} color={'white'} />
        </View>
        <HomeActionSheet isOpened={this.state.isOpened} onAction={type => this.handleActionClick(type)} />
      </View>
    )
  }
}
