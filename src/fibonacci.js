export default function fibonacci(number) {
  if (number <= 1) return number;

  return fibonacci(number - 1) + fibonacci(number - 2);
}
