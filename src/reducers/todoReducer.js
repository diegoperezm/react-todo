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
              isInputDisabled: true 
          },
          delete: {
              ...state,
              status:  'DELETING',
              isInputDisabled: true 
          }
      },

      CREATING: {
          fetch:  {
              ...state,
              status:  'LOADING',
          }, 
          reject:  {
              ...state,
              status: 'FAILURE',
              error: event.error
          }
      },

      NOENTCREATING: {
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
          },
          reject:  {
              ...state,
              status: 'FAILURE',
              error: event.error
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

      FAILURE: {}
};

    const nextState = NEXTSTATE[state.status][event.type];
    return nextState !== undefined ? nextState : state;
}


export default todoReducer;

