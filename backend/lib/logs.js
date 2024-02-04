function generateLog(status, subject, content, time=(new Date).toISOString()) {
    return `[${time}] (${status}): ${subject} -> ${content}`
}

module.exports = generateLog
