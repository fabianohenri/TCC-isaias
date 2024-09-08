import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // ou outro storage se necessário
import ReduxStore from './reducer/main.reducer'

// Transformação para alterar o estado quando o Redux Persist carregar
const loadingTransform = createTransform(
	// Transformação ao salvar (não faz nada aqui)
	(inboundState, key) => inboundState,
	// Transformação ao carregar (define isLoading para false)
	(outboundState, key) => {
		return false
	},
	// Configuração opcional
	{ whitelist: ['isLoading'] } // substitua 'yourReducerKey' pelo nome do seu reducer
)

// Configuração do persist
const persistConfig = {
	key: 'root',
	storage,
	transforms: [loadingTransform] // aplica a transformação
}

const persistedReducer = persistReducer(persistConfig, ReduxStore)

const store = configureStore(
	{
		reducer: {
			store: persistedReducer
		}
	},
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const persistor = persistStore(store)

export { store, persistor }
