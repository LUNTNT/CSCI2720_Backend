const { json } = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu120:p151195W@cluster0.qsanyuv.mongodb.net/stu120');

const schema = require('./schema');

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
    fs.readFile('./data_source/events_result.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
  
      data = JSON.parse(data);

      // for (let i = 0; i < data.length; i++) {
      //   data[i]['id'] = parseInt(data[i]['_id']);
      //   delete data[i]['_id'];

      //   if (!data[i]['latitude']) {
      //     continue;
      //   }

      //   schema.Venue.create(data[i], (err, e) => {
      //     if (err)
      //       console.log(err)
      //     else
      //       console.log(e)
      //   });
      // }


  
      for (let i = 0; i < data.length; i++) {
  
        schema.Venue.findOne({'id' : data[i]['venueid']}, (err, e) => {
          if (err) {
            console.log(err);
            return
          }
  
          if (!e) {
            return
          } 
          schema.Event.create({
              id : parseInt(data[i]['_id']),
              titlee: data[i]['titlee'] ? data[i]['titlee'] : '',
              predateE: data[i]['predateE' ? data[i]['predateE'] : ''],
              progtimee: data[i]['progtimee'] ? data[i]['progtimee'] : '',
              venueid: e._id,
              pricee: data[i]['pricee'] ? data[i]['pricee'] : '',
              desce: data[i]['desce'] ? data[i]['desce'] : '',
              urle: data[i]['urle'] ? data[i]['urle'] : '',
              remarke: data[i]['remarke'] ? data[i]['remarke'] : '',
              enquiry: data[i]['enquiry'] ? data[i]['enquiry'] : '',
              presenterorge: data[i]['presenterorge'] ? data[i]['presenterorge'] : '',
          }, (eerr, ee) => {
            if (eerr) {
              console.log(eerr);
              return
            }
  
            console.log(ee)
          })
        })
      }
  

  
    });
  })