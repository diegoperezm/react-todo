function todoReducer(state, event) {
  const NEXTSTATE = {
      IDLE: {
          fetch:  {
              ...state,
              status:  'LOADING',
          }, 
          create: { 
              ...state,
               status:  'CREATING'
          },
          update: {
              ...state,
              status:  'UPDATING',
              id: event.id
          },
          delete: {
              ...state,
              status:  'DELETING',
              id: event.id
          }
      },
      CREATING: {
          fetch:  {
              ...state,
              status:  'LOADING'
          }, 
      },
      UPDATING: {
          fetch:  {
              ...state,
              status:  'LOADING',
          }, 
      },
      DELETING: {
          fetch:  {
              ...state,
              status:  'LOADING'  
          }, 
          reject:  {
              ...state,
              status: 'FAILURE',
              error: event.error
          }
      },
      LOADING: {
          resolve: {
              ...state,
              status: 'IDLE',
              data: event.data
          },
          reject:  {
              ...state,
              status: 'FAILURE',
              error: event.error
          }
      },
      FAILURE: {
          fetch:   {
              ...state,
              status: 'IDLE',
  //         error: event.error
          }
      }
};

    const nextState = NEXTSTATE[state.status][event.type];
    return nextState !== undefined ? nextState : state;
}


export default todoReducer;

