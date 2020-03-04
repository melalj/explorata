/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import { Select, Table, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import * as Actions from '../../../state/actions';
import { getWorker } from '../../../utils/worker';

const allTime = 'All Time';

class BestStreaks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      yearBestStreaks: allTime,
      dataBestStreaks: null
    };
  }

  async componentDidMount() {
    const { yearBestStreaks } = this.state;
    const dataBestStreaks = await getWorker().fbMessengerQueryBestStreaks(
      yearBestStreaks === allTime ? null : yearBestStreaks
    );
    this.setState({ dataBestStreaks, isReady: true });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { yearBestStreaks } = this.state;
    if (prevState.yearBestStreaks !== yearBestStreaks) {
      const dataBestStreaks = await getWorker().fbMessengerQueryBestStreaks(
        yearBestStreaks === allTime ? null : yearBestStreaks
      );
      this.setState({ dataBestStreaks });
    }
  }

  handleClick(d) {
    const { setFirstDrawer } = this.props;
    const dayTo = moment(d.streakFrom);
    dayTo.add(d.streak, 'days');
    const filters = {
      dayFrom: d.streakFrom,
      person: d.person,
      dayTo: dayTo.format('YYYY-MM-DD')
    };
    setFirstDrawer('ChatList', filters);
  }

  render() {
    const { dataBestStreaks, isReady, yearBestStreaks } = this.state;
    const { dataYears } = this.props;

    if (!isReady || !dataBestStreaks)  return <Spin />;

    const yearBestStreaksHandler = k => {
      this.setState({ yearBestStreaks: k });
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'person',
        render: text => <a>{text}</a>
      },
      {
        title: '#',
        align: 'right',
        render: (v, d) => (
          <div>
            <b>{`${d.streak} days`}</b>
            <br />
            {`from ${d.streakFrom}`}
          </div>
        )
      }
    ];

    return (
      <div>
        <div>
          <div style={{ float: 'right' }}>
            <Select
              defaultValue={yearBestStreaks}
              size="default"
              onChange={y => yearBestStreaksHandler(y)}
            >
              <Select.Option key="0" value={allTime}>
                {allTime}
              </Select.Option>
              {dataYears.map(y => (
                <Select.Option key={y} value={y}>
                  {y}
                </Select.Option>
              ))}
            </Select>
          </div>
          <h2>
            <span role="img" aria-label="emoji" className="emoji">
              🔥
            </span>
            Best Streaks
          </h2>
        </div>
        <Table
          columns={columns}
          showHeader={false}
          onRow={record => ({
            onClick: () => this.handleClick(record)
          })}
          rowKey="key"
          pagination={{ pageSize: 4 }}
          dataSource={dataBestStreaks}
          size="default"
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFirstDrawer: (t, f) => Actions.setFirstDrawer(t, f)
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(BestStreaks);
