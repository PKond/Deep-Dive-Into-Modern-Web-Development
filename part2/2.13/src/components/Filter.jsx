const Filter = ({ search, setSearch }) => {
	const handleSearchChange = (event) => {
	  setSearch(event.target.value);
	};
  
	return (
	  <>
		<div>filter shown with</div>
		<input type="text" onChange={handleSearchChange} value={search} />
	  </>
	);
  };
  
  export default Filter;
  