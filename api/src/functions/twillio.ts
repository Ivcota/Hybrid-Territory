import { Twilio } from 'twilio'

const client = new Twilio(process.env.TWILIO_ACCOUNT, process.env.TWILIO_TOKEN)

interface Props {
  to: string
  message: string
}

export const sendMessage = ({ to, message }: Props) => {
  console.log('Send Message')

  client.messages
    .create({
      to: to,
      body: message,
      from: process.env.TWILIO_NUMBER,
    })
    .then((res) => {
      console.log(res)
    })
}
