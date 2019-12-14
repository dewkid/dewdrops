import React from 'react';

const AboutPage = () => (
  <div>
    <h2>The Task</h2>
    <p>
      Create a react/redux web app using AWS services that allows a user to
      upload an image and then display a set of images with comments, i.e. a
      poor man’s Instagram. By AWS services, things like S3, RDS, ELB,
      etc. User authentication is not required.
    </p>
    <ul>
      <li>Landing page should display all images as thumbnails</li>
      <li>Landing page should provide means for uploading new image/caption</li>
      <li>
        Thumbnails on landing page should be clickable into detailed page for
        that image
      </li>
      <li>
        Detailed page for image should display caption and all comments and
        provide interface to add new comments
      </li>
      <li> Detailed page should provide navigation back to landing page</li>
      <li> Detailed page should provide navigation to previous/next image</li>
    </ul>
  </div>
);

export default AboutPage;
