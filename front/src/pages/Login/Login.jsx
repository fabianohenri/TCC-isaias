import React, { useEffect } from 'react'
import api from 'service/service'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@mui/material'

const Login = () => {
	let [searchParams] = useSearchParams()

	const getAuth = () => {
		api.get('/get-url-auth')
			.then((res) => {
				window.location.href = res.data
			})
			.catch((e) => console.error(e.response.data))
	}

	useEffect(() => {
		if (searchParams.get('code') && searchParams.get('scope')) {
			api.get(`/get-url-final-auth?authCode=${searchParams.get('code')}&scope=${searchParams.get('scope')}`)
				.then((res) => {
					console.log('sucesso')
				})
				.catch((e) => console.error(e.response.data))
		}
	}, [searchParams])

	return (
		<>
			oloco
			<Button onClick={getAuth}>Faz Login</Button>
		</>
	)
}

export default Login
