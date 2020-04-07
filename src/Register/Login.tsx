import './Account.css'
import {Button, TextField}  from '@material-ui/core'
import React from "react";
import {connectiostring} from '../connectiostring'


interface IAccount {
    username?: string;
    password?: string;
}

class Register extends React.Component<IAccount> {

    public account: IAccount = {

    };

    public validateUsername = () => {
        var un = this.account.username;
        if (un == null || un.length < 8) {//maybe no usernames with numbers.s
            console.log(false)
        } else {
            //ignore
        }
    };

    public validatePassword = () => {
        var pw = this.account.password
        if (pw == null || pw.length < 8) {
            console.log(false)
        }

    };

    public updateUsername(value:any){
        this.account.username = value;
    }
    public updatePassword(value:any){
        this.account.password = value;
    }

    public register = () =>{
        this.validateUsername();
        this.validatePassword();
        console.log(connectiostring);
    };

    public registerpage(){
        return (
            <div className={"RegisterWindow"}>
                <form noValidate autoComplete="off" className={"Center"}>
                    <div className={"W100"}>
                        <TextField required id="standard-required" label="Username" defaultValue="" onChange={event => this.updateUsername(event.target.value)}/>
                    </div>
                    <div className={"W100"}>
                        <TextField
                            required
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={event => this.updatePassword(event.target.value)}
                        />
                    </div>
                    <div className={"W100"}>
                        <Button variant="contained" onClick={this.register}>Register</Button>
                    </div>
                </form>
            </div>
        )
    }

    public render() {
        return (
            // if(!LoggedIn){
            this.registerpage()
        )
    }
}

export default Register;