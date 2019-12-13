const prodImagesPath = ''; // Will point to AWS
const devImagesPath = '../../../tools/imageData';

function getImagePath(dewdrop) {
  const storedImagesPath =
    process.env.NODE_ENV === 'production' ? prodImagesPath : devImagesPath;

  return storedImagesPath + '/' + dewdrop.imageName;
}

export default getImagePath;
