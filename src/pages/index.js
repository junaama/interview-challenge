import { Box, Grid, Button, Input, Label, Switch, Link } from 'theme-ui'
import { useState, useEffect } from 'react'
import { EPOCHES_QUERY } from '../apollo/queries'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client'
import { epochDirection } from '../apollo/cache'

const Index = () => {
  const { loading, error, data } = useQuery(EPOCHES_QUERY, {
    variables: {
      $epochOrder: 'startBlock',
      $epochDirection: epochDirection,
    },
  })

  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`

  const handleDirectionChange = () => {
    if (epochDirection() === 'asc') {
      epochDirection('desc')
    } else {
      epochDirection('asc')
    }
    console.log(epochDirection())
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            pt: '48px',
            m: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1>Welcome to the Edge & Node coding challenge!</h1>
        </Box>
      </Box>
      <Box sx={{ p: '32px', m: '0 auto' }}>
        <Box>
          <h2>Epoches</h2>
          <Label>Search</Label>
          <Input placeholder="Search"></Input>
        </Box>
      </Box>
      <Box sx={{ p: '32px' }}>
        <Grid gap={2} columns="repeat(6, 1fr)" sx={{ height: 0 }}>
          <Box bg="primary">Epoch</Box>
          <Box bg="muted">
            Start Block
            <Button onClick={handleDirectionChange} sx={{ color: 'black' }}>
              Arrow
            </Button>
          </Box>
          <Box bg="primary">End Block</Box>
          <Box bg="muted">Query Fees</Box>
          <Box bg="primary">Total Rewards</Box>
        </Grid>
      </Box>
      <Grid columns="" gap={4}>
        <Grid rows="repeat(auto-fill, 1fr)" gap={3} sx={{ bg: 'muted' }}>
          {data.epoches.map((epoch, index) => {
            return (
              <Grid gap={3} columns="repeat(6, 1fr)" sx={{ height: 0, p: '32px' }}>
                <Box>{epoch.id}</Box>
                <Box>{epoch.startBlock}</Box>
                <Box>{epoch.endBlock}</Box>
                <Box>{Math.round(epoch.queryFeesCollected / Math.pow(10, 18))} GRT</Box>
                <Box>{Math.round(epoch.totalRewards / Math.pow(10, 18))} GRT</Box>
              </Grid>
            )
          })}
        </Grid>
      </Grid>

      <Box
        sx={{
          pt: '48px',
          m: '0 auto',
          textAlign: 'center',
        }}
      >
        <Button sx={{ textAlign: 'center', color: 'black' }}>Load More</Button>
      </Box>
    </>
  )
}

export default withApollo(Index, { ssr: false })
