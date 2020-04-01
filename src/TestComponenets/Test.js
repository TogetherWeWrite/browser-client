import React from 'react';


function ExtraSomething(){
  return(
    <div>
      <h1>here is a little bit of a extra something</h1>
    </div>
  )
}

function Something(props) {
  return (
    <div className="test">
      <h1>hi {props.name}</h1>
      <ExtraSomething />
    </div>
    
  );
}


export default Something;
