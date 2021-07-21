import { Environment } from '$houdini'

export default new Environment(async function ({ text, variables = {} }, session) {
	// console.log('session: ', session);
	// send the request to the api
	const result = await this.fetch('http://localhost:4300/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Authentication': session
		},
		body: JSON.stringify({
			query: text,
			variables,
		}),
	})

	// parse the result as json
	return await result.json()
})
