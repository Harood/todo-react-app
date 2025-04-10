import React, { useEffect, useState } from 'react';

function Todolist() {
  const [task, settask] = useState('');
  const [tasks, settasks] = useState([]);
  const [search, setSearch] = useState('');

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  // Load tasks from localStorage on app start
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      settasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = { text: task, completed: false }; // Create a task object
      settasks([...tasks, newTask]);
      settask('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    settasks(newTasks);
  };

  const clearAll = () => {
    settasks([]);
    localStorage.removeItem('tasks');
  };

  const editTask = (oldTask) => {
    const newTaskText = prompt('Edit task:', oldTask.text);
    if (newTaskText && newTaskText.trim() !== '') {
      const updatedTasks = tasks.map((task) =>
        task === oldTask ? { ...task, text: newTaskText } : task
      );
      settasks(updatedTasks);
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    settasks(updatedTasks);
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
        <div className="App flex flex-col border-2 border-zinc-400 items-center justify-center bg-gray-700 rounded-lg shadow-lg p-20 pt-10 ">
      <h1 className="text-4xl font-bold text-gray-300 p-4 ">To-Do-List APP</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => settask(e.target.value)}
        placeholder="Enter a task"
        className="border-2 border-gray-800 rounded p-2 mt-4 bg-gray-200 font-semibold text-slate-700 px-8"
      />
      <div className="flex items-center justify-center mt-2 gap-2 text-lg">
        <button
          onClick={addTask}
          className="bg-slate-900 text-white rounded p-2 ml-2 mt-4 font-semibold px-4 cursor-pointer hover:bg-slate-800"
        >
          Add Task
        </button>

        <button
          onClick={clearAll}
          className="bg-yellow-600 text-white rounded p-2 px-4 ml-2 mt-4 font-semibold cursor-pointer hover:bg-yellow-700"
        >
          Clear All
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks"
        className="border-2 border-gray-800 rounded p-2 mt-4 bg-gray-200 font-semibold text-slate-700 px-8"
      />

      <div className="mt-6 w-full h-64 overflow-y-auto rounded bg-slate-800 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
         <ul className="space-y-2 p-2">
            {filteredTasks.length === 0 && (
      <li className="text-gray-400 text-center font-semibold">No tasks found</li>
    )}
    {filteredTasks.map((task, index) => (
      <li
        key={index}
        className={`flex justify-between items-start p-2 rounded hover:bg-gray-500 ${
          task.completed ? 'line-through text-gray-400' : 'text-gray-300'
        }`}
      >
        <div className="w-2/3 break-words">{task.text}</div>
        <div className="flex flex-wrap gap-2 flex-shrink-0 ml-4">
          <button
            onClick={() => toggleComplete(index)}
            className="bg-blue-500 text-white rounded p-1 px-3 font-semibold cursor-pointer hover:bg-blue-700"
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => deleteTask(index)}
            className="bg-red-600 text-white rounded p-1 px-3 font-semibold cursor-pointer hover:bg-red-800"
          >
            Delete
          </button>
          <button
            onClick={() => editTask(task)}
            className="bg-green-500 text-white rounded p-1 px-3 font-semibold cursor-pointer hover:bg-green-700"
          >
            Edit
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

    </div>
    </div>
  );
}

export default Todolist;
