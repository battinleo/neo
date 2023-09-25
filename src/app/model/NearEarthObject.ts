import { ApiObject } from "src/app/data/api";

export type Oval = {
    minorAxisMeters: number;
    majorAxisMeters: number;
}

export class NearEarthObject {
    public static fromApiObject(apiObject: ApiObject) {
        return new NearEarthObject(
            apiObject.id,
            apiObject.name,
            apiObject.absolute_magnitude_h,
            {
                minorAxisMeters: apiObject.estimated_diameter.meters.estimated_diameter_min,
                majorAxisMeters: apiObject.estimated_diameter.meters.estimated_diameter_max,
            },
            apiObject.is_potentially_hazardous_asteroid,
            +apiObject.close_approach_data[0].relative_velocity.kilometers_per_hour,
            +apiObject.close_approach_data[0].miss_distance.kilometers,
        );
    }

    constructor(
        public id: string,
        public name: string,
        public magnitude: number,
        public shape: Oval,
        public hazardous: boolean,
        public relativeVelocityKmPH: number,
        public missDistanceKm: number,
    ) {}
}