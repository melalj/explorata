/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { screens } from '../constants';
import * as Actions from '../state/actions';
import { getWorker } from '../utils/worker';

class Dropfiles extends React.Component {
  handleInstructionsClick(e) {
    const { goInstructions } = this.props;
    e.stopPropagation();
    goInstructions();
  }
  
  async dropHandler(files) {
    const {
      goReport,
      setError,
      setLoading,
      setCurrentReport
    } = this.props;

    const checkFile = new RegExp('.*message.*.json');
    const validFiles = Array.from(files).filter(d => checkFile.test(d.webkitRelativePath));

    // Check files
    if (!validFiles.length) {
      setError('No valid file detected'); // TODO: dispatch error
      return null;
    }

    setLoading(true);

    const filesArrayBuffer = await Promise.all(
      validFiles.map(async file => {
        const { name, webkitRelativePath } = file;
        const arrayBuffer = await file.arrayBuffer();
        return {
          name,
          path: webkitRelativePath,
          arrayBuffer,
        }
      }));
    // Detect dataset name
    const datasetName = 'FB_MESSENGER'; // TODO
    if (!datasetName) {
      setError('No dataset detected'); // TODO: dispatch error
      return null;
    }
    // TODO: load the right worker based on datasetName
    await getWorker().fbMessengerLoadDataset(filesArrayBuffer);

    setCurrentReport(datasetName);
    setLoading(false);
    goReport();
    return null;
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) return null;
    return (
      <div>
        <div className="page">
          <div className="logo">Explorata<span className="dot">.</span></div>
          <div className="logo-description">
            <strong>Visualize crispy data from your Facebook Messenger export</strong><br />
            🏆 Most messaged friends? 🔥 Best streaks? 🗓Most active year?<br />
            👻 Ghosters or 🗣 Talkers? 😜 Most sent/received Emoji? ...
          </div>
          <Dropzone
            ref={this.dropzoneRef}
            onDrop={f => this.dropHandler(f)}
            accept=".json"
            multiple
          >
            {({ isDragActive, getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {
                  'is-active': isDragActive
                })}
              >
                <input
                  {...getInputProps()}
                  directory=""
                  webkitdirectory=""
                  nwdirectory=""
                />
                <p>
                  {isDragActive
                    ? 'Yes! here...'
                    : 'Drag and drop your “messages” folder here...'}
                </p>
                <div>
                  <Button type="primary" size="large">
                    Choose from computer...
                  </Button>
                  <Button size="large" onClick={(e) => this.handleInstructionsClick(e)}>
                    Instructions to get your dataset
                  </Button>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="disclaimer">
            <strong>Privacy is by design with Explorata</strong><br />
            - You will certainly get an alert “Upload X files to this site?” – None of your files or result are uploaded to a server. All computations are happening right on your browser.<br />
            - You can totally use this tool offline (Give it a shot)<br />
            - The source code of this project is open source on <a href="https://github.com/melalj/explorata" rel="noopener noreferrer" target="_blank">GitHub</a>.<br />
            - This website is static and is deployed on <a href="https://github.com/melalj/explorata/tree/gh-pages" rel="noopener noreferrer" target="_blank">GitHub Pages</a>.<br />
            - You can <a href="https://github.com/melalj/explorata" rel="noopener noreferrer" target="_blank">read more</a> about our motivation and privacy mesures we took for Explorata. If you want to contribute to this project, you can <a href="https://github.com/melalj/explorata/issues" rel="noopener noreferrer" target="_blank">report an issue</a> or open a <a href="https://github.com/melalj/explorata" rel="noopener noreferrer" target="_blank">pull request</a>.
          </div>
        </div>
        <div className="footer">
          Made with <a href="https://www.foodandwine.com/drinks/everything-you-need-know-about-pastis" rel="noopener noreferrer" target="_blank">Pastis️</a> by <a href="https://tonoid.com" rel="noopener noreferrer" target="_blank">Simo Elalj</a> & <a href="https://ulysse.xyz" rel="noopener noreferrer" target="_blank">Ulysse Sabbag</a> in Aix-en-Provence with the <a href="https://mozza.io" rel="noopener noreferrer" target="_blank">Mozza</a> crew
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    isDatasetReady: state.isDatasetReady,
    isLoading: state.isLoading,
    currentScreen: state.currentScreen
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setError: e => Actions.setError(e),
      setLoading: c => Actions.setLoading(c),
      goReport: () => Actions.setCurrentScreen(screens.DASHBOARD),
      goInstructions: () => Actions.setCurrentScreen(screens.INSTRUCTIONS),
      setCurrentReport: r => Actions.setCurrentReport(r),
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropfiles);
