import { User } from "../../user/models/user";
import { Chat } from "./chat";

export class Message {
  public uuid: string;
  public sendDate: Date;
  public status: boolean;
  public idChat: string;
  public image: string;
  public description: string;
  public idSender: string;
  public idReceiver: string;
  public senderUser?: User;
    public receiverUser?: User;
    public messageChat?: Chat;

    constructor(
        uuid: string,
        sendDate: Date,
        status: boolean,
        idChat: string,
        image: string,
        description: string,
        idSender: string,
        idReceiver: string,
    ) {
        this.uuid = uuid;
        this.sendDate = sendDate;
        this.status = status;
        this.idChat = idChat;
        this.image = image;
        this.description = description;
        this.idSender = idSender;
        this.idReceiver = idReceiver;
    } 
}
