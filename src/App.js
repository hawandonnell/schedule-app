import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress'

const Content = React.lazy(() => import('./components/Content'))


export default function App() {
	
	return (
		<Suspense fallback={<CircularProgress />}>
			<Content/>
		</Suspense>
	)
}