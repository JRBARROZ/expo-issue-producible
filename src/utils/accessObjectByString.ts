function accessObjectByString(object: Record<string, any>, string: string) {
  try {
    const splitedString = string.split(".");

    const attribute = splitedString.reduce((previous, current) => {
      return previous[current];
    }, object);

    return attribute as any;
  } catch (err) {
    console.log(err, "Attention to verify the 'string' parameter");
  }
}

export default accessObjectByString;
