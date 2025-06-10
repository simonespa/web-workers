document.addEventListener("DOMContentLoaded", () => {
  if (window.Worker === undefined) {
    document.getElementById("fib-result").value =
      "Web Workers are not supported in this browser.";
    return;
  }

  const input = document.getElementById("fib-input");
  const mode = document.getElementById("fib-mode");
  const result = document.getElementById("fib-result");
  const submitButton = document.getElementById("fib-submit");

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    result.value = "Calculating...";

    const number = parseInt(input.value, 10);

    if (isNaN(number) || number < 0) {
      result.value = "Please enter a valid non-negative integer.";
      return;
    }

    switch (mode.value) {
      case "worker":
        const worker = new Worker("fibonacci-worker.js");
        worker.postMessage(number);

        worker.onmessage = (event) => {
          result.value = `Fibonacci(${number}) = ${event.data}`;
          worker.terminate();
        };

        worker.onerror = (error) => {
          result.value = `Error: ${error.message}`;
          worker.terminate();
        };
        break;
      case "main-thread":
        import("./fibonacci.js")
          .then(({ default: fibonacci }) => {
            const fibResult = fibonacci(number);
            result.value = `Fibonacci(${number}) = ${fibResult}`;
          })
          .catch((error) => {
            result.value = `Error: ${error.message}`;
          });
      case "server":
        fetch(`/fibonacci/${number}`)
          .then((response) => {
            if (!response.ok) {
              result.value = "Error: Network response was not ok";
            }
            return response.json();
          })
          .then((data) => {
            result.value = `Fibonacci(${number}) = ${data.result}`;
          })
          .catch((error) => {
            result.value = `Error: ${error.message}`;
          });
      case "async":
        import("./fibonacci.js")
          .then(({ default: fibonacci }) => {
            return new Promise((resolve) => {
              resolve(fibonacci(number));
            });
          })
          .then((fibResult) => {
            result.value = `Fibonacci(${number}) = ${fibResult}`;
          })
          .catch((error) => {
            result.value = `Error: ${error.message}`;
          });
        break;
      default:
        break;
    }
  });
});
