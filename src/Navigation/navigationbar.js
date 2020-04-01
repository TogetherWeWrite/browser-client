import React from 'react';


// (props.link)
// contains the link 
// (props.name)
// name of the link which will be displayed. 
function navitem(props){
    return(
        <div>
            <button class="btn btn-succes"><a href= {props.link}></a></button>
        </div>
    )

}

function navbar(){
return(
    <div>

    </div>
)
};

export default Navbar