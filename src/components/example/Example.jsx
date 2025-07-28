import { increment, decrement } from '../../redux/counterSlice.js'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

function Example() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='example-component bg-blue-100 p-4 rounded-lg shadow-md max-w-md mx-auto flex flex-col gap-4 my-4'>
      <h2>Example Component</h2>
      <p>Current Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Example;