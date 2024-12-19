/**
 * Calculates the time left until a specified end date.
 *
 * @param endDate - The end date as a string in a format recognized by the `Date` constructor.
 * @returns An object containing the time left in days, hours, minutes, and seconds, or `null` if the end date has passed.
 *
 * @example
 * ```typescript
 * const timeLeft = calculateTimeLeft('2023-12-31T23:59:59Z');
 * if (timeLeft) {
 *   console.log(`Days: ${timeLeft.days}, Hours: ${timeLeft.hours}, Minutes: ${timeLeft.minutes}, Seconds: ${timeLeft.seconds}`);
 * } else {
 *   console.log('The deal has ended.');
 * }
 * ```
 */
export const calculateTimeLeft = (
  endDate: string | undefined,
  currentTime: number
) => {
  if (!endDate) return null; // Sin endDate, no hay límite

  const difference = new Date(endDate).getTime() - currentTime;

  if (difference <= 0) {
    return null; // El deal ha terminado
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};
