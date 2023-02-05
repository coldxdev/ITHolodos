import React from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../router';

const Header: React.FC = () => {
    return (
        <div className='Header'>
            <div className='Header__wrapper container'>
                <Link className='Header__logo' to={AppRoutes.HOME}>
                    <Logo />
                </Link>

                {/* <div className='Header__actions'>
                    <button className='Header__btn'>
                        <BasketIcon />
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Header;
