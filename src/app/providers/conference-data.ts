import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ConferenceData {
    data: any;

    constructor(public http: HttpClient, public user: UserData) {}

    // funcion que carga los datos
    load(): any {
        if(this.data) {
            return of(this.data);
        } else {
            return this.http.get('assets/data/data.json').pipe(
                map(this.processData, this)
            );
        }
    }

    processData(data: any) {
        
        this.data = data;
    
        this.data.schedule.forEach((day: any) => {
          day.groups.forEach((group: any) => {

            group.sessions.forEach((session: any) => {
              session.speakers = [];
              if (session.speakerNames) {
                session.speakerNames.forEach((speakerName: any) => {
                  const speaker = this.data.speakers.find(
                    (s: any) => s.name === speakerName
                  );
                  if (speaker) {
                    session.speakers.push(speaker);
                    speaker.sessions = speaker.sessions || [];
                    speaker.sessions.push(session);
                  }
                });
              }
            });
          });
        });
    
        return this.data;
      }

      getTimeline(
        dayIndex: number,
        queryText = '',
        excludeTracks: any[] = [],
        segment = 'all'
      ) {
        return this.load().pipe(
          map((data: any) => {
            const day = data.schedule[dayIndex];
            day.shownSessions = 0;
    
            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            const queryWords = queryText.split(' ').filter(w => !!w.trim().length);
    
            day.groups.forEach((group: any) => {
              group.hide = true;
    
              group.sessions.forEach((session: any) => {
                this.filterSession(session, queryWords, excludeTracks, segment);
    
                if (!session.hide) {
                  group.hide = false;
                  day.shownSessions++;
                }
              });
            });
    
            return day;
          })
        );
      }
    
      filterSession(
        session: any,
        queryWords: string[],
        excludeTracks: any[],
        segment: string
      ) {
        let matchesQueryText = false;
        if (queryWords.length) {
          queryWords.forEach((queryWord: string) => {
            if (session.name.toLowerCase().indexOf(queryWord) > -1) {
              matchesQueryText = true;
            }
          });
        } else {
          matchesQueryText = true;
        }
    
        let matchesTracks = false;
        session.tracks.forEach((trackName: string) => {
          if (excludeTracks.indexOf(trackName) === -1) {
            matchesTracks = true;
          }
        });
    
        let matchesSegment = false;
        if (segment === 'favorites') {
          if (this.user.hasFavorite(session.name)) {
            matchesSegment = true;
          }
        } else {
          matchesSegment = true;
        }
    
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
      }
    
      getSpeakers() {
        return this.load().pipe(
          map((data: any) => {
            return data.speakers.sort((a: any, b: any) => {
              const aName = a.name.split(' ').pop();
              const bName = b.name.split(' ').pop();
              return aName.localeCompare(bName);
            });
          })
        );
      }
    
      getTracks() {
        return this.load().pipe(
          map((data: any) => {
            return data.tracks.sort();
          })
        );
      }
    
      getMap() {
        return this.load().pipe(
          map((data: any) => {
            return data.map;
          })
        );
      }

}
