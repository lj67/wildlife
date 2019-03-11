import { Creature } from "./creature";
import { Trip } from "./trip";

export class Sighting{

    constructor() {
    }

    id: number;
    creatureId: number;
    total: number;
    tripId: number;
    trip: Trip = new Trip;
    creature: Creature = new Creature;
}