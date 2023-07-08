export function connectHub() {
  const ws = new WebSocket(
    "ws://socket.live-menu.ir?ogid=34096430-A51E-4C78-92E5D9D08CADE8CD"
  );
  const messages = [];
  ws.onopen = () => {
    console.log("WebSocket connection opened");
  };

  // Event handler when a message is received
  ws.onmessage = (event) => {
    const message = event.data;
    messages.push(message);
    console.log("Received message:", message);
    // Show a otice or handle the received message as per your requirements
  };

  // Event handler when WebSocket connection is closed
  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };
  return messages;
}
