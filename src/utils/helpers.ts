export const serializeDate = (date: string) => {
  const convertedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const optionsWithYear: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const optionsWithTime: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const formattedDate = convertedDate.toLocaleDateString("en-US", options);
  const formattedDateWithYear = convertedDate.toLocaleDateString(
    "en-US",
    optionsWithYear
  );
  const formattedDateWithTime = convertedDate
    .toLocaleString("en-US", optionsWithTime)
    .replace("at", ",");

  return { formattedDate, formattedDateWithYear, formattedDateWithTime };
};
