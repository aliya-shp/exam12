import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {apiURL} from '../../../constants';

const ImageListItem = props => {
  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/' + props.image;
  }
  return (
    <Card width={30} styles={{marginTop: '10px', marginRight: '5px'}}>
      <CardBody>
        <img src={image} className="img-thumbnail" alt={image} />
        <div style={{ textAlign: 'center' }}>
          <div styles={{color: 'violet'}} onClick={() => props.showModal(props.image)}>
            {props.title}
          </div>
          <p>By: <Link to={'/users/' + props.user._id}>{props.user.username}</Link></p>
          {props.userCanDelete && <Button onClick={()=>props.deleteImage(props._id)}>Delete</Button>}
        </div>
      </CardBody>
    </Card>
  );
};

ImageListItem.propTypes = {
  image: PropTypes.string,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default ImageListItem;
