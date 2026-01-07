

function InputFeedback({status}) {
  return(
    <h1 style={{color: status ? "green": "red"}}>
      {status ? "" : "Błędny zapis, dalsze warunki nie są sprawdzane."}
    </h1>
  );
}

export default InputFeedback
