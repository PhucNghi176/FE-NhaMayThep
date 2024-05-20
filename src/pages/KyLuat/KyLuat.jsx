import React from 'react'
import KyLuatTable from './KyLuatTable'
import ButtonKyLuat from './ButtonKyLuat'
import FilterKyLuat from './FilterKyLuat'

const KyLuat=()=> {
  return (
    <div>
      <FilterKyLuat/>
      <KyLuatTable/>
      <ButtonKyLuat/>
      </div>
  )
}

export default KyLuat