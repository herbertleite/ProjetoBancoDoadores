function broadcastAliveMessage(udpServer, broadcastConfig, aliveMessageData) {
  const message = JSON.stringify(aliveMessageData);
  try {
    var buf = Buffer.from(message);
    udpServer.send(buf, 0, buf.length, broadcastConfig.port, broadcastConfig.host);
  } catch (e) {
    //for compatibility with Node.js 4.x and older
    udpServer.send(message, 0, message.length, broadcastConfig.port, broadcastConfig.host);
  }
}

function startBroadcastingAliveMessage(udpServer, broadcastConfig, aliveMessageData) {
  // Broadcast first message immediately
  broadcastAliveMessage(udpServer, broadcastConfig, aliveMessageData);

  // Broadcasting alive message every 3 secs time
  setInterval(() => broadcastAliveMessage(udpServer, broadcastConfig, aliveMessageData),
    broadcastConfig.interval);
}

module.exports.broadcastAliveMessage = broadcastAliveMessage;
module.exports.startBroadcastingAliveMessage = startBroadcastingAliveMessage;
