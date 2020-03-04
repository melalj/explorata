/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { screens } from '../constants';
import * as Actions from '../state/actions';
import instructionsRequest from '../images/instructionsRequest.png'
import instructionsDeselect from '../images/instructionsDeselect.png'
import instructionsSelect from '../images/instructionsSelect.png'
import instructionsCreate from '../images/instructionsCreate.png'
import instructionsFilecreated from '../images/instructionsFilecreated.png'


class Instructions extends React.Component {
  render () {
    const { goDropfile } = this.props;
    return (
      <div className="page instructions">
        <div>
          <h1>How to get your data from Facebook</h1>
          <div className="ant-steps ant-steps-vertical">
          <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">1</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Go to <a href="https://facebook.com/dyi" target="blank" rel="noopener noereferrer">facebook.com/dyi</a></div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">2</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Click on “Download Your Information”</div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">3</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Under “Request Copy”, choose ‘JSON’ for ‘Format’ and ‘Low’ for ‘Media Quality’, like so:</div>
                  <div className="ant-steps-item-description"><img src={instructionsRequest} alt="Instructions" /></div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">4</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Scroll to “Your information” and click on “Deselect All”</div>
                  <div className="ant-steps-item-description"><img src={instructionsDeselect} alt="Instructions" /></div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">5</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Scroll to ‘Messages’ and click on the checkbox.</div>
                  <div className="ant-steps-item-description"><img src={instructionsSelect} alt="Instructions" /></div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">6</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Scroll up to the top and click on ‘Create File’</div>
                  <div className="ant-steps-item-description"><img src={instructionsCreate} alt="Instructions" style={{ width: 200 }} /></div>
                </div>
              </div>
            </div>
            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon">7</span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">Well done! You should see this banner under ‘Request Copy’</div>
                  <div className="ant-steps-item-description"><img src={instructionsFilecreated} alt="Instructions" /></div>
                </div>
              </div>
            </div>

            <div className="ant-steps-item ant-steps-item-process ant-steps-item-active">
              <div role="button" className="ant-steps-item-container">
                <div className="ant-steps-item-tail"></div>
                <div className="ant-steps-item-icon"><span className="ant-steps-icon"></span></div>
                <div className="ant-steps-item-content">
                  <div className="ant-steps-item-title">
                    <p>Now, we just have to wait until Facebook creates your file (up to 6 hours). Facebook will send you both a notification and an email when the file is ready.</p>
                    <p>Finally, download your file and then unzip it. You just have to drag the ‘messages’ folder onto Explorata!</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <Button type="primary" onClick={() => goDropfile()}>Back</Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      goDropfile: () => Actions.setCurrentScreen(screens.DROPFILES),
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Instructions);
