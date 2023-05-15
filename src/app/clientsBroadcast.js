const broadcastFrequency = 1000 / 60;

function clientsBroadcast(dynamicNamespace, clientsConnections) {
  dynamicNamespace.children.forEach((nsp) => {
    if (clientsConnections[nsp.name]) {
      const clients = {};

      Object.entries(clientsConnections[nsp.name]).forEach(([clientId, clientState]) => {
        if (clientState.isUpdated) {
          clientState.isUpdated = false;

          clients[clientId] = clientState;
          delete clients[clientId].isUpdated;
        }
      });

      if (Object.keys(clients).length > 0) {
        nsp.volatile.emit('update', clients);
      }
    }
  });

  setTimeout(clientsBroadcast, broadcastFrequency, dynamicNamespace, clientsConnections);
}

module.exports = clientsBroadcast;
