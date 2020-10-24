import React     from 'react';
import Button    from 'react-bootstrap/Button';

const List = props => {
    let list;
    if(props.data !== undefined || props.data.data !== null) {
      list =  props.data.map(elem => {
          let todoTitle = !elem.isCompleted ? elem.data : <strike><b>{elem.data}</b></strike>;
          let id = elem._id;
       return  (
        <tr key={'key-'+elem._id}>
          <td>{todoTitle}
           <Button
            onClick={() => props.dispatch({type: "update",  id })}
             variant="info"
             size="sm"
             className="float-right ml-2">
             Complete
           </Button> 
           <Button
            onClick={() => props.dispatch({type: "delete",  id })}
             variant="danger"
             size="sm"
             className="float-right">
             Delete
           </Button>
         </td>
        </tr>);
      });
    } else {
       list = null;
    }
    return list;
};

export default List;
