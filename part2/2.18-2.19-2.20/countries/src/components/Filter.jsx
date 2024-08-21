const Filter = ({ searchTerm, setSearchTerm }) => {
	const handleSearchChange = (event) => {
	  setSearchTerm(event.target.value);
	};
  
	return (
	  <>
		<div>Find Countries</div>
		<input type="text" onChange={handleSearchChange} value={searchTerm} />
	  </>
	);
  };
  
  export default Filter;
  