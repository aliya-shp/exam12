import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import {apiURL} from "../../constants";

const ImageModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} className={props.className}>
        <ModalBody>
          <img style={{width: '100%'}} src={apiURL + '/uploads/' + props.image} alt='Big' />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default ImageModal;