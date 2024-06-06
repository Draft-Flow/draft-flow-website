const fs = require('fs')
const {google} = require('googleapis')
const { isValid, addMonths, formatISO, parseISO } = require('date-fns')
const { AssetCache } = require('@11ty/eleventy-fetch')
const slugify = require('slugify')

const { options } = require('../utils/slugify')

module.exports = async () => {
  // Create a cache and use it if available
  const coursesCache = new AssetCache("google_calender_courses");

  if (coursesCache.isCacheValid("1h")) {
    console.log( "Using Google Calendar cache…" );
    const courses = await coursesCache.getCachedValue();
    return courses;
  }

  const privatekey = JSON.parse(process.env.GOOGLE_KEY_FILE)
  const jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar']
  )
  
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("Successfully connected!");
    }
    }
  )

  const calendar = google.calendar('v3')
  const calendarCourses = await new Promise((resolve, reject) => {
    calendar.events.list({
      auth: jwtClient,
      calendarId: process.env.GOOGLE_CAL_ID_COURSES,
      timeMin: formatISO(new Date()),
      timeMax: formatISO(addMonths(new Date(), 12)),
      showDeleted: false,
      maxResults: 200,
      singleEvents: true,
      orderBy: 'startTime',
    }, async (err, res) => {
      if (err) {
        console.log('The API returned an error: ' + err)
        reject('The API returned an error: ' + err)
        return
      }

      const coursesJSON = res.data.items
      resolve(coursesJSON)
    })
  })
 
  const calendarCoursesNormalized = calendarCourses.filter((course) => (
    (isValid(parseISO(course.start.dateTime)) && isValid(parseISO(course.end.dateTime)))
  )).map((course) => (

    {
      id: course.id,
      title: course.summary, 
      summary: `${course.description.split("\n")[0]}`,
      description: course.description,
      recurringEventId: course.recurringEventId,
      startDate: course.start.dateTime,
      endDate: course.end.dateTime,
      location: course.location,
      permalink: `/courses/${slugify(course.summary, options)}/index.html`,
    }
  ))

  const dir = './.cache'

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir)
  }
  
  await coursesCache.save(calendarCoursesNormalized, "json")

  return calendarCoursesNormalized
}
