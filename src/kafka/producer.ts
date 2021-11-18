
import kafka from './index'

const producer = kafka.producer()
const treeProducer: JSON = require('../../treeProducer')
// we define an async function that writes a new message each second
const produce = async () => {
	await producer.connect()
	let i = 0

    
	// after the produce has connected, we start an interval timer
	setInterval(async () => {
		try {
            console.log(JSON.stringify(treeProducer))
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic: 'stream-out',
				messages: [
					{
						key: String(i),
						value: JSON.stringify(treeProducer),
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 10000)
}

export default produce