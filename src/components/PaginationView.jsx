import React from "react";
import { Pagination, Icon } from "semantic-ui-react";

export const PaginationView = ({ defaultActivePage, totalPageCount, onPageChange }) => {

    return (
        <Pagination
            onPageChange={onPageChange}
            defaultActivePage={defaultActivePage}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={totalPageCount}
        />
    )
};