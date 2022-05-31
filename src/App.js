import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Content = React.lazy(() => import('./components/Content'))

export default function App() {
    return (
        <Suspense
            fallback={
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
            }
        >
            <Content />
        </Suspense>
    )
}
