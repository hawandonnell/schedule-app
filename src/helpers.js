const handleTabColor = (theme, value) => {
    if (value == new Date().getDay() - 1) {
        return theme.palette.primary.main
    } else {
        return null
    }
}

const handleLessonColor = (theme, value, time) => {
    if (handleTabColor(theme, value) != null) {
        let currentHours = new Date().getHours()
        let currentMinutes = new Date().getMinutes()
        let inputTimeArr = time.split('-') // Array that contains start and end of a lesson
        let startTime = inputTimeArr[0].split(':')
        let endTime = inputTimeArr[1].split(':')

        // Check if lesson started
        if (currentHours >= startTime[0] && currentMinutes >= startTime[1]) {
            if (currentHours >= endTime[0] && currentMinutes >= endTime[1]) {
                return null
            } else {
                return 5
            }
        } else {
            return null
        }
    } else {
        return null
    }
}

export { handleLessonColor, handleTabColor }
