import { useState, useEffect } from 'react';
import InputFeedback from './InputFeedback.tsx'
import UserSchemaInput from './UserSchemaInput.tsx'
import UserTypeInput from './UserTypeInput.tsx'
import FirstDirectives from './FirstDirectives.tsx'
import SecondDirectives from './SecondDirectives.tsx'






function App() {
  
  // do sprawdzenia czy dane wprowadzone przez użytkownika sa poprawne
  const [isInputCorrect, setIsInputCorrect] = useState(false) 




  return(
    <>
       <h1>1</h1>

      <UserSchemaInput/>
  



    
    </>
  );
}

export default App
