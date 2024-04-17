import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import DownloadIcon from 'material-ui/svg-icons/file/file-download'; // Import the download icon
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {  
    state = {
        open: false,
        currentImg: ''
    };

    handleOpen = img => {
        this.setState({ open: true, currentImg: img });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDownload = (imgUrl, imgFormat) => {
        // Create a new anchor element
        const anchor = document.createElement('a');
        // Set the href attribute to the image URL
        anchor.href = imgUrl;
        // Determine the file extension based on the image format
        const fileExt = imgFormat === 'jpeg' ? 'jpg' : 'png';
        // Set the download attribute to specify the filename
        anchor.download = `image.${fileExt}`; // Adjust filename based on format
        // Programmatically click the anchor element to trigger the download
        anchor.click();
    };
    
    

    render() {
        let imageListContent;
        const { images } = this.props;

        if (images) {
            imageListContent = (
                <GridList cols={3}>
                    {images.map(img => (
                        <GridTile
                            title={img.tags}
                            key={img.id}
                            subtitle={
                                <span>
                                    by <strong>{img.user}</strong>
                                </span>
                            }
                            actionIcon={
                                <div>
                                    <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                                        <ZoomIn color="white" />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleDownload(img.largeImageURL, 'jpeg', 'png')}>
                                        <DownloadIcon color="white" />
                                    </IconButton>
                                </div>
                            }>
                            <img src={img.largeImageURL} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            );
        } else {
            imageListContent = null;
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ];

        return (
            <div>
                {imageListContent}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
                </Dialog>
            </div>
        );
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
};

export default ImageResults;
