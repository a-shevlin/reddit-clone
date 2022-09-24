import React from 'react';

function CreatePlate() {
  return (
    <div className="col-item" id="create">
      <div className="createBanner">
        <div id="leftPlanet"></div>
        <div id="topLeftPlanet"></div>
        <div id="middlePlanet">
          <div id="mpShadow"></div>
        </div>
        <div id="smallPlanet"></div>
        <div id="rightPlanet">
          <div id="rpRing"></div>
        </div>
      </div>
      <div className="mascotClip"></div>
      <div className="createText">
        <h6>Home</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <button id="createPost">Create Post</button>
      <button id="createCommunity" disabled>Create Community</button>
    </div>
  )
}

export default CreatePlate;