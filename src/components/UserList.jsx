import React, { useEffect, useState } from 'react';
import { Button, Grid, Table, Confirm } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { PaginationView } from './PaginationView';
import { getAllUser } from '../services';

export const UserListView = (props) => {
    const [userList, setUserList] = useState([]);
    const [isBusy, setIsBusy] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState(0);
    const [shouldShowDeleteConfirmation, setShouldShowDeleteConfirmation] = useState(false);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [defaultActivePage, setDefaultActivePage] = useState(1);

    useEffect(() => {
        fetchUsers(1);
    }, []);


    const fetchUsers = (activePage) =>{
        getAllUser(activePage).then((response) => {
            if(response.status === 200){
                setUserList(response?.data?.data);
                setTotalPageCount(response?.data.meta?.pagination?.pages);
                setDefaultActivePage(response?.data.meta?.pagination?.page);
            }
           // setUserList(response);
        }).catch((error) => {
            alert('Error');
        })
    };

    const onPageChanged = (event, data) =>{
        setDefaultActivePage(data?.activePage);
        fetchUsers(data?.activePage);
    }

    const onDeleteUser = (id) => {
        setDeletedUserId(id);
        setShouldShowDeleteConfirmation(true);
    };

    const onDeleteUserConfirmHandler = (event) => {
        setShouldShowDeleteConfirmation(false);
        // delete user Api call
    }


    const ConfirmationDialog = (<Confirm
        open={shouldShowDeleteConfirmation}
        header={`Deleting User - ${userList?.find((item) => item.id === deletedUserId)?.name}`}
        content='Are you sure you want to Delete this User ?'
        onCancel={() => setShouldShowDeleteConfirmation(false)}
        onConfirm={onDeleteUserConfirmHandler}
    />);


    return (
        <>
            {ConfirmationDialog}

            <Grid container columns="1">
                <Grid.Row columns="2">
                    <Grid.Column>
                        <h1>User List</h1>
                    </Grid.Column>

                    <Grid.Column>
                        <Button positive> <Link to={`/adduser`}> Add New User </Link></Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>

                     { (totalPageCount > 0 && defaultActivePage !== 0) && <PaginationView defaultActivePage={defaultActivePage} totalPageCount={totalPageCount} onPageChange={onPageChanged}/> }
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                    <Table.HeaderCell>Gender</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {userList?.map((user) => (<Table.Row>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.gender}</Table.Cell>
                                    <Table.Cell>
                                        <Button key={`${user.id}-${user.name}`} color="red" onClick={() => onDeleteUser(user.id)}>Delete</Button>
                                    </Table.Cell>
                                </Table.Row>))}
                            </Table.Body>

                        </Table>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        </>
    )
}