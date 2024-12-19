import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onTaskAdd }) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onTaskAdd(taskForm);
    setTaskForm({
      title: '',
      description: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskForm({
      ...taskForm,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          id="text"
          name="title"
          value={taskForm.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          id="text"
          name="description"
          value={taskForm.description}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  onTaskAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;