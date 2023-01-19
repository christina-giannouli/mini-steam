import { Platforms } from '../../types';

const PlatformIcons = ({ mac, linux, windows }: Platforms): JSX.Element => {
  return (
    <div className="row align-items-center">
      {mac && (
        <div className="col-1">
          <span>
            <i className="bi bi-apple"></i>
          </span>
        </div>
      )}
      {linux && (
        <div className="col-1">
          <span>
            <i className="bi bi-ubuntu"></i>
          </span>
        </div>
      )}
      {windows && (
        <div className="col-1">
          <span>
            <i className="bi bi-windows"></i>
          </span>
        </div>
      )}
    </div>
  );
};

export default PlatformIcons;
