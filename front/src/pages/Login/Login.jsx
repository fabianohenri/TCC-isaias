import React from 'react'
import api from 'service/service'
import { Button } from '@mui/material'

const Login = () => {
	const buscaUrl = () => {
		api.get()
	}
	return (
		<>
			oloco
			<Button>Faz Login</Button>
		</>
	)
}

export default Login
