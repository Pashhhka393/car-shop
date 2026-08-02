import "./sortitem.scss";

const SortItem = ({ img, title, setSelectedBrand }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedBrand(title);
  };

  return (
    <div className="sort-item" onClick={handleClick}>
      <img src={img} alt="lambo-image" />
      <p>{title}</p>
    </div>
  );
};

export default SortItem;
