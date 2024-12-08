onmessage = function(e) {
  const userCreatedJavscript = e.data;
  eval?.(userCreatedJavscript)
}

console.log = (logMessage:string) => {
  postMessage({ logMessage, type:"log" });
}

console.error = (logMessage:string) => {
  postMessage({ logMessage, type:"error" });
}

console.info = (logMessage:string) => {
  postMessage({ logMessage, type:"info" });
}
