function todoReducer(state, event) {
  const NEXTSTATE = {
      IDLE: {
          fetch:  {
              ...state,
              status:  'LOADING',
              isInputDisabled: true 
          }, 
          create: { 
              ...state,
              status:  'CREATING',
              isInputDisabled: true 
          },
          update: {
              ...state,
              status:  'UPDATING',
              id: event.id,
              isInputDisabled: true 
          },
          delete: {
              ...state,
              status:  'DELETING',
              id: event.id,
              isInputDisabled: true 
          }
      },

      CREATING: {
          fetch:  {
              ...state,
              status:  'LOADING',
          }, 
      },

      NOENTCREATING: {
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
          noent:  {
              ...state,
              status:     'NOENTCREATING',
              noEntQuery:  event.noEntQuery,
              isCompleted: event.isCompleted
          }
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
              data: event.data,
              isInputDisabled: false
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

