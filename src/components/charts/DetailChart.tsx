import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import { ApexOptions } from "apexcharts"
import dayjs from 'dayjs'

interface DetailChart {
  chartData: Array<number>
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const DetailChart = ({ chartData }: DetailChart) => {

  const series = [{
    name: 'Coin Values',
    data: chartData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      redrawOnWindowResize: true
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return dayjs(val).format('MMM DD HH:mm')
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <Wrapper>
      <Chart options={options} series={series} type="candlestick" />
    </Wrapper>
  )
}

export default DetailChart