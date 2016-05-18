interface Party {
  _id?: string;
  name: string;
  description?: string;
  location: string;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  invited?: Array<string>;
  rsvps?: Array<RSVP>;
}

interface RSVP {
  userId: string;
  response: string;
}