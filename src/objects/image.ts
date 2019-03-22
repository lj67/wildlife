import { Creature } from "./creature";
import { Trip } from "./trip";

export class Image{

    constructor() {
    }

    id: number;
    creatureId: number;
    tripId: number;
    trip: Trip = new Trip;
    creature: Creature = new Creature;
    location: Location = new Location;
    meta: string;
}