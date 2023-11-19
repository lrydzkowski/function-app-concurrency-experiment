export class TimeUtils {
  public static waitAsync(n: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, n * 1000);
    });
  }
}
