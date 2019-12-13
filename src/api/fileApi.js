import uuidv1 from 'uuid/v1';
import axios from 'axios';
const baseUrl = process.env.API_URL + '/upload/';

export function saveFile(file) {
  file.uuid = uuidv1();
  const data = new FormData();
  data.append('file', file);
  data.append('filename', file.uuid);

  return axios
    .post(baseUrl, data)
    .then(() => {
      console.log('file sent');
    })
    .catch(function(error) {
      console.log(error);
    });
}
