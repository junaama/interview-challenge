import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches($epochOrder: String, $epochDirection: String) {
    epoches @client(orderBy: $epochOrder, epochDirection: $order) {
      id
      startBlock
      endBlock
      queryFeesCollected
      totalRewards
    }
  }
`
