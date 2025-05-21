export class TypeNotification {
  public uuid?: string;
  public name: string;
  public notificationByType?: Notification[];
  constructor(name: string) {
    this.name = name;
  }
}
