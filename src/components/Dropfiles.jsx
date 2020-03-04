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


function handleRepoClick(e) {
  e.stopPropagation();
  if (window) window.open('https://www.github.com/melalj/explorata');
}

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
      <div className="page">
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
              <div className="disclaimer">
                Everything is analyzed locally right on your computer.
                <br />
                Explorata do not store or send any information to any external server.
                <br />
                The source code is available on
                <a onClick={e => handleRepoClick(e)}> Github</a>
              </div>
            </div>
          )}
        </Dropzone>
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
