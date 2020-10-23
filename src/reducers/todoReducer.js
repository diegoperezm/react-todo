function todoReducer(state, event) {
  const NEXTSTATE = {
      idle: {
          FETCH:  {
              ...state,
              status:  'loading',
          }, 
          CREATE: { 
              ...state,
               status:  'creating'
          },
          UPDATE: {
              ...state,
              status:  'updating',
              id: event.id
          },
          DELETE: {
              ...state,
              status:  'deleting',
              id: event.id
          }
      },
      creating: {
          FETCH:  {
              ...state,
              status:  'loading'
          }, 
      },
      updating: {
          FETCH:  {
              ...state,
              status:  'loading',
          }, 
      },
      deleting: {
          FETCH:  {
              ...state,
              status:  'loading'  
          }, 
          REJECT:  {
              ...state,
              status: 'failure',
              error: event.error
          }
      },
      loading: {
          RESOLVE: {
              ...state,
              status: 'idle',
              data: event.data
          },
          REJECT:  {
              ...state,
              status: 'failure',
              error: event.error
          }
      },
      failure: {
          FETCH:   {
              ...state,
              status: 'idle',
  //         error: event.error
          }
      }
};

    const nextState = NEXTSTATE[state.status][event.type];
    return nextState !== undefined ? nextState : state;
}


export default todoReducer;

