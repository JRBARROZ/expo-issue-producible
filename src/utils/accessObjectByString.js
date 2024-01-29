function accessObjectByString(object, string) {
  try {
    if (object instanceof Object && string) {
      const splitedString = string.split(".");

      const attribute = splitedString.reduce((previous, current) => {
        return previous[current];
      }, object);

      return attribute;
    }
  } catch (err) {
    console.log(err, "Attention to verify the 'string' parameter");
  }
}

export default accessObjectByString;
