export interface Location {
    id: number,
    title: string,
    content: string,
    opened: boolean,
    mask: string,
    towel: string,
    fountain: string,
    locker_room: string,
    schedules: Schedules[]
}

interface Schedules {
    weekdays: string,
    hour: string
}