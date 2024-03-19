import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = function ({ asin }) {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // facciamo la fetch per prendere tutt i commenti dei libri con l'url
  //fornito + la props messa in single book dove prendiamo gli id dei libri

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       "https://striveschool-api.herokuapp.com/api/comments/" +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
  //         },
  //       }
  //     );
  // nella fetch alla risposta fornita avremo i commenti che andranno
  //a riempire l'array vuoto messo come stato iniziale con un nuovo stato
  // cosi che possa salvare i commenti ricevuti per ogni libro sotto ad ognuno di esso

  //     console.log(response);
  //     if (response.ok) {
  //       let comments = await response.json();
  //       this.setState({ comments: comments, isLoading: false, isError: false });
  //     } else {
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ isLoading: false, isError: true });
  //   }
  // };

  // componentDidUpdate(prevProps) {
  //Dopo aver controllato se le proprietà precedenti prevProps.asin sono diverse
  // dalle proprietà attuali this.props.asin, viene eseguita una richiesta fetch per
  // ottenere i commenti relativi all'ASIN del libro.
  // if (prevProps.asin !== this.props.asin) {
  //   this.setState({
  //     isLoading: true,
  //   });

  useEffect(() => {
    const fetchComments = () => {
      //La variabile fetchComments è una funzione che viene definita all'interno dell'hook
      // useEffect. Questa funzione è responsabile per eseguire la richiesta HTTP per ottenere
      // i commenti relativi all'ASIN del libro. La ragione per cui viene definita all'interno
      // di useEffect è che useEffect è utilizzato per gestire effetti collaterali all'interno
      // di un componente React, come il recupero dei dati da una API. Poiché vogliamo eseguire
      // la richiesta HTTP solo quando il componente viene montato o quando asin cambia,
      //definiamo la funzione all'interno di useEffect. In questo modo, la funzione verrà
      //chiamata solo quando necessario. Quando asin cambia (il che avviene quando un nuovo
      //libro viene selezionato), useEffect verrà eseguito nuovamente e chiamerà la funzione
      // fetchComments per recuperare i nuovi commenti relativi al nuovo libro. In sostanza,
      // fetchComments viene chiamata per inizializzare o aggiornare lo stato dei commenti
      //in base all'ASIN del libro selezionato.
      setIsLoading(true);

      fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4NDVhMWFiYWQyODAwMTliZDRkYjYiLCJpYXQiOjE3MTA3Njk1NjksImV4cCI6MTcxMTk3OTE2OX0.JSOakHUY57W2XBqIRWyng-AbnoOnwbA9wrNZ6ou1c3s",
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore durante il recupero dei commenti");
          }
        })
        .then((commentsData) => {
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // });
          setComments(commentsData);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          console.log(error);
          // this.setState({ isLoading: false, isError: true });
          console.log(error);
          setIsLoading(false);
          setIsError(true);
        });
    };
    fetchComments();
  }, [asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      {/* commentarea avrà due sotto componenti: addcomment avra la prop che 
        prende gli id dei libri mentre comment list avra la prop commenttoshow 
        che prende tutti i commenti che arrivano nell fetch e che sono salvati nell'array
         */}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
