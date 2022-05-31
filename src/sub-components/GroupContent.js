import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

export default function GroupContent(props) {
    const { children, value, index } = props

    return (
        <div id="customContentInner" hidden={value !== index}>
            {value === index && <Box className="group-content">{children}</Box>}
        </div>
    )
}

GroupContent.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    index: PropTypes.string,
}
