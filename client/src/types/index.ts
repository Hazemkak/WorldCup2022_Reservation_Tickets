type ROLES = "0" | "1" | "2";
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  birthDate: string;
  gender: string;
  nationality: string;
  role: string;
  isVerified: boolean;
}

export interface Stadium {
  id: number;
  name: string;
  city: string;
  country: string;
  rows: number;
  seatsPerRow: number;
}

export interface Team {
  id: number;
  name: string;
  img_url: string;
}

export interface Referee {
  id: number;
  firstName: string;
  lastName: string;
  role: ROLES;
}

export interface Match {
  id: number;
  stadium: Stadium;
  match_date: string;
  match_time: string;
  teams: Array<Team>;
  referees: Array<Referee>;
}

export interface Reservation {
  id: number;
  user: User;
  match: Match;
  reservationDate: string;
  seatId: number;
}
