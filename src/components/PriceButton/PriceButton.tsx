import './PriceButton.scss';

const PriceButton = ({
  showIcon,
  discount,
  initPrice,
  finalPrice,
}: {
  showIcon: boolean;
  discount: number | undefined;
  initPrice: string | undefined;
  finalPrice: string | undefined;
}): JSX.Element => {
  return (
    <div className="price-btn">
      {discount !== 0 && (
        <div className="discount-wrapper rounded-circle d-flex justify-content-center align-items-center">
          <span id="discount" className="rounded-circle">
            -{discount}%
          </span>
        </div>
      )}
      <button className="btn rounded-4 py-1 px-4 d-flex align-items-center justify-content-between">
        <p className="d-flex flex-column align-items-start m-0 flex-grow-1">
          {initPrice && (
            <span id="initial-price" className="text-decoration-line-through">
              {initPrice}
            </span>
          )}
          <span id="final-price">{finalPrice}</span>
        </p>
        {showIcon && (
          <span className="ms-3 ps-3 icon-wrapper ">
            <i className="bi bi-cart3"></i>
          </span>
        )}
      </button>
    </div>
  );
};
export default PriceButton;
