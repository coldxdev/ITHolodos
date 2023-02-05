import classNames from 'classnames';
import React from 'react';
import './Button.scss';

enum ButtonTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    theme?: ButtonTheme.PRIMARY | ButtonTheme.SECONDARY;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = ButtonTheme.PRIMARY,
    className,
    href,
    ...props
}) => {
    const buttonClassNames = classNames(
        'Button',
        {
            primary: type === ButtonTheme.PRIMARY,
            secondary: type === ButtonTheme.SECONDARY,
        },
        className
    );
    return (
        // href ? (
        //     <a className={buttonClassNames} href={href} {...props}>
        //         {children}
        //     </a>
        // ) : (
        <button className={buttonClassNames} {...props}>
            {children}
        </button>
    );
};

export default Button;
