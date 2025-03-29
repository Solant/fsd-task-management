export function wait(delay: number = 3_000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
