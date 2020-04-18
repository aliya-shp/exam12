import React, {Component} from 'react';
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ImageListItem from "../../components/UI/ImageListItem/ImageListItem";
import ImageModal from "../../components/ImageModal/ImageModal";
import {deleteImage, fetchImages} from "../../store/actions/imagesActions";

class Images extends Component {
  state = {
    isModalOpen: false,
    image: null,
  };

  componentDidMount() {
    this.props.fetchImages(this.props.match.params.id);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchImages(this.props.match.params.id);
    }
  };

  toggleModal = (image) => {
    this.setState({isModalOpen: !this.state.isModalOpen, image: image});
  };

  deleteImage = imageId => {
    this.props.deleteImage(imageId, this.props.user._id)
  };

  render() {
    const userCanEdit = this.props.user && this.props.user._id === this.props.match.params.id;
    return (
      <Row>
        <Col sm={12}>
          <h2>
            Images
            {userCanEdit &&
            <Link to="/images/new">
              <Button
                color="primary"
                className="float-right"
              >
                Add image
              </Button>
            </Link>
            }
          </h2>

          <div styles={{display: 'flex', flexWrap: 'wrap'}}>
            {this.props.images.map(image => (
              <ImageListItem
                key={image._id}
                _id={image._id}
                title={image.title}
                user={image.user}
                image={image.image}
                showModal={this.toggleModal}
                userCanDelete={userCanEdit}
                deleteImage={this.deleteImage}
              />
            ))}
          </div>
          <ImageModal
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
            image={this.state.image}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  fetchImages: (userId) => dispatch(fetchImages(userId)),
  deleteImage: (imageId, userId) => dispatch(deleteImage(imageId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Images);
