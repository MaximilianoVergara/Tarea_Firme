import mongoose from "mongoose";
import {Data_management} from "./services";

//En las versiones mas nuevas de mongoose ya no son necesarios useNewUrlParser y useUnifiedTopology

mongoose.connect('mongodb://database:27017/my-database')

  .then(db => {
    console.log('db conected')

    Data_management('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');

    setInterval(() => {
        Data_management('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
      }, 60 * 60 * 1000);

    })
    
  .catch(err => console.log(err));

