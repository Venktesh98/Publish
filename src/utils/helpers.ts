export const serializeDate = (date: string) => {
  const convertedDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const optionsWithYear: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = convertedDate.toLocaleDateString("en-US", options);
  const formattedDateWithYear = convertedDate.toLocaleDateString(
    "en-US",
    optionsWithYear
  );
  return { formattedDate, formattedDateWithYear };
};


