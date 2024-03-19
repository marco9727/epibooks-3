import { Button, ListGroup } from "react-bootstrap";
// facciamo il componente a funzione  e ci passiamo la prop comment scritta
//in commentlist e facciamo dentro alla funzione un altra funzione di deletecomment
//per far si che ogni commento possa esserecancellato facendo ovviamente
//la fetch con delete passando come parametro l'asin id del libro con l'url
//....+ asin
const SingleComment = ({ comment }) => {
  const deleteComment = (asin) => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("La recensione è stata eliminata!");
        } else {
          throw new Error("La recensione non è stata eliminata!");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    //qui verrà visualizzata l'elemento listgroup item che contiene il testo
    //del commento
    <ListGroup.Item>
      {/* qui stiamo accedendo alla proprietà comment dell'oggetto comment
      dove contiene ogni singolo commento preso come  props da commentlist 
      quindi comment.comment si riferisce al testo del commento all'inetro del 
      oggetto comment */}
      {comment.comment}
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
