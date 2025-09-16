import { useEffect, useState } from 'react'
import Router from './router';
// import { checkAutoLoginAction } from './store/AuthActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(checkAutoLoginAction(navigate));
  // }, [])

  return (
    <>
      <Router/>
    </>
  )
}

export default App
