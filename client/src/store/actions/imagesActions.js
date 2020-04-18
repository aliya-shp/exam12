import axiosApi from "../../axiosApi";

export const ADD_IMAGE_SUCCESS = 'ADD_IMAGE_SUCCESS';
export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';

export const addImageSuccess = () => ({type: ADD_IMAGE_SUCCESS});
export const deleteImageSuccess = () => ({type: DELETE_IMAGE_SUCCESS});
export const fetchImageSuccess = image => ({type: FETCH_IMAGE_SUCCESS, image});
export const fetchImagesSuccess = images => ({FETCH_IMAGES_SUCCESS, images});


export const fetchImages = userId => {
  return async dispatch => {
    let url = '/images';

    if (userId) {
      url += '?user=' + userId;
    }
    const response = await axiosApi.get(url);
    dispatch(fetchImagesSuccess(response.data));
  }
};

export const addImage = imageData => {
  return async dispatch => {
    await axiosApi.post('/images', imageData);
    dispatch(addImageSuccess());
  }
};

export const deleteImage = imageId => {
  return async dispatch => {
    const response = await axiosApi.delete('/images', imageId);
    dispatch(deleteImageSuccess(response.data));
    dispatch(fetchImages())
  }
};
export const fetchImage = imageId => {
  return async dispatch => {
    const response = await axiosApi.get('/images/' + imageId);
    dispatch(fetchImageSuccess(response.data));
  }
};
