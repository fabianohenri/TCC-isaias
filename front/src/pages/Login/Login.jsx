import React, { useEffect, useState } from 'react'
import api from 'service/service'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { loginAction } from 'storage/redux/actions/user.actions'

const Login = ({ loginActionDispatch }) => {
	let [searchParams] = useSearchParams()
	const [loading, setLoading] = useState(false)
	const [domainBitrix, setdomainBitrix] = useState('')

	const getAuth = () => {
		setLoading(true)
		api.get(`/login/get-url-auth/${domainBitrix}`)
			.then((res) => {
				window.location.href = res.data
			})
			.catch((e) => console.error(e.response.data))
	}

	useEffect(() => {
		if (searchParams.get('code') && searchParams.get('scope')) {
			setLoading(true)
			api.get(`/login?authCode=${searchParams.get('code')}&scope=${searchParams.get('scope')}`)
				.then((res) => {
					setLoading(false)
					loginActionDispatch(res.data)
				})
				.catch((e) => console.error(e.response.data))
		}
	}, [searchParams])

	const handleOnChangeDomain = (e) => {
		setdomainBitrix(e.target.value)
	}

	return (
		<div style={{ justifyContent: 'center', display: 'flex', height: '100vh', alignItems: 'center' }}>
			<div style={{ display: 'block', border: '1px solid blue', height: '30em', width: '30em' }}>
				<h3 style={{ justifyContent: 'center', display: 'flex' }}>Faça o login utilizando o seu Bitrix24</h3>
				<div style={{ justifyContent: 'center', display: 'flex', marginTop: 'auto', marginBottom: 'auto' }}>
					<TextField label='Domínio Bitrix' variant='outlined' onChange={handleOnChangeDomain} />
					<Button onClick={getAuth} style={{ height: 'fit-content', marginTop: '10em' }} disabled={loading}>
						{loading ? 'Carregando' : 'Entrar'}
					</Button>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	loginActionDispatch: (user) => dispatch(loginAction(user))
})

export default connect(null, mapDispatchToProps)(Login)
