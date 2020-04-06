import * as React from 'react';

interface IProps{
    name?: string;
}

const Header: React.FC<IProps> = (props: IProps) => (
    <h1>Hello, {props.name}! Welcome to React and Typescript.</h1>
);

Header.defaultProps = {
    name: 'Stijn',
};

export default Header;