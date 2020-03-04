/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import { Table, Select, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../../state/actions';
import { getWorker } from '../../../utils/worker';

const allTime = 'All Time';

class MostMessaged extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      yearMostMessaged: allTime,
      dataMostMessaged: null
    };
  }

  async componentDidMount() {
    const { yearMostMessaged } = this.state;
    const dataMostMessaged = await getWorker().fbMessengerQueryMostMessaged(
      yearMostMessaged === allTime ? null : yearMostMessaged
    );
    this.setState({ dataMostMessaged, isReady: true });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { yearMostMessaged } = this.state;
    if (prevState.yearMostMessaged !== yearMostMessaged) {
      const dataMostMessaged = await getWorker().fbMessengerQueryMostMessaged(
        yearMostMessaged === allTime ? null : yearMostMessaged
      );
      this.setState({ dataMostMessaged });
    }
  }

  handleItemClick(d) {
    const { setFirstDrawer } = this.props;
    const filters = { person: d.person };
    setFirstDrawer('FriendProfile', filters);
  }

  render() {
    const { dataMostMessaged, isReady, yearMostMessaged } = this.state;
    const { dataYears } = this.props;

    if (!isReady || !dataMostMessaged) return <Spin />;

    const yearMostMessagedHandler = k => {
      this.setState({ yearMostMessaged: k });
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'person',
        render: text => <a>{text}</a>
      },
      {
        title: '#',
        dataIndex: 'count',
        align: 'right',
        render: v => v.toLocaleString()
      }
    ];

    return (
      <div>
        <div>
          <div style={{ float: 'right' }}>
            <Select
              defaultValue={yearMostMessaged}
              size="default"
              onChange={y => yearMostMessagedHandler(y)}
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
            <span role="img" aria-label="trophy" className="emoji">
              🏆
            </span>
            Most Messaged
          </h2>
        </div>
        <Table
          columns={columns}
          showHeader={false}
          pagination={{ pageSize: 5 }}
          onRow={record => ({
            onClick: () => this.handleItemClick(record)
          })}
          rowKey="person"
          dataSource={dataMostMessaged}
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

export default connect(null, mapDispatchToProps)(MostMessaged);
