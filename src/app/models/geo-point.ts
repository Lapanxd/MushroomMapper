export interface IGeoPoint {
  _id?: string,
  location: {
    type: string,
    coordinates: number[];
  },
  mushroom_id?: string,
}
