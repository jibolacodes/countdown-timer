const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const items = document.querySelectorAll('.deadline-format h4');
const deadline = document.querySelector('.deadline')

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDay();

const futureDate = new Date(tempYear, tempMonth, tempDay + 4, 11, 59, 0);

//getting future date values
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const day = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
const hour = futureDate.getHours();
const mins = futureDate.getMinutes();
const secs = futureDate.getSeconds();

console.log(day, date)

//giveaway text
giveaway.innerHTML = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hour}:${mins}am`

function getRemainingTime(){
  const futureTime = futureDate.getTime();
  const currentTime = new Date().getTime();
  const remTimeInMs = futureTime - currentTime;

  //Time conversion in ms
  // 1s = 1000ms
  // 1min = 60s
  // 1hr = 60min
  // 1day = 24hr
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //converting remTimeInMs from ms to seperate time units
  let days = Math.floor(remTimeInMs/oneDay );
  let hours = Math.floor((remTimeInMs % oneDay)/oneHour);
  let mins = Math.floor((remTimeInMs % oneHour)/oneMin)
  let secs = Math.floor((remTimeInMs % oneMin)/1000);
  
  let timeValues = [days,hours,mins,secs]

  //adding 0 to the begiging of a time unit 
  function timeFormat(item){
    if(item < 10){
      return `0${item}`;
    }
    return item
  }

  items.forEach(function(item, index){
    item.textContent = timeFormat(timeValues[index]);
  })
  //countdown
  let countdown = setInterval(getRemainingTime, 1000);

  //clearing countdown
  if(remTimeInMs < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`
  }
}

getRemainingTime();