const {google} = require('googleapis')
const { addDays, format } = require('date-fns')

const today  = new Date()

const generateDates = (startDate, numberOfDays) => {
  const dates = []
  for (let i = 1; i <= numberOfDays; i += 1) {
    dates.push(addDays(startDate, i+1))
  }

  return dates
}

const getBikeReservations = async () => { 
  const privatekey = JSON.parse(process.env.GOOGLE_KEY_FILE)
  const jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar']
  )
  
  jwtClient.authorize((err) => {
    if (err) {
      // eslint-disable-next-line
      console.log(err)
      
    } else {
      // eslint-disable-next-line
      console.log("Successfully connected!")
    }
    }
  )

  const dates = generateDates(today, 30)
  const formattedDates = dates.map(date => format(date, 'yyyy-MM-dd'))

  // const calendar = google.calendar('v3')
  // const calendarEvents = await new Promise((resolve, reject) => {
  //   const events = calendar.events.list({
  //     auth: jwtClient,
  //     calendarId: process.env.GOOGLE_CAL_ID_BIKE_1,
  //     // timeMin: formatISO(new Date()),
  //     // timeMax: formatISO(addMonths(new Date(), 6)),
  //     showDeleted: false,
  //     maxResults: 200,
  //     singleEvents: true,
  //     orderBy: 'startTime',
  //   }, async (err, res) => {
  //     if (err) {
  //       // eslint-disable-next-line
  //       console.log(`The API returned an error: ${  err}`)
  //       reject(`The API returned an error: ${  err}`)
  //       return
  //     }

  //     const events = JSON.stringify(res.data.items)
  //     resolve(events)
  //   })
  // })
  return formattedDates
}

module.exports = getBikeReservations
