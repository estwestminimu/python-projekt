import { useState } from "react";


function App() {
  //hooki musza byc wywolywane na najwyzszym poziomie komponentu
  const [count, setCount] = useState(0)

  function handleSubmit()
  {
    setCount(prev => prev+1)
  }



  return (
    <>
     <button onClick={handleSubmit}>
      Przeslij dane {count}
      </button>
    </>
  )
}

export default App
