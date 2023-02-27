import '../App.css';
import { useEffect, useState } from 'react';
import { createTodo } from '../statemanagement/actions/todoActions'
import { fetchTodo } from '../statemanagement/actions/todoActions'
import { connect } from 'react-redux';
function Todo({ createTodo, todos, newTodo }) {
  console.log('stateManagement todos', todos);
  const [todo, setTodo] = useState()
  const [tasks, setTasks] = useState([
    { name: 'Learn Angular', category: 'wip', bgcolor: 'yellow' },
    { name: 'Learn React', category: 'wip', bgcolor: 'lightblue' },
    { name: 'Learn Vue', category: 'complete', bgcolor: 'green' },
    { name: 'washes cloth', category: 'todo', bgcolor: 'red' },
  ])

  //we create an array that we can categories this task to different categorey according to the data
  var emptyTasks = {
    todo: [],
    wip: [],
    complete: []
  }
  console.log('emptyTasks', emptyTasks);

  const onSubmit = (e) => {
    e.preventDefault()
    const task = {
      name: todo,
      category: 'todo',
      bgcolor: 'red'
    }
    createTodo(task)
    // fetchTodo()
    setTasks((prevState) => [...prevState, task])
    setTodo('')
  }
  const onDragOver = (e) => {
    e.preventDefault()
  }
  const onDragStart = (e, id) => {
    console.log('dragStart', id);
    e.dataTransfer.setData('id', id)
  }
  const onChange = (e) => {
    console.log('e', e.target.value);
    setTodo(e.target.value)
  }
  const onDrop = (e, cat) => {
    let id = e.dataTransfer.getData('id');
    console.log('onDrop id', id);
    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    })
    setTasks((prevState) => [...prevState, newTasks])
  }


  tasks?.forEach((t) => {
    emptyTasks[t.category]?.push(
      <div
        className={t.category === 'wip' ? 'draggable work-inprogress' : t.category === 'complete' ? 'draggable task-complete' : 'draggable yet-todo'}
        //to make any element draggable we have to put the draggable attribute 
        draggable
        //as i am dragging that we need to something from that element to confirm that which element was dragg
        onDragStart={(e) => onDragStart(e, t.name)}
        key={t.name}
        style={{ backgroundColor: t.bgcolor, color: 'white' }}
      >
        {t.name}
      </div>
    )
  })
  useEffect(() => {
    // console.log('first');
    fetchTodo()
  }, [])

  return (
    <div className='container'>

      <div className='add-form'>
        {/* <h2 className='header'>Task Manager</h2> */}
        <form onSubmit={onSubmit}>
          <div className='parent-form-div'>
            <div className='input-field'>
              <input
                type="text"
                name="todo"
                onChange={onChange}
                className='add-input'
                value={todo}
                placeholder='Write your task..'
              />
            </div>
            <div className='add-btn'>
              <button type="submit" className='btn-add'>Add</button>
            </div>
          </div>
        </form>
      </div>
      <div className='container-drag'>

        <div className='drag-context'>
          <div
            className='todo'
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'todo')}
          >
            <div className='task-header to-do'>TO DO</div>
            {emptyTasks.todo}
          </div>
          <div
            className='wip'
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'wip')}
          >
            <div className='task-header in-progress'>In Progress</div>
            {emptyTasks.wip}
          </div>
          {/* drop over from another area we need to add dragOver event */}
          <div
            className='droppable'
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'complete')}
          >
            <div className='task-header done'>Done</div>
            {emptyTasks.complete}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  todos: state.todos.todos,
  newTodo: state.todos.todo
})
export default connect(mapStateToProps, { createTodo, fetchTodo })(Todo);
