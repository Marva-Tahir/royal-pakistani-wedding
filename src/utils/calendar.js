/**
 * Calendar Utilities
 * Generates Google Calendar links and .ics calendar files for events
 */

export function getGoogleCalendarUrl(event, couple) {
  const startTime = new Date(event.isoDate);
  // Default duration: 4 hours
  const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);

  const formatTime = (d) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const title = encodeURIComponent(`${event.title} - ${couple.brideFirstName} & ${couple.groomFirstName}'s Wedding`);
  const details = encodeURIComponent(
    `${event.badge}\n\n${event.invitationMessage}\n\nDress Code: ${event.dressCode}\n\nVenue: ${event.venue}, ${event.address}`
  );
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  const dates = `${formatTime(startTime)}/${formatTime(endTime)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event, couple) {
  const startTime = new Date(event.isoDate);
  const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);

  const formatIcsDate = (date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const summary = `${event.title} - ${couple.bride} & ${couple.groom}`;
  const description = `${event.badge}\\n${event.invitationMessage}\\nDress Code: ${event.dressCode}`;
  const location = `${event.venue}, ${event.address}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Royal Pakistani Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@royalwedding.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startTime)}`,
    `DTEND:${formatIcsDate(endTime)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.id}-invitation-${couple.brideFirstName}-${couple.groomFirstName}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
