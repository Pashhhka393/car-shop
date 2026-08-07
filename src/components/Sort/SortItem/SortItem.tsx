import "./sortitem.scss";

interface SortItemProps {
  img: string;
  title: string;
  setSelectedBrand: (brand: string) => void;
}

const SortItem = ({ img, title, setSelectedBrand }: SortItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
