
export class MessageStyler {

  public static styleMessage(message: string) {

    let border;
    if (message !== undefined && (message.includes('created') || message.includes('updated'))) {
      border = {'border-style': 'dashed', color: 'green'};
    } else if (message !== undefined && (!message.includes('created') || message.includes('updated'))) {
      border = {'border-style': 'dotted', color: 'red'};
    }

    return border;
  }

  public static stylePriceMessage(isError: boolean) {
    let result;
    if (isError) {
      result = {color: 'red'};
    } else {
      result = {color: 'green'};
    }
    return result;
  }

  static styleElementToChange(isOnEdit: boolean) {

    if (isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

  public static styleAuthenticationMessage() {
    return {'border-style': 'solid', color: 'red'};
  }
}
