import { TableLoading } from "../components/loading/loading-component"

 export function setStatusLoadingTable({requesting, successful}){
    if(requesting){
      return <TableLoading/>
    }
    else if(successful){
      return "No data"
    }
    else {
      return "Error"
    }
  }
