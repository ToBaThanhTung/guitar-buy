import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import AddIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import classNames from 'classnames'
import ImageHandler from './ImageHandler';
import { USER_SERVER } from '../../utils/mics'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      uploading: false,
    }
    this.initialState = this.state;
  }

  resetState = () => this.setState(this.initialState);


  onDrop = async (files) => {
    // console.log(acceptedFiles);
    this.setState({ uploading: true });

    let formData = new FormData();

    formData.append("file", files[0]);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    }

    try {
      await axios
        .post(`${USER_SERVER}/uploadimage`, formData, config)
        .then(res => {
          this.setState({
            uploading: false,
            uploadedFiles: [
              ...this.state.uploadedFiles,
              res.data
            ]
          },
            () => this.props.getImages(this.state.uploadedFiles));
        })
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err.response);
    }

  }


  showUploadedImages = () => (
    <div>
      {this.state.uploading ?
        <CircularProgress />
        : this.state.uploadedFiles ?
          <ImageHandler
            data={this.state.uploadedFiles}
            onRemoveImage={this.onRemoveImage}
          />
          : null
      }
    </div>
  )

  onRemoveImage = async (id) => {
    try {
      const config = { withCredentials: true }
      this.setState({ ...this.state, uploading: true });
      await axios
        .get(`${USER_SERVER}/removeimage?public_id=${id}`, config)
        .then(res => {
          console.log(res);
          let images = this.state.uploadedFiles.filter(item => {
            return item.public_id !== id;
          });
          this.setState({
            uploadedFiles: images,
            uploading: false
          }, () => this.props.getImages(this.state.uploadedFiles));
        })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log('state on image upload',this.state);
    
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
              >
                <Button>
                  <AddIcon style={{ marginRight: '5px' }} />
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p> Drop files here...</p> :
                      <p> Try dropping some files here, or click to select files to upload.</p>
                  }
                </Button>
              </div>
            )
          }}
        </Dropzone>
        {this.showUploadedImages()}
      </div>
    );
  }
}

export default ImageUpload;