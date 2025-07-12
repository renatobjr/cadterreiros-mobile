const StringUtils = {
  capitalize: (string: string) => {
    return string.toLocaleLowerCase().charAt(0).toUpperCase() + string.slice(1);
  },
};

export default StringUtils;
