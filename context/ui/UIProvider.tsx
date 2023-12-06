import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

interface Props {
  children: React.ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'SET_IS_ADDING_ENTRY', payload: isAdding });
  }

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: 'SET_IS_DRAGGING', payload: isDragging });
  }

  return (
    <UIContext.Provider value={{
      ...state,

      // Methods
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      setIsDragging,
    }}>
      {children}
    </UIContext.Provider>
  )
}