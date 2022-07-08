import React from 'react'
import styled from 'styled-components'
import Chart from 'react-apexcharts'
import { ApexOptions } from "apexcharts"

interface SimpleChart {
  chartData: Array<number>
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const SimpleChart = ({ chartData }: SimpleChart) => {
  const chartColor = chartData[0] < chartData[chartData.length - 1] ? '#57bd0f' : '#ed5565'

  const series = [{
    data: chartData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    colors: [chartColor],
    plotOptions: {
      area: {
        fillTo: 'end'
      },
      bar: {
        columnWidth: '50%'
      }
    },
    annotations: {

    }
  }

  return (
    <Wrapper>
      <Chart options={options} series={series} />
    </Wrapper>
  )
}

export default SimpleChart