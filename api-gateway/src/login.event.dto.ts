export class LoginEvent {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  toString() {
    return JSON.stringify({
      orderId: this.email,
      userId: this.password,
    });
  }
}
