import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tabs, Tab } from '@mui/material'
import { handleTabColor } from '../helpers'

export default function WeekdayTabs({ tab, handleTab }) {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box className="my-container">
                <Tabs
                    allowScrollButtonsMobile
                    value={tab}
                    onChange={handleTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="weekday tabs"
                >
                    <Tab
                        label="Понедельник"
                        sx={{
                            color: (theme) => handleTabColor(theme, 0),
                        }}
                    />
                    <Tab
                        label="Вторник"
                        sx={{
                            color: (theme) => handleTabColor(theme, 1),
                        }}
                    />
                    <Tab
                        label="Среда"
                        sx={{
                            color: (theme) => handleTabColor(theme, 2),
                        }}
                    />
                    <Tab
                        label="Четверг"
                        sx={{
                            color: (theme) => handleTabColor(theme, 3),
                        }}
                    />
                    <Tab
                        label="Пятница"
                        sx={{
                            color: (theme) => handleTabColor(theme, 4),
                        }}
                    />
                </Tabs>
            </Box>
        </Box>
    )
}

WeekdayTabs.propTypes = {
    tab: PropTypes.number,
    handleTab: PropTypes.func,
}
