import React from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.svg';
import { BasketIcon } from '../../assets/images/icons';

const Header: React.FC = () => {
    return (
        <div className='Header'>
            <div className='Header__wrapper container'>
                <a className='Header__logo' href='#'>
                    <Logo />
                </a>

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
