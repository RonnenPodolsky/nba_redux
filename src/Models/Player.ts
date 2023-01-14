interface Team {
  name: string;
}

export interface PlayerObj {
  first_name: string;
  last_name: string;
  position: string;
  id: number;
  team: Team;
  fav?: boolean;
}