import { Button } from '@mui/material'
import React from 'react'
import api from 'service/service'

const Dashboard = () => {
	// const [userAuth, setUserAuth] = useState(null)
	// const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	api.get('/get-user-auth')
	// 		.then((res) => {
	// 			setLoading(false)
	// 			setUserAuth(res.data)
	// 		})
	// 		.catch((e) => console.error(e.response.data))
	// }, [])

	const getTotalTicketsMonth = () => {
		api.get('/task/get-total-per-month')
			.then((res) => {
				console.log(res.data)
			})
			.catch((e) => console.error(e.response.data))
	}

	const getTotalTicketsPerson = (taskStatus) => {
		let baseUrl = '/task/get-total-per-person'
		if (taskStatus) {
			baseUrl += `?taskStatus=${taskStatus}`
		}
		api.get(baseUrl)
			.then((res) => {
				console.log(res.data)
			})
			.catch((e) => console.error(e.response.data))
	}

	return (
		<div style={{ justifyContent: 'center', display: 'flex', height: '100vh', alignItems: 'center' }}>
			<div style={{ display: 'block' }}>
				<div>
					<Button onClick={getTotalTicketsMonth}>Buscar total de tickets abertos por mês</Button>
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
