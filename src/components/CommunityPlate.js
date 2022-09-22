import React, { useState, useEffect }from "react";

function CommunityPlate() {
  return (
    <div className="col-item" id="communities">
      <div className="cHeader">
        <h6>Top Communities</h6>
        <hr />
      </div>
      <div className="cBoxLines">
        <a href="#" >
          <span>1</span>
          <div className="cMovement"></div>
          <img src="" className="cImg"/>
          <span>r/first</span>
          <button className="cJoin">Join</button>
        </a>
      </div>
      <div className="cBoxLines">
        <a href="#" >
          <span>2</span>
          <div className="cMovement"></div>
          <img src="" className="cImg"/>
          <span>r/second</span>
          <button className="cJoin">Join</button>
        </a>
      </div>

      <div className="cBoxLines">
        <a href="#" >
          <span>3</span>
          <div className="cMovement"></div>
          <img src="" className="cImg"/>
          <span>r/third</span>
          <button className="cJoin">Join</button>
        </a>
      </div>
      <div className="cBoxLines">
        <a href="#" >
          <span>4</span>
          <div className="cMovement"></div>
          <img src="" className="cImg"/>
          <span>r/fourth</span>
          <button className="cJoin">Join</button>
        </a>
      </div>
      <div className="cBoxLines topBorder">
        <a href="#" >
          <span>5</span>
          <div className="cMovement"></div>
          <img src="" className="cImg"/>
          <span>r/fifth</span>
          <button className="cJoin">Join</button>
        </a>
      </div>
      <button className="cViewAll">View All</button>
    </div>
  )
}

export default CommunityPlate;