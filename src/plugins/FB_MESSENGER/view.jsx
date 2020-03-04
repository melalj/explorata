/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Divider } from 'antd';

import MessengerActivity from './components/MessengerActivity';
import MostMessaged from './components/MostMessaged';
import BestStreaks from './components/BestStreaks';
import RatioSent from './components/RatioSent';
import Drawers from './components/Drawers';
import SearchFriend from './components/SearchFriend';
import { getWorker } from '../../utils/worker';

export default class ViewFbMessenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataYears: null
    };
  }

  async componentDidMount() {
    const dataYears = await getWorker().fbMessengerQueryYears();
    this.setState({ dataYears });
  }

  render() {
    const { dataYears } = this.state;
    if (!dataYears) return null;

    return (
      <div>
        <Drawers />
        <Divider />
        <SearchFriend />
        <MessengerActivity dataYears={dataYears} />
        <br />
        <Row gutter={28}>
          <Col span={12}>
            <MostMessaged
              dataYears={dataYears}
            />
          </Col>
          <Col span={12}>
            <BestStreaks
              dataYears={dataYears}
            />
          </Col>
        </Row>
        <Row gutter={28}>
          <Col span={12}>
            <RatioSent
              dataYears={dataYears}
            />
          </Col>
          <Col span={12}>
            <RatioSent
              dataYears={dataYears}
              isGhosters
            />
          </Col>
        </Row>
      </div>
    );
  }
}
