// Create an array of schedules
const schedules = [
    {
        start_hour: 7,
        start_minute: 15,
        end_hour: 8,
        end_minute: 0,
    },
    {
        start_hour: 8,
        start_minute: 5,
        end_hour: 8,
        end_minute: 50,
    },
    {
        start_hour: 8,
        start_minute: 55,
        end_hour: 9,
        end_minute: 40,
    },
    {
        start_hour: 10,
        start_minute: 0,
        end_hour: 10,
        end_minute: 45,
    },
    {
        start_hour: 10,
        start_minute: 50,
        end_hour: 11,
        end_minute: 35,
    },
    {
        start_hour: 12,
        start_minute: 45,
        end_hour: 13,
        end_minute: 30,
    },
    {
        start_hour: 13,
        start_minute: 35,
        end_hour: 14,
        end_minute: 20,
    },
    {
        start_hour: 14,
        start_minute: 25,
        end_hour: 15,
        end_minute: 10,
    },
    {
        statrt_hour: 15,
        start_minute: 30,
        end_hour: 16,
        end_minute: 15,
    },
    {
        statrt_hour: 16,
        start_minute: 20,
        end_hour: 17,
        end_minute: 5,
    }
]


// Get current or next schedule
function getNextSchedule() {
    // Get the current hour and minute
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    for (let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i]
        if (currentHour < schedule.end_hour) {
            return schedule
        } else if (currentHour === schedule.end_hour) {
            if (currentMinute < schedule.end_minute) {
                return schedule
            }
        }
    }
    return schedules[0]
}

function setTime() {
    // Get current schedule
    const currentSchedule = getNextSchedule();


    // Create two time objects and calculate the difference
    // Current time
    const current = new Date()
    // Create second object with the next schedule
    const next = new Date()
    next.setHours(currentSchedule.end_hour-1)
    next.setMinutes(currentSchedule.end_minute)
    next.setSeconds(0)

    // Calculate the difference
    const diff = new Date(next.getTime() - current.getTime())
    // Get the time difference
    const hours = diff.getHours().toString().padStart(2, '0')
    const minutes = diff.getMinutes().toString().padStart(2, '0')
    const seconds = diff.getSeconds().toString().padStart(2, '0')
    const time = `${hours}:${minutes}:${seconds}`
    // Set the time in the DOM
    document.getElementById('counter').innerHTML = time;
}
setTime()
setInterval(function () { setTime() }, 1000);

function toggleDarkMode() {
    const body = document.getElementsByTagName('body')[0]
    body.classList.toggle('dark')
    localStorage.setItem("classlist", body.classList)
}

document.getElementById('dark-mode-checkbox').addEventListener('click', toggleDarkMode)

if (localStorage.getItem("classlist") !== null) {
    document.getElementsByTagName('body')[0].classList = localStorage.getItem("classlist")
}
