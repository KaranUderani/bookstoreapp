import React from 'react'
import list from "../../public/list.json"
function Freebook() {
    const filterdata=list.filter((data)=>data.category==="Free");
    console.log(filterdata)
  return (<>
  <div>
    
  </div>
  </>
  )
}

export default Freebook