const PersonForm = ({ onSubmit, nameValue, nameOnChange, phoneValue, phoneOnChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>add a new</div>
      <div>
        name: <input value={nameValue} onChange={nameOnChange} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={phoneOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
