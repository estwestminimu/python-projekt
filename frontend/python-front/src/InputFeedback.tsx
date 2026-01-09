

type InputFeedbackProps = {
  status: 'success' | 'error' | 'warning';
};


function InputFeedback({status}: InputFeedbackProps) {
  return(
    <h1>
      {status === 'success' && 'Poprawnie!'}
     {status === 'error' && 'Błąd!'}
     {status === 'warning' && 'Uwaga!'}

    </h1>
  );
}

export default InputFeedback
