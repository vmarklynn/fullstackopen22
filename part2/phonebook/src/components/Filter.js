const Filter = ({ handleChange }) => {
  return (
    <div>
      filter by: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
