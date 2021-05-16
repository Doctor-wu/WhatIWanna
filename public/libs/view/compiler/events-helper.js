
function handleEvents(token) {
  const evtKeys = Object.keys(token.events);
  if (!evtKeys.length) return;
  console.log(token);
}

export default handleEvents;