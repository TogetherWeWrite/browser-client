import {useParams, withRouter} from "react-router";
import {connect} from "react-redux";
import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {CreatePage} from "../ApiFunctions/Page/PostCreatePage";


export const StoryManage = (props: any) => {
    const {id} = useParams();
    const [error, setError] = React.useState<JSX.Element>(<></>);
    const [content, setContent] = React.useState<string>("");

    const createPage = async () => {
        console.log(props);
        try {

            if (id) {
                await CreatePage(props.authentication, content, id)
            }
        }
        catch(E){
            setError(<Alert variant={"warning"} onClick={()=>{setError(<></>)}}>{E.message}</Alert>)
        }
    };

    return (<div>
        <Form style={{width: "300px"}}>
            {error}
            <Form.Group>
                <Form.Control as="textarea" placeholder="Enter storyContent" onChange={(event: any) => {
                    setContent(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId={"creatstory"}>
                <Button className="btn-default" onClick={createPage}> Create a page</Button>
            </Form.Group>
        </Form>
    </div>)
};

const mapStateToProps = (state: any) => {
    console.log("dasdasdass");
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(StoryManage));