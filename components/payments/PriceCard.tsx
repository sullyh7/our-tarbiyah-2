import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'

interface PriceCardProps {
    children: React.ReactNode,
}

const PriceCard = ({children}: PriceCardProps) => {
  return (
    <Card>
  <CardHeader>
    <CardTitle className='text-primary'>{children}</CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
</Card>
  )
}

export default PriceCard