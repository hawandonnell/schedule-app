import React from 'react'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import PropTypes from 'prop-types'

export default function Header({ group, handleGroup, groupData }) {
    return (
        <AppBar position="static" sx={{ backgroundColor: blue[300] }}>
            <Box className="my-container">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="h1">
                        Schedule App
                    </Typography>
                    <FormControl variant="standard" sx={{ minWidth: 100 }}>
                        <InputLabel id="test-label">Группа</InputLabel>
                        <Select
                            labelId="test-label"
                            label="Группа"
                            value={group}
                            id="test-select"
                            onChange={handleGroup}
                        >
                            {groupData.map((data) => (
                                <MenuItem key={data.id} value={data.id}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

Header.propTypes = {
    group: PropTypes.string,
    handleGroup: PropTypes.func,
    groupData: PropTypes.array,
}
