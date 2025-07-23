export function getCurrentTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }

  return new Intl.DateTimeFormat('en-US', options).format(now)
}
