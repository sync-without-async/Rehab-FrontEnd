import { useReducer, createContext} from 'react';
import { modalReducer, intialModalState } from '../reducer/modal.jsx'; // 모달 리듀서가 있는 경로를 지정해주세요
import PropTypes from 'prop-types';

export const StateContext = createContext();
export const DispatchContext = createContext();

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, intialModalState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};