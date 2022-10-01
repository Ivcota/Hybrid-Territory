import { MutationResolvers } from 'types/graphql'

import { sendMessage as sendTwilio } from '../../functions/twillio'

export const sendMessage: MutationResolvers['sendMessage'] = async ({
  phone,
  message,
}) => {
  try {
    await sendTwilio({
      message,
      to: phone,
    })

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
    }
  }
}
