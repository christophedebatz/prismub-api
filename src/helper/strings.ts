export const Strings = {

  ucfirst(str:string):string {
    if (str && str.length > 0) {
      return str.substr(0, 1).toUpperCase() + str.substring(1);
    }
    return str;
  }

};
