const btnRunCode:HTMLButtonElement = document.querySelector('#run-code-btn');
const btnStopCode:HTMLButtonElement = document.querySelector('#stop-code-btn');
const btnClearConsole:HTMLButtonElement = document.querySelector('#clear-console-btn');
const consoleView:HTMLElement = document.querySelector('#console-view');

var runCodeWorker: Worker | undefined = undefined;

const stopCodeWorker = () => {
  if (runCodeWorker !== undefined) {
    console.log("Terminating")
    runCodeWorker.terminate();
  }
}


btnRunCode.onclick = () => {
  stopCodeWorker();
  runCodeWorker = new Worker("web-worker.js");
  const codeTextbox:HTMLInputElement = document.querySelector('#code-textarea');
  runCodeWorker.postMessage(codeTextbox.value);
  runCodeWorker.onmessage = function(e) {
    var div = document.createElement("div");
    div.className="console-item";
    div.innerHTML = `
    console.${e.data.type}(
    <div class="center-log">
          ${e.data.logMessage}
    </div>
    )
    `;
    consoleView.insertBefore(div, consoleView.childNodes[0]);
  }
}

btnStopCode.onclick = () => {
  stopCodeWorker();
}

btnClearConsole.onclick = () => {
  consoleView.innerHTML = "";
}