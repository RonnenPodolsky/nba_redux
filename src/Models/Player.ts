interface Team {
  name: string;
  abbreviation: string | null;
  city: string;
  confrence: string;
  divistion: string;
  full_name: string;
  id: number;
}

export interface PlayerObj {
  first_name: string;
  last_name: string;
  height_feet: null | number;
  height_inches: null | number;
  weight_pounds: null | number;
  position: string | null;
  id: number;
  team: Team;
  fav?: boolean;
}
