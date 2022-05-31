import React, { useState, useEffect } from 'react'

import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Box,
} from '@mui/material'

import '../style.css'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

import Header from '../sub-components/Header'
import WeekdayTabs from '../sub-components/WeekdayTabs'
import TabPanel from '../sub-components/TabPanel'
import GroupContent from '../sub-components/GroupContent'

import { handleLessonColor } from '../helpers'

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

export default function Content() {
    const [group, setGroup] = useState('')
    const [tab, setTab] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [groupData, setGroupData] = useState([])

    const handleGroup = (e) => {
        setGroup(e.target.value)
    }

    const handleTab = (e, tab) => {
        setTab(tab)
    }

    useEffect(() => {
        getDocs(collection(db, 'groups'))
            .then((res) => {
                let arr = []
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
                    <Header
                        group={group}
                        handleGroup={handleGroup}
                        groupData={groupData}
                    />

                    <WeekdayTabs tab={tab} handleTab={handleTab} />
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </ThemeProvider>
    )
}
