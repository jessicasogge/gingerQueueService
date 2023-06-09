# gingerQueueService

Problem statement:

Create a service containing a job queue. Each job will consist of fetching data from a URL and storing the results.

The service should expose REST or GraphQL API endpoints for:
- adding a new job (should take the target URL as an argument)
- checking the status of an existing job
- retrieving the results of a completed job.
- deleting a job

If a URL has been submitted within the last hour, do not fetch the data again.

The API should also support batch requests for new jobs (i.e. you should be able to add jobs for several URLs at once).

Assumption - deleting/checking status in database is sufficient - would need additional implementation to remove from queue

To Run:

Must have redis installed locally and running locally
Start the web process: npm run start
Start the consumer process: npm run startConsumer

To Lint: npm run lint

Endpoints:

Health Check: GET http://localhost:3002/health-check

Add a job to Queue: POST http://localhost:3002/jobs Body: {"targetUrls": ["https://example.com/"]...}

Get status of an existing job or results: GET: http://localhost:3002/job/:id

Delete a job: DELETE http://localhost:3002/job/:id

