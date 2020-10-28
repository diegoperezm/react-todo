import   React                                  from 'react';
import { useState, useEffect, useReducer}       from 'react';
import   todoReducer                            from '../../reducers/todoReducer.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Col                                      from 'react-bootstrap/Col';
import Form                                     from 'react-bootstrap/Form';
import Table                                    from 'react-bootstrap/Table';
import Button                                   from 'react-bootstrap/Button';

import List                                     from  '../List/';

import axios                                    from 'axios';

let PORT  = process.env.REACT_APP_MY_ENV;

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

  const [ state, dispatch ]       = useReducer(todoReducer, initialState);
  let   [ query, setQuery ]   = useState('');

  useEffect(() => {
      
   async  function create() {
       try {
           await axios
                     .post(
                         'http://localhost:5000/todo',
                         {
                             data: query,
                             isCompleted: false 
                         });
           await setQuery('');
           await dispatch({type: 'fetch'});
       } catch(error) {
           await dispatch({type: 'reject', error});
       }
    }

   async  function noEntCreate() {
       try {
           await axios
                     .post(
                         'http://localhost:5000/todo',
                         {
                             data: state.noEntQuery,
                             isCompleted: state.isCompleted
                         }
                     );
           await dispatch({type: 'fetch'});
       } catch(error) {
           await dispatch({type: 'reject', error});
       }
    }

    async  function read() {
       try {
         const res  = await axios.get(PORT);
         const data = await res.data.data;
         await dispatch({type: 'resolve',  data});
       } catch(error) {
          await dispatch({type: 'reject',  error});
       }
    }

   async  function update() {
      try {
        await axios.put('http://localhost:5000/todo', {id: state.id});
        await dispatch({type: 'fetch'});
      } catch(error) {
          if(error.message === 'Request failed with status code 409') {
            let noEntTodo   = await state.data.filter( todo => todo._id === state.id);  
            let noEntQuery  = await noEntTodo[0].data;
            let isCompleted = await !noEntTodo[0].isCompleted;
            await dispatch({type: 'noent', noEntQuery, isCompleted });
          } else { 
            await dispatch({type: 'reject',  error});
          }
      }
   }

  async  function remove() {
      try {
          await axios({
              method: 'DELETE',
               url: 'http://localhost:5000/todo',  
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
              data: {
                  id: state.id
              }
             });
         await dispatch({type: 'fetch'});
      } catch(error) {
         await dispatch({type: 'reject',  error});
      } 
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
<>
      <Col xs={12} className="mt-5">
          <h1 >To do app, current state: {state.status}</h1>
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
            <List data={state.data} dispatch={dispatch}/>
          </tbody>
        </Table>
    </Col>
 </>
    );

};

export default Todos;
