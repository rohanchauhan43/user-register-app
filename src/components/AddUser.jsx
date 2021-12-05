import React, { useState } from 'react';
import { Grid, Form, Input, Button, Divider, Radio } from 'semantic-ui-react';
import { Link , useHistory} from 'react-router-dom';
import { addUser } from '../services';

export const AddUser = ()=>{
    let history = useHistory();
    const [user, setUser] = useState({
        name:'',
        email:'',
        gender:'',
        status:'active'
    });

    const [isBusy, setIsBusy] = useState(false);

    const onAddNewUser =(event) =>{
        setIsBusy(true);
        
        addUser(user).then((response) =>{
            alert('User Added Successfully !!');
            history.push('/');
            setIsBusy(false);
        }).catch((error) =>{
            alert('Something went wrong !!');
            console.log(error);
            setIsBusy(false);
        })
    };

    return(
       <Grid container columns="1" textAlign="left">
            <Grid.Row columns="2">
                <Grid.Column>
                    <h1>Add New User</h1>
                </Grid.Column>

                <Grid.Column>
                <Button positive> <Link to={`/`}>Go to User List </Link></Button>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <Form.Field>
                            <span> User Name </span>
                            <Input
                                type="text"
                                placeholder="Enter User Name"
                                value={user.name}
                                onChange={(event) => setUser({ ...user, name: event.target.value })}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <Form.Field>
                            <span> Email ID </span>
                            <Input
                                type="text"
                                placeholder="Enter Email ID"
                                value={user.email}
                                onChange={(event) => setUser({ ...user, email: event.target.value })}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <span> User Gender </span>
                        <Form.Field>
                            <Radio
                                label="Male"
                                value="male"
                                name="gender"
                                checked={user.gender === 'male'}
                                onChange={(event, { value }) => setUser({ ...user, gender: value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label="Female"
                                value="female"
                                name="gender"
                                checked={user.gender === 'female'}
                                onChange={(event, { value }) => setUser({ ...user, gender: value })}
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Button primary fluid onClick={onAddNewUser} loading={isBusy} >Add New User</Button>
                </Grid.Column>
            </Grid.Row>

       </Grid>
    );
}