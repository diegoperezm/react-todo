function todoReducer(state, event){

   if(state.status === 'idle' && event.type === 'CREATE' ) {
      return {
          ...state,
         status: 'creating',
        }; 
    }

    if(state.status === 'creating' && event.type === 'FETCH')  {
      return {
        ...state,
        status: 'loading'
        }; 
    }
    
    if(state.status === 'idle' && event.type === 'UPDATE' ) {
      return {
        
          ...state, 
          status: 'updating',
          id: event.id
        }; 
    }

    if(state.status === 'updating' && event.type === 'FETCH')  {
      return {
         ...state,
        status: 'loading'
        }; 
    }

    if(state.status === 'idle' && event.type === 'DELETE' ) {
      return {
          ...state,
          status: 'deleting',
          id: event.id
        }; 
    }

    if(state.status === 'deleting' && event.type === 'FETCH')  {
      return {
        ...state,
        status: 'loading'
        }; 
    }

    if(state.status === 'deleting' && event.type === 'REJECT')  {
      return {
        ...state,
          error: event.error,
         status: 'failure'
        }; 
    }

    if(state.status === 'idle' && event.type === 'FETCH' ) {
      return {
        ...state,
        status: 'loading'
        }; 
    }

    if(state.status === 'loading' && event.type === 'RESOLVE' ) {
      return {
          ...state,
         data: event.data,
         status: 'idle'
      } ;
    }

    if(state.status === 'loading' && event.type === 'REJECT' ) {
      return {
          ...state,
         error: event.error,  
         status: 'failure',
        }; 
    }
    if(state.status === 'failure' && event.type === 'FETCH' ) {
      return {
          ...state,
         error: event.err,  
         status: 'idle',
        }; 
    }
    return state;
};

export default todoReducer;
