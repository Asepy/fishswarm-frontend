import { useState } from "react";
import postMembers from "../api/postMembers";
import date from "../data/date";

const Cargador = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result_json , setResult ] = useState([]);
  const [data, setData] = useState({});
  const [date_changed, setDate]= useState([]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    console.log(data.birthdate)
    setDate(date(data.birthdate))

    console.log(date_changed);

    postMembers(data,date_changed).then((result) => {
      //setIsLoaded(true);
      //setResult(result.data);
    });
  };
  const handleInputChange = (event) => {
    event.persist();
    setData((data) => ({ ...data, [event.target.name]: event.target.value }));
  };
  return { handleSubmit, handleInputChange, data, result_json};
};

export default Cargador;
