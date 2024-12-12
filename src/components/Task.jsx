// import { useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onComplete }) => {
  // const [complete, setComplete] = useState(isComplete);

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const taskClick = () => {
    onComplete(id);
  };
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={taskClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Task;
