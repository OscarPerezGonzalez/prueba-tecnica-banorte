import app from './app'

const PORT = 8090;

import produce from "./kafka/producer";
import consume from "./kafka/consumer";

// call the `produce` function and log an error if it occurs
produce().catch((err: any) => {
	console.error("error in producer: ", err)
})

// start the consumer, and log any errors
consume().catch((err: any) => {
	console.error("error in consumer: ", err)
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});


