import React from 'react'
import ThongTinDaoTaoTable from './ThongTinDaoTaoTable'
import ThongTinDaoTaoButton from './ThongTinDaoTaoButton'
import FilterThongTinDaoTao from './FilterThongTinDaoTao'

const ThongTinDaoTao=()=> {
  return (
    <div>
        <FilterThongTinDaoTao/>
        <ThongTinDaoTaoTable/>
        <ThongTinDaoTaoButton/>
    </div>
  )
}

export default ThongTinDaoTao