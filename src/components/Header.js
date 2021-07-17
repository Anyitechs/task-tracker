import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import Button from './Button';

const Header = ({ title, onShowAdd, onButton }) => {
    const location = useLocation()

    const onClick = () => {
        onShowAdd()
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button onClick={onClick} text={onButton ? 'Close' : 'Add'}
             color={onButton ? 'red' : 'green'} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
