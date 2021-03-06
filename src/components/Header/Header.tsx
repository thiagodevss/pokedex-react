import React from 'react';
import pokeball from '../../assets/pokeball.svg';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import Menu from '../../assets/menu.svg';
import { UserContext } from '../../useContext';

const Header = () => {
  const { data } = React.useContext(UserContext);
  const isMobile = useMedia('(max-width:800px)');
  const [mobileMenu, setMobileMenu] = React.useState<boolean>(false);
  const { pathname } = useLocation();

  // React.useEffect(() => {
  //   if (!isMobile) {
  //     setMobileMenu(false);
  //   }
  // }, [isMobile]);

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  if (data) {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src={pokeball} alt="pokeball" />
        </Link>
        <Link to="/conta" className={styles.link}>
          {data.name}
        </Link>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={pokeball} alt="pokeball" />
      </Link>
      <div>
        {isMobile && (
          <button
            aria-label="Menu-button"
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`${styles.buttonMenu} ${
              mobileMenu ? styles.active : ''
            }`}
          >
            <img src={Menu} alt="menu hamburguer" />
          </button>
        )}

        <nav
          className={`${isMobile ? styles.menuMobile : styles.menu} ${
            mobileMenu ? styles.active : ''
          }`}
        >
          <Link to="/login" className={styles.buttonSecundary}>
            LOGIN
          </Link>

          <Link to="/registrar" className={styles.buttonPrimary}>
            REGISTRAR
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
