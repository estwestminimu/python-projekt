import { useEffect, useState } from "react";


function App() {
  //hooki musza byc wywolywane na najwyzszym poziomie komponentu
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)
  const serverUrl = 'http://127.0.0.1:8000/items/1';


  async function fetchData()
  {
    try{
      const response = await fetch(serverUrl);
      const json = await response.json();
      setData(json)


    }catch(error)
  {
    console.error("Błąd danych", error)
  }
  }

  function handleSubmit()
  {
    setCount(prev => prev+1);
    fetchData();
  }



  return (
    <>
     <button onClick={handleSubmit}>
      Przeslij dane {count}
      </button>
      <p>{JSON.stringify(data,null,2)}</p>
    </>
  )
}

export default App
