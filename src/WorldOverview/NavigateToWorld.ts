import React from "react";

const NavigateToWorld = (props :any ,worldId : string ) =>{
    props.history.push('/world/'+worldId)
};

export default NavigateToWorld;