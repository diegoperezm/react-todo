import   React                                  from 'react';
import { useState, useEffect, useReducer}       from 'react';
import { v4 as uuidv4 }                         from 'uuid';

import   todoReducer                            from '../../reducers/todoReducer.js';

import Row                                      from 'react-bootstrap/Row';
import Col                                      from 'react-bootstrap/Col';
import Form                                     from 'react-bootstrap/Form';
import Table                                    from 'react-bootstrap/Table';
import Button                                   from 'react-bootstrap/Button';

import List                                     from  '../List/';

function Todos() {
  const   initialState        = {
                                     status: "LOADING",
                                     data: [],
                                     error: null,
                                     id: null,
                                     noEntQuery: null,
                                     isCompleted: false,
                                     isInputDisabled: true 
  };

  const [ state, dispatch ]              = useReducer(todoReducer, initialState);
  const [ todoData, setTodoData]     = useState([]); 
  const [ updateId, setUpdateId]     = useState(''); 
  const [ removeId, setRemoveId]     = useState(''); 
  const [ query, setQuery ]          = useState('');
   
  useEffect(() => {
      
   function create() {
    let newTodos =  todoData.concat([{_id: uuidv4() ,data: query, isCompleted: false}]);
    setTodoData(newTodos);
    setQuery('');
    dispatch({type: 'fetch'});
   }

// Not implemented
   function noEntCreate() {
    dispatch({type: 'failure'});
   }

    function read() {
     const data = todoData;  
     dispatch({type: 'resolve',  data});
    }

   function update() {
     let newTodos = todoData.map( todo => {
       if(todo._id === updateId) {
         return Object.assign(todo, {isCompleted: !todo.isCompleted});
       };
         return todo;
     });
     setTodoData(newTodos);
     dispatch({type: 'fetch'});
    // error, not implemented: from this error => noEntCreate (IDK if it is possible)  
   }

  function remove() {
      let newTodos = todoData.filter(todo => todo._id !== removeId);   
      setTodoData(newTodos);
      dispatch({type: 'fetch'});
  }

   // CREATE   
   if(state.status === 'CREATING' ) {
     create();
   }

   if(state.status === 'NOENTCREATING' ) {
     noEntCreate();
   }
      
   // READ
   if(state.status === 'LOADING') {
     read();
   }

      
   // UPDATE 
   if(state.status === 'UPDATING' ) {
      update();
   }

   // DELETE
   if(state.status === 'DELETING' ) {
      remove();
   }

  }, [state.status]);
   
  const handleSubmit = evt => {
     evt.preventDefault();
     dispatch({type:"create", query});
  };

     return (
   <Row >
      <Col xs={12} className="mt-5">
          <h1 >To do app</h1>
          <Form
           className="mt-2"
           onSubmit={handleSubmit}
           >
         <Form.Control
           disabled={state.isInputDisabled}
           type="text"
           required
           placeholder="What needs to be done?"
           onChange={evt => setQuery(evt.target.value)}
           value={query}

         />
         <Button
          className="mt-2 float-right"
          variant="primary"
          type="submit">
            Add Todo 
         </Button>
       </Form>
     </Col>
     <Col>
        <Table bordered hover className="mt-5" >
          <tbody>
             <List
                  data={state.data}
                  dispatch={dispatch}
                  setUpdateId={setUpdateId}
                  setRemoveId={setRemoveId}
             />
          </tbody>
        </Table>
    </Col>
   </Row>
    );

};

export default Todos;
