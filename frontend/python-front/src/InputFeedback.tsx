

function InputFeedback({status}) {
  return(
    <h1 style={{color: status ? "green": "red"}}>
      {status ? "Twoje dane są poprawne" : "Błędny zapis, dalsze warunki nie są sprawdzane."}
    </h1>
  );
}

export default InputFeedback
