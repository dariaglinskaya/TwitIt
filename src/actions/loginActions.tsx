export function setUsername(username: string) {
    return function(dispatch: any) {
      dispatch({ type: "SET_USERNAME", payload: { username: username } });
    };
  }