import React from "react";

function Header() {
  return (
    <React.Fragment>
      <div class ="dropdown">
      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown</button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Home</a></li>
          <li><a class="dropdown-item" href="#">Popular</a></li>
          <li><a class="dropdown-item" href="#">All</a></li>
        </ul>
    </div>
    </React.Fragment>
  )
}

export default Header;
