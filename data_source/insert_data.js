// CSCI-2720 Project Group 30 Culture Programme

// Group Members:

// 1155141928 Cheuk Chun Lok            

// 1155143453 Shek Wui Lun            

// 1155142754 Chiu Man Ho

// 1155126403 Wong Yu Shing            

// 1155143965 Yau Chun Tung              

// 1155143076 Yeung Sze Ki

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

      //   if (!data[i]['latitude']) {
      //     continue;
      //   }

      //   schema.Venue.create({
      //     id: parseInt(data[i]['_id']),
      //     venuee: data[i]['venuee'],
      //     coordinate: {
      //       lat: parseFloat(data[i]['latitude']),
      //       lng: parseFloat(data[i]['longitude']),
      //     },
      //   }, (err, e) => {
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
              predateE: data[i]['predateE'] ? data[i]['predateE'] : '',
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