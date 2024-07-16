import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import React, {useEffect, useState} from 'react';
import {addTodo, changeTodo, deleteTodo, fetchTodos} from './todoSlice';
import Spinner from '../../components/Spinner/Spinner';
import {TodoMutation} from '../../types';
import SpinnerBtn from '../../components/Spinner/SpinnerBtn';

const Todo = () => {
  const todoValue = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();
  const done = todoValue.todos.filter((todo) => todo.status);
  const undone = todoValue.todos.filter((todo) => !todo.status);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handelChangeTodo = async (todo: TodoMutation) => {
    await dispatch(changeTodo(todo));
    await dispatch(fetchTodos());
  };

  const handleDeleteTodo = async (todo: TodoMutation) => {
    if(window.confirm('Are you sure want to delete this task!')) {
      await dispatch(deleteTodo(todo));
      await dispatch(fetchTodos());
    }
  };

  const handleAddTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(addTodo(newTodo));
    setNewTodo('');
    await dispatch(fetchTodos());
  };

  const changeNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setNewTodo(value);
  };

  return (
    <div className='mt-5 d-flex justify-content-between'>
      <div className='col-6'>
        {todoValue.isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
            <Spinner />
          </div>
        ) : (
          <div>
            <div className='border rounded p-3 mb-5'>
              <h3>{undone.length > 0 ? 'Undone' : 'No unfulfilled tasks'}</h3>
              {undone.map((todo) => (
                <div key={todo.id} className="border border-black rounded d-flex align-items-center p-3 justify-content-between mb-3">
                  <p className='m-0' >Task: '{todo.title}'</p>
                  <div className='d-flex align-items-center'>
                    <input type="checkbox" className='me-5 border-black checkbox' checked={todo.status} onChange={() => handelChangeTodo(todo)}/>
                    <button className='btn btn-danger' onClick={() => handleDeleteTodo(todo)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className='border rounded p-3'>
              <h3>{done.length > 0 ? 'Done' : 'No completed tasks'}</h3>
              {done.map((todo) => (
                <div key={todo.id} className="border border-black rounded d-flex align-items-center p-3 justify-content-between mb-3">
                  <p className='m-0'>Task: '{todo.title}'</p>
                  <div className='d-flex align-items-center'>
                    <input type="checkbox" checked={todo.status} className='me-5 border-4 border-black checkbox' onChange={() => handelChangeTodo(todo)}/>
                    <button className='btn btn-danger' onClick={() => handleDeleteTodo(todo)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='col-5'>
        <form className='border border-black rounded p-3' onSubmit={handleAddTodo}>
          <label htmlFor='title' className='mb-2 fs-4 fw-bold'>New todo</label>
          <input type="text" id='title' name='title' className='form-control' required placeholder='New task' onChange={changeNewTodo} value={newTodo}/>
          <div className='text-end'>
            <button type="submit" className="btn btn-primary mt-3" disabled={todoValue.btnLoading}>
              {todoValue.btnLoading && <SpinnerBtn />} Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Todo;