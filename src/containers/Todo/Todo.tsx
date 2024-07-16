import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {changeTodo, fetchTodos} from './todoSlice';
import Spinner from '../Spinner/Spinner';
import {TodoMutation} from '../../types';

const Todo = () => {
  const todoValue = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();
  const done = todoValue.todos.filter((todo) => todo.status);
  const undone = todoValue.todos.filter((todo) => !todo.status);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handelChangeTodo = async (todo: TodoMutation) => {
    await dispatch(changeTodo(todo));
    await dispatch(fetchTodos());
  };

  return (
    <div className='mt-5'>
      {todoValue.isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
          <Spinner />
        </div>
      ) : (
        <div className='col-6'>
          <div className='border rounded p-3 mb-5'>
            <h3>{undone.length > 0 ? 'Undone' : 'No tasks'}</h3>
            {undone.map((todo) => (
              <div key={todo.id} className="border rounded d-flex align-items-center p-3 justify-content-between mb-3">
                <p className='m-0' >Task: '{todo.title}'</p>
                <div>
                  <input type="checkbox" className='me-5 border-black' checked={todo.status} onChange={() => handelChangeTodo(todo)}/>
                  <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className='border rounded p-3'>
            <h3>{done.length > 0 ? 'Done' : 'No tasks'}</h3>
            {done.map((todo) => (
              <div key={todo.id} className="border rounded d-flex align-items-center p-3 justify-content-between mb-3">
                <p className='m-0'>Task: '{todo.title}'</p>
                <div>
                  <input type="checkbox" checked={todo.status} className='me-5 border-black' onChange={() => handelChangeTodo(todo)}/>
                  <button className='btn btn-danger'>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;