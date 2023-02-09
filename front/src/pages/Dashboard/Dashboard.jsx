import React, { useState, useEffect } from 'react'
import { Button, Card } from '@mui/material'
import { useDispatch } from 'react-redux'
import api from 'service/service'
import { logoutAction } from 'storage/redux/actions/user.actions'

const Dashboard = () => {
	const [metrics, setMetrics] = useState({})
	const dispatch = useDispatch()

	const getTotalTicketsMonth = async () => {
		const { data } = await api.get('/task/get-total-per-month').catch((e) => console.error(e.response.data))
		return data
	}

	const getTotalTicketsPerson = async (taskStatus) => {
		let baseUrl = '/task/get-total-per-person'
		if (taskStatus) {
			baseUrl += `?taskStatus=${taskStatus}`
		}

		const { data } = await api.get(baseUrl).catch((e) => console.error(e.response.data))
		return data
	}

	const buildMetrics = async () => {
		const totalTickets = await getTotalTicketsMonth()
		const totalTicketsPerPerson = await getTotalTicketsPerson()
		setMetrics({ totalTickets, totalTicketsPerPerson })
	}

	const deslogar = async () => {
		dispatch(logoutAction())
	}

	// useEffect(() => {
	// 	buildMetrics()
	// }, [])

	useEffect(() => {
		// console.log(metrics)
	}, [metrics])

	return (
		<div style={{ justifyContent: 'center', display: 'flex', height: '100vh', alignItems: 'center' }}>
			<button onClick={deslogar}>deslogar</button>
			<div style={{ display: 'block' }}>
				<div>
					<Button onClick={getTotalTicketsMonth}>Buscar total de tickets abertos por mês</Button>
					<Card></Card>
				</div>
				<div>
					Buscar total de tickets por pessoa
					<Button onClick={() => getTotalTicketsPerson('OPENED')}>Abertos</Button>
					<Button onClick={() => getTotalTicketsPerson('CLOSED')}>Fechados</Button>
					<Button onClick={() => getTotalTicketsPerson()}>Todos</Button>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
