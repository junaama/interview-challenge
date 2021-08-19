import { makeVar } from '@apollo/client'
import { InMemoryCache } from '@apollo/react-hooks'

export const epochDirection = makeVar('asc')

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        epoches: {
          read() {
            return epochDirection()
          },
        },
      },
    },
  },
})
