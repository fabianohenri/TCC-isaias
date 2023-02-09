import { configureStore } from '@reduxjs/toolkit'
import ReduxStore from './reducer/main.reducer'

export default configureStore(
	{
		reducer: {
			store: ReduxStore
		}
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
