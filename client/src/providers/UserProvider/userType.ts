interface UserPicture {
  thumbnail: string;
  large: string;
  medium: string;
}

interface Location {
  country: string;
  city: string;
  street: Street;
  timezone: Timezone;
  postcode: number;
  coordinates: Coordinates;
  state: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Street {
  number: number;
  name: string;
}

interface Timezone {
  offset: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  gender: string;
  email: string;
  location: Location;
  phone: string;
  cell: string;
  nat: string;
  picture: UserPicture;
  points: number;
}
