import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onTaskAdd }) => {
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    // completed_at: '',
    // goal_id: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onTaskAdd(taskForm);
    setTaskForm({
      title: '',
      description: '',
    //   completed_at: '',
    //   goal_id: ''
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
          id="title"
          name="title"
          value={taskForm.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          id="description"
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