import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class SimpleFormExample extends React.Component {
    
    
        state ={
            formData: {
                nameof: '',
                email: '',
                message: '',
            },
            submitted: false,
            
        }
        
       
    
    myChangeHandler = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
        

    }

    mySubmitHandler = () => {

        var data = {
            nameof : this.state.formData.nameof,
            email : this.state.formData.email,
            message : this.state.formData.message
          };
        var URL = "https://4v0ffsf7bb.execute-api.us-west-1.amazonaws.com/Prod/mkchallengeLambda";
        fetch(URL, {
        "method": "POST",
        "headers": {
            "Access-Control-Allow-Origin" : '*',
            "content-type": "application/json",
            "accept": "application/json"},
        "body": JSON.stringify(data)
        
    })
        .then(response => response.json())
        .then(() => {
            console.log('Success!', data);
            })
            .catch((error) => {
                console.error('Error:', error);
        
     },


        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ formData: {email: '', nameof: '', message: ''},submitted: false,  }), 1000);
            
        }));

    }



    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.mySubmitHandler}
                align='center'             
            >
                <h2>Send your message</h2>
                <TextValidator
                
                    label="Name"
                    onChange={this.myChangeHandler}
                    name="nameof"
                    value={formData.nameof}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                   
                    label="Email"
                    onChange={this.myChangeHandler}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                
                <br />
                <TextField
               id="outlined-multiline-flexible"
                label="Message"
                onChange={this.myChangeHandler}
                name = "message"
                multiline = "true"
                variant="outlined"
                value={formData.message}
                />
                <br />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={submitted}
                    >
                    {
                        (submitted && 'You sent a message!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}

