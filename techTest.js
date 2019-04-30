
// This function fetches the data from out JSON file
let people = []

const fs = require('fs');

let rawdata = fs.readFileSync('./fakepeople.json');
let data = JSON.parse(rawdata);
people =[...data]


// Count number of people with green eyes
function countEyes(array, eyeColour){
    let eyeCount = 0;
    for (let i = 0; i < array.length; i++) {
        const person = array[i];
        if (person.eyeColor === eyeColour) {
        eyeCount += 1 
        }
    }
  return eyeCount;
}
console.log("Total green eyed people: ", countEyes(people, "green"));

// // *********************************************************************


// // 10 Most common surnames
function topTenSurnames(array) {
   // // Loops through the array and creates an object containing key value pairs, the surname being the key and tallies all the occurances of each surname
     const reducedObj = array.reduce((person, entry) => {
         person[entry.name.last] = (person[entry.name.last] || 0) + 1;
         return person; 
     }, {});
     
// // returns an array from the reducedObj that then gets mapped over to add the key values to the objects
     const result = Object.keys(reducedObj)
         .map((key) => {
             const temp = {};
             temp.surname = key;
             temp.count = reducedObj[key];             
             return temp;
         })

     return result.splice(1, 10);
}
console.log("Top ten surnames: ", topTenSurnames(people));

// *********************************************************************

//Average age of people by eyecolour
function averageAgeByEyeColour(array, eyeColour) {
    let agesArray = []
    for (let i = 0; i < array.length; i++) {
        const person = array[i];
        if (person.eyeColor === eyeColour) {
            agesArray.push(person.age)    
        }
    }
let sum = agesArray.reduce((previous, current) => current += previous);
let avg = sum / agesArray.length;
    return avg.toFixed(0)
}
console.log("Average age of person by eye colour: ", averageAgeByEyeColour(people, "blue"));

// *********************************************************************


// find account closest to eiffel tower
// I honestly really struggled with this one, The solution was one I came accross after googling for ages. This is the link to the solution
// https: //urlzs.com/UGY2
const closestToCoordinates = (array, targetLocation) => {

    const vectorDistance = (dx, dy) => {
        return Math.sqrt((dx * dx) + (dy * dy));
    };

    const locationDistance = (locationOne, locationTwo) => {
        const dx = locationOne.latitude - locationTwo.latitude;
        const dy = locationOne.longitude - locationTwo.longitude;

        return vectorDistance(dx, dy);
    };

    return array.reduce((prev, curr) => {
        const prevDistance = locationDistance(targetLocation, prev);
        const currDistance = locationDistance(targetLocation, curr);

        return (prevDistance < currDistance) ? prev : curr;
        
    });
};

console.log("Account closest to a location: ", closestToCoordinates(people, {
    latitude: 48.858093,
    longitude: 2.294694
}));


// *********************************************************************

// The goal of this function would have been to return all accounts over a certain age. However I encountered difficulties with the dates coming from the JSON
// and was unable to come to a solution for it.

// function findAcountsByDaysExisted(array, accAge) {
//     let accounts = [];
//     for (let i = 0; i < array.length; i++) {
//         const person = array[i];
//         let date = person.registered;
//         let slicedDate = date.slice(0,10);
//         let buildDateObj = slicedDate.split("-").reverse().join("/");
//         let accountDate = new Date(buildDateObj);
//         let currDate = new Intl.DateTimeFormat('en-GB').format(Date.now());
//         // this should of returned the time an account has existed but for some reason some of the dates from the JSON were coming back as invalid.
//         let diffDays = parseInt((currDate - accountDate) / (1000 * 60 * 60 * 24));
//         // // I would have then checked that accounts over the age required are inserted into the array.
//         // // I am not sure if it would have functioned correctly yet as I was unable to reach this point
//         if (diffDays >= accAge) {
//             accounts.push(person)
//         }
//     }
//     return accounts
// }

// console.log(findAcountsByDaysExisted(people, 366))

