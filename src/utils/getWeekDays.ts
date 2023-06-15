export function getWeekDays() {
  const weekDayFormatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  });

  return Array.from(Array(7).keys())
    .map(
      (day) => weekDayFormatter.format(new Date(Date.UTC(2021, 5, day))) // month and year where the month starts on Sunday (0)
    )
    .map((weekDay) =>
      weekDay.split("")[0].toUpperCase().concat(weekDay.substring(1))
    );
}
