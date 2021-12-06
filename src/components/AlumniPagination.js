import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export default function AlumniPagination(props) {

    let results = props.results

    const handleChange = (event, value) => {
        props.setPage(props.page)
    }

    return (
        <Stack spacing={2}>
            <Pagination page={props.page} count={Math.ceil(results.length/25)} onChange={handleChange}/>
        </Stack>
    );
} 