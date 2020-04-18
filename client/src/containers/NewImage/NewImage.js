import React, {Component} from 'react';
import {connect} from "react-redux";

import ImageForm from "../../components/ImageForm/ImageForm";
import {addImage} from "../../store/actions/imagesActions";

class NewImage extends Component {

  addImage = imageData => {
    this.props.onAddingImage(imageData);
    this.props.history.push('/');
  };

  render() {
    return (
      <>
        <h2>New image</h2>
        <ImageForm
          onSubmit={this.addImage}
        />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddingImage: imageData => dispatch(addImage(imageData)),
});

export default connect(null, mapDispatchToProps)(NewImage);
