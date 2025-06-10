self.onmessage = (event) => {
  import("./fibonacci.js")
    .then(({ default: fibonacci }) => {
      const number = event.data;
      const result = fibonacci(number);
      self.postMessage(result);
    })
    .catch((error) => {
      self.postMessage(`Error: ${error.message}`);
    });
}
