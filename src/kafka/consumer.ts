
import { EachMessagePayload } from 'kafkajs'
import kafka from './index'
var fs = require('fs');
// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer = kafka.consumer({ groupId: 'stream-out' })

const consume = async () => {
    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect()
    await consumer.subscribe({ topic: 'stream-out' })
    await consumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
            const { topic, partition, message } = messagePayload
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
            fs.writeFile('tree.json', message.value, 'utf8', function(err: any){
                if(err) return console.log(err);
                console.log('Note added');
            });
        }
    })
}

export default consume