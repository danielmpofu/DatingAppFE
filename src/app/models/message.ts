export interface Message {
  id:number;
  senderId:number;
  senderUserName:string;
  senderPhotoUrl:string;
  recipientId:number;
  recipientUsername:string;
  recipientPhoto:string;
  content:string;
  dateRead?:Date;
  messageSent:Date;
}
