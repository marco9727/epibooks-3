import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

// qui verranno mostrati i commenti con id specifico sotto ad ogni proprio libro
// sottoforma di lista; facciamo un map in un componente a funzione richiamando
// la prop comment to show(che prende tutti i commenti trovati nella fetch fatta
//in commentarea)
const CommentList = ({ commentsToShow }) => (
  <ListGroup style={{ color: "black" }} className="mt-2">
    {/*facciamo il map a commentstoshow che prende come parametro comment ovver
    il singolo commento e all'interno della funzione chiamiamo il componente
    singlecomment che ha come props comment=comment che la riprendiamo in singel
    comment*/}
    {commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} />
    ))}
  </ListGroup>
);

export default CommentList;
