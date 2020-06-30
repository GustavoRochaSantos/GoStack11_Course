class AppErrors {
  public readonly code: number;
  public readonly message: string;

  constructor(message = '', code = 401) {
    this.code = code;
    this.message = message;
  }
}

export default AppErrors;
