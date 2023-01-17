import './Header.scss';
import logo from '../../logo_steam.svg';

const Header = (): JSX.Element => {
  return (
    <header className={'p-2 p-sm-3 p-md-4'}>
      <img src={logo} alt={'Steam'} className={'img-fluid mx-auto d-block'} />
    </header>
  );
};

export default Header;
