export interface ISkill {
  'match': true;
  'id': 0;
  'name': string;
  'required': true;
}

export interface IJob {
  'matchingPercentage': number;
  'new': boolean;
  'id': number;
  'position': string;//'Backend NodeJS Developer';
  'appliedTime': null;
  'appliedBy': null;
  'favorite': boolean;
  'type': number;
  'url': string;
  'companyName': null;
  'skills': ISkill[];
  'interviews': [];
  'image': null;
  'scheduledInterviews': [];
  'city': string;
  'country': string;
}
