import { Creature } from "./creature";
import { Trip } from "./trip";
import { Location } from "./location";

export class Sightings{

    constructor() {
    }

    creatures: Creature[] = [];
    trip: Trip = new Trip;
    location: Location = new Location;


}