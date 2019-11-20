import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { JobService } from './job.service';
import { EventService } from '../../client/event.service';
import { IJob } from '../../typings/job';

@Controller('api/v1/jobs')
export class JobController {

  constructor(private jobService: JobService) {
  }

  @Get('/')
  async getJob(@Request() req, @Body() body, @Query() query) {
    // {	$or: [{"country" : "Canada"}, {"country" : "USA"}]}
    if (query.country) {
      query.$or = query.country.split(',').map((country) => {
        return { country };
      });
      delete query.country;
    }
    return this.jobService.findAll(query);
  }

  @Post('/:id')
  async updateJob(@Request() req, @Body() body, @Query() query, @Param() param) {
    return this.jobService.update(param, body);
  }

  @Post('apply/:id')
  async applyForJob(@Request() req, @Body() body, @Query() query, @Param() param) {
    const jobData: any = await this.jobService.applyForJob(param, body.id, query.action);
    const message = this.getMessage(query.action, jobData._doc);
    EventService.sendMessageEmit({
      user_id: body.id,
      message,
      details: `Job details: <a target="_blank" href="https://vanhack.com/platform/#/jobs/${jobData.id}">Site link</a>`,
      time: Date.now(),
      read: false,
    });
    return jobData;
  }

  getMessage(action, job: any) {
    if (action === 'apply') {
      return `You have successfully applied the position of ${job.positionName}`;
    }
    if (action === 'offer') {
      return `Company has made you an offer for the position of ${job.positionName}`;
    }
    if (action === 'interview') {
      return `Company has called you for the interview for the position of ${job.positionName}`;
    }
    if (action === 'hire') {
      return `You have been hired for the position of ${job.positionName}`;
    }
    if (action === 'reject') {
      return `You have been rejected for the position of ${job.positionName}`;
    }
  }

  @Put('/')
  async createJob(@Request() req, @Body() body, @Query() query) {
    return this.jobService.create(body);
  }
}
