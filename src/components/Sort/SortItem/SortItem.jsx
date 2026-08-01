import "./sortitem.scss";

const SortItem = ({ img, title, chooseFilterBrand }) => {
  const handleClick = (e) => {
    e.preventDefault();
    chooseFilterBrand(title);
  };

  return (
    <div className="sort-item" onClick={handleClick}>
      <img src={img} alt="lambo-image" />
      <p>{title}</p>
    </div>
  );
};

export default SortItem;
