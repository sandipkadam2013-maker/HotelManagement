

export interface RoomResponse{
     roomtypes: Room[];
     rooms: Room[];
}

 export interface Room {
  data: any;
  id: number;
  email: string;
  image: string;
  Title: string;
  description: string;
  price: string;
}


 export interface Billing {
  data: any;
  id: number;
  name: string;
  address:string;
  number:string;
  roomtype: string;
  checkin: string;
  checkout: string;
  ratepernight:string;
  addcharges: string;
  nights : string;
  totalamount:string;
}

