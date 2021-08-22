
import React, { useReducer, useState, useContext } from 'react';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_COMPLETE: 'toggle-complete'
  
  }
  

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:      
        return{
          ...state,
          todos: [...state.todos, {
            id:Date.now(),      
           complete:false,        
           text: action.payload.text 
          }]
        };

       case ACTIONS.TOGGLE_COMPLETE: 
         return{
             ...state,
            todos: state.todos.map(todo => todo.id === action.payload.id
            ? {...todo, complete: !todo.complete} 
            : todo
            )
       };
      default:
        return state;
    }
  }
  
  export default function Todos() {

    const [text, setText] = useState('');
    const [state, dispatch] = useReducer(reducer, {todos: []});
    const {todos} = state;      
    
    
    const handleSubmit = (e) => {
      e.preventDefault();
 
      dispatch({type: ACTIONS.ADD_TODO,
                           
              payload: {text}   
      });
      setText('');
    }
  
    return (
      <>
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className='todos'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
          <button>SUBMIT</button>
          </form>
          <ul>
          {todos.map(todo => <Todo id={todo.id} complete={todo.complete} text={todo.text}  key={todo.id}/>)}
          </ul>
        </div>
        </StateContext.Provider>
    </DispatchContext.Provider>
      </>
    );
  }

    export function Todo({id, complete, text}){
      const dispatch = useContext(DispatchContext);
      
          return(

            <li>          
              <a style={complete ? {'textDecoration' : 'line-through'} : {}} href={'#'} onClick={() => 
          
              dispatch({
                type: ACTIONS.TOGGLE_COMPLETE,
                 payload: {id}
                })
                }>
                    {text}
              </a>
              
            </li>
          )
      }
  
  