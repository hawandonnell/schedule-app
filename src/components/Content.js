import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import AppBar from '@mui/material/AppBar'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import '../style.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

const myTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
})

const firebaseApp = initializeApp({
    apiKey: 'AIzaSyCPv7o9QB1RjvlIQ9GuP_fUEQ6ubA5Ar3I',
    authDomain: 'schedule-service-328908.firebaseapp.com',
    projectId: 'schedule-service-328908',
})

const db = getFirestore(firebaseApp)

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box className="tab-panel">{children}</Box>}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
    index: PropTypes.number,
}

function GroupContent(props) {
    const { children, value, index } = props

    return (
        <div id="customContentInner" hidden={value !== index}>
            {value === index && <Box className="group-content">{children}</Box>}
        </div>
    )
}

GroupContent.propTypes = {
    children: PropTypes.node,
    value: PropTypes.number,
    index: PropTypes.number,
}

export default function Content() {
    const [group, setGroup] = useState('')
    const [tab, setTab] = useState(0)
    const [isLoaded, setIsLoaded] = useState(true)
    const [groupData, setGroupData] = useState([])

    const handleGroup = (e) => {
        setGroup(e.target.value)
    }

    const handleTab = (e, tab) => {
        setTab(tab)
    }

    const handleTabColor = (theme, value) => {
        if (value == new Date().getDay() - 1) {
            return theme.palette.primary.main
        } else {
            return null
        }
    }

    const handleLessonColor = (theme, value, time) => {
        if (handleTabColor(theme, value) != null) {
            var currentHours = new Date().getHours()
            var currentMinutes = new Date().getMinutes()
            var inputTimeArr = time.split('-') // Array that contains start and end of a lesson
            var startTime = inputTimeArr[0].split(':')
            var endTime = inputTimeArr[1].split(':')

            // Check if lesson started
            if (
                currentHours >= startTime[0] &&
                currentMinutes >= startTime[1]
            ) {
                if (
                    currentHours >= endTime[0] &&
                    currentMinutes >= endTime[1]
                ) {
                    return null
                } else {
                    return 5
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }

    useEffect(() => {
        setIsLoaded(false)
        getDocs(collection(db, 'groups'))
            .then((res) => {
                var arr = []
                res.forEach((data) => {
                    arr.push({
                        id: data.id,
                        name: data.data().groupName,
                        schedule: data.data().schedule,
                    })
                })
                setGroupData(arr)
                setGroup(arr[0].id)

                if (
                    new Date().getDay() - 1 > -1 &&
                    new Date().getDay() - 1 < 5
                ) {
                    setTab(new Date().getDay() - 1)
                } else {
                    setTab(0)
                }
            })
            .then(() => setIsLoaded(true))
            .catch((err) => console.log(err))
    }, [])

    return (
        <ThemeProvider theme={myTheme}>
            {isLoaded ? (
                <Box>
                    <AppBar
                        position="static"
                        sx={{ backgroundColor: blue[300] }}
                    >
                        <Box className="my-container">
                            <Toolbar sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="h6" component="h1">
                                    Schedule App
                                </Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ minWidth: 100 }}
                                >
                                    <InputLabel id="test-label">
                                        Группа
                                    </InputLabel>
                                    <Select
                                        labelId="test-label"
                                        label="Группа"
                                        value={group}
                                        id="test-select"
                                        onChange={handleGroup}
                                    >
                                        {groupData.map((data) => (
                                            <MenuItem
                                                key={data.id}
                                                value={data.id}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Toolbar>
                        </Box>
                    </AppBar>

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
                                        color: (theme) =>
                                            handleTabColor(theme, 0),
                                    }}
                                />
                                <Tab
                                    label="Вторник"
                                    sx={{
                                        color: (theme) =>
                                            handleTabColor(theme, 1),
                                    }}
                                />
                                <Tab
                                    label="Среда"
                                    sx={{
                                        color: (theme) =>
                                            handleTabColor(theme, 2),
                                    }}
                                />
                                <Tab
                                    label="Четверг"
                                    sx={{
                                        color: (theme) =>
                                            handleTabColor(theme, 3),
                                    }}
                                />
                                <Tab
                                    label="Пятница"
                                    sx={{
                                        color: (theme) =>
                                            handleTabColor(theme, 4),
                                    }}
                                />
                            </Tabs>
                        </Box>
                    </Box>

                    <Box className="group-content-container">
                        {groupData.map((data) => (
                            <GroupContent
                                key={data.id}
                                value={group}
                                index={data.id}
                            >
                                {data.schedule.map((res) => (
                                    <TabPanel
                                        value={tab}
                                        index={data.schedule.indexOf(res)}
                                        key={data.schedule.indexOf(res)}
                                    >
                                        <List>
                                            <Box className="my-container">
                                                <Box className="list__inner">
                                                    {res.lessons.map(
                                                        (lesson) => (
                                                            <ListItem
                                                                key={res.lessons.indexOf(
                                                                    lesson
                                                                )}
                                                                divider
                                                                sx={{
                                                                    borderLeft:
                                                                        (
                                                                            theme
                                                                        ) =>
                                                                            handleLessonColor(
                                                                                theme,
                                                                                data.schedule.indexOf(
                                                                                    res
                                                                                ),
                                                                                lesson.time
                                                                            ),
                                                                    borderColor:
                                                                        'primary.main',
                                                                }}
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        lesson.lesson +
                                                                        ', ' +
                                                                        lesson.time
                                                                    }
                                                                    secondary={
                                                                        'Кабинет/Аудитория: ' +
                                                                        lesson.room +
                                                                        ', ' +
                                                                        'Преподаватель: ' +
                                                                        lesson.teacher
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )
                                                    )}
                                                </Box>
                                            </Box>
                                        </List>
                                    </TabPanel>
                                ))}
                            </GroupContent>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '25px',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </ThemeProvider>
    )
}
