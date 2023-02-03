import classNames from 'classnames';
import React from 'react';
import './Button.scss';

enum ButtonTypes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: ButtonTypes.PRIMARY | ButtonTypes.SECONDARY;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = ButtonTypes.PRIMARY,
    className,
    href,
    ...props
}) => {
  
    const buttonClassNames = classNames(
        'Button',
        {
            primary: type === ButtonTypes.PRIMARY,
            secondary: type === ButtonTypes.SECONDARY,
        },
        className
    );

    return href ? (
        <a className={buttonClassNames} href={href} {...props}>
            {children}
        </a>
    ) : (
        <button className={buttonClassNames} {...props}>
            {children}
        </button>
    );
};

export default Button;
