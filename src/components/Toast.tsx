import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoContext';

const Toast = () => {
  const { state, dispatch } = useTodo();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state.lastDeleted) {
      setVisible(true);
      const timer = setTimeout(() => {
        dispatch({ type: 'DISMISS_UNDO' });
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [state.lastDeleted, dispatch]);

  const handleUndo = () => {
    dispatch({ type: 'UNDO_DELETE' });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white shadow-lg">
      <span>Todo deleted</span>
      <button onClick={handleUndo} className="font-bold text-blue-400 hover:text-blue-300">Undo</button>
      <button onClick={() => { dispatch({ type: 'DISMISS_UNDO' }); setVisible(false); }} className="text-gray-400 hover:text-white">&times;</button>
    </div>
  );
};

export default Toast;
