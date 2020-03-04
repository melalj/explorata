/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import { Input, Menu, Dropdown, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../../state/actions';
import { getWorker } from '../../../utils/worker';

const { Search } = Input;

class SearchFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      menuVisible: false,
      dataSearchFriend: null
    };
  }

  async componentDidMount() {
    const dataSearchFriend = await getWorker().fbMessengerGetFriends();
    this.setState({ dataSearchFriend });
  }

  getMenu() {
    const { dataSearchFriend, searchValue } = this.state;
    return (
      <Menu>
        {dataSearchFriend
          .filter(
            d =>
              !searchValue ||
              d.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
          )
          .slice(0, 5)
          .map(person => (
            <Menu.Item
              onClick={() => this.handleItemClick(person)}
              key={person}
            >
              {person}
            </Menu.Item>
          ))}
      </Menu>
    );
  }

  handleItemClick(person) {
    const { setFirstDrawer } = this.props;
    setFirstDrawer('FriendProfile', { person });
  }

  hideMenu() {
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(
      () => this.setState({ menuVisible: false }),
      200
    );
  }

  render() {
    const { dataSearchFriend, menuVisible } = this.state;
    if (!dataSearchFriend) return <Spin />;
    return (
      <Dropdown overlay={this.getMenu()} visible={menuVisible}>
        <Search
          placeholder="Search a friend..."
          onChange={e => this.setState({ searchValue: e.target.value })}
          onFocus={() => this.setState({ menuVisible: true })}
          onBlur={() => this.hideMenu()}
          size="large"
        />
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  return {
    firstDrawer: state.firstDrawer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setFirstDrawer: (t, f) => Actions.setFirstDrawer(t, f)
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriend);
