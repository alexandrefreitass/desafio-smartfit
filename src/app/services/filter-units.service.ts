import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning: {
    firts: '06',
    last: '12'
  },
  afternoon: {
    firts: '12',
    last: '18'
  },
  night: {
    firts: '18',
    last: '23'
  },
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number){
    switch (weekday){
      case 0:
        return 'Dom.'
      case 6: 
        return 'Sab.'
      default:
        return 'Seg. à Sex.'
    }
  }


  filterUnits(unit: Location, OPEN_HOUR: string, CLOSE_HOUR: string){
    if(!unit.schedules) return true;
      let OPEN_HOUR_FILTER = parseInt(OPEN_HOUR,10)
      let CLOSE_HOUR_FILTER = parseInt(CLOSE_HOUR,10)

      let todays_weekday = this.transformWeekday(new Date().getDay());

      for(let i = 0; i < unit.schedules.length; i++){
        let schedule_hour = unit.schedules[i].hour
        let schedule_weekday = unit.schedules[i].weekdays
        if(todays_weekday === schedule_weekday){
          if(schedule_hour !== 'Fechada'){
            let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
            let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''),10)
            let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''),10)

            if(unit_open_hour_int <= OPEN_HOUR_FILTER && unit_close_hour_int >= CLOSE_HOUR_FILTER) return true
            else return false
          }
        }
      }

      return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string){
    let intermediateResults = results;

    if(!showClosed) {
      intermediateResults = results.filter(location => location.opened === true); 
    }
    if(hour){
      const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].firts
      const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last
      return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else{
      return intermediateResults;
    }
  }
}
