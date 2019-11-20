import { BehaviorSubject } from 'rxjs';

export class EventService {
  private static dataSource = new BehaviorSubject<any>(null);
  static data = EventService.dataSource.asObservable();

  static updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }

  private static sendMessage$ = new BehaviorSubject<any>(null);
  static sendMessageData$ = EventService.sendMessage$.asObservable();

  static sendMessageEmit(data: any) {
    this.sendMessage$.next(data);
  }
}
