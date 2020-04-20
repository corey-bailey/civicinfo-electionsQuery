const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiMatch = require('chai-match');
const expect = chai.expect;
var apiKey = process.env.APIKEY; 

chai.use(chaiHttp);
chai.use(chaiMatch);
var Banner = `
 _____ _           _   _                ___  ______ _____   _____         _   
|  ___| |         | | (_)              / _ \\ | ___ \\_   _| |_   _|       | |  
| |__ | | ___  ___| |_ _  ___  _ __   / /_\\ \\| |_/ / | |     | | ___  ___| |_ 
|  __|| |/ _ \\/ __| __| |/ _ \\| '_ \\  |  _  ||  __/  | |     | |/ _ \\/ __| __|
| |___| |  __/ (__| |_| | (_) | | | | | | | || |    _| |_    | |  __/\\__ \\ |_ 
\\____/|_|\\___|\\___|\\__|_|\\___/|_| |_| \\_| |_/\\_|    \\___/    \\_/\\___||___/\\__|                                                                    
`
console.log(Banner)
describe('civic-info-api', function () {
	describe('elections', function () {
		describe('elections positive tests', () => {
			it('validate civicinfo response contract', function (done) {
				this.timeout(5000);
				chai.request('https://www.googleapis.com/')
					.get(`/civicinfo/v2/elections?key=${apiKey}`)
					.set('content-type', 'application/json')
					.end(function (err, res) {
						var responseKind = (res.body.kind)
						expect(res).to.have.status(200);
						expect(res.body).to.have.property('kind');                         //validate that kind node exists
						expect(res.body).to.have.property('elections');                    //validate that elections node exists
						expect(responseKind).to.equal('civicinfo#electionsQueryResponse'); //confirm collections query response
						done();
					});
			});

			it('validate election id', function (done) {
				this.timeout(5000);
				chai.request('https://www.googleapis.com/')
					.get(`/civicinfo/v2/elections?key=${apiKey}`)
					.set('content-type', 'application/json')
					.end(function (err, res) {
						expect(res).to.have.status(200);
						for (var i = 0; i < res.body.elections.length; i++) {           //loop through all election nodes
							var electionId = (res.body.elections[i].id)
							expect(electionId).to.match(/^\d{4}$/);                     //validate all election ids in array are 4 digits
							expect(electionId).to.be.a('string');                       // validate all election ids in array are string type
						}
						done();
					});
			});

			it('validate election name', function (done) {
				this.timeout(5000);
				chai.request('https://www.googleapis.com/')
					.get(`/civicinfo/v2/elections?key=${apiKey}`)
					.set('content-type', 'application/json')
					.end(function (err, res) {
						expect(res).to.have.status(200);
						for (var i = 0; i < res.body.elections.length; i++) {           //loop through all election nodes
							var electionName = (res.body.elections[i].name)
							expect(electionName).to.be.a('string');                     // validate that all election names in array are in string format
						}
						done();
					});
			});

			it('validate election day', function (done) {
				this.timeout(5000);
				chai.request('https://www.googleapis.com/')
					.get(`/civicinfo/v2/elections?key=${apiKey}`)
					.set('content-type', 'application/json')
					.end(function (err, res) {
						expect(res).to.have.status(200);
						for (var i = 0; i < res.body.elections.length; i++) {
							var electionDay = (res.body.elections[i].electionDay)
							expect(electionDay).to.be.a('string');                      //validate all election dates in array are in string format 
							expect(electionDay).to.match(/^\d{4}-\d{2}-\d{2}$/);        //validate all election dates in array follow YYYY-MM-DD FORMAT
						}
						done();
					});
			});

			it('validate election ocd division id', function (done) {
				this.timeout(5000);
				chai.request('https://www.googleapis.com/')
					.get(`/civicinfo/v2/elections?key=${apiKey}`)
					.set('content-type', 'application/json')
					.end(function (err, res) {
						expect(res).to.have.status(200);
						for (var i = 0; i < res.body.elections.length; i++) {           //loop through all election nodes
							var ocdDivisionId = (res.body.elections[i].ocdDivisionId)
							expect(ocdDivisionId).to.be.a('string');                    //validate all ocd Division ids in array are A string 
							expect(ocdDivisionId).to.match(/ocd-division\/country:\w+/);//validate all ocd Division ids follow ocd-division/country format 
						}
						done();
					});
			});

			describe('elections negative tests', () => {
				it('elections bad api key', function (done) {
					this.timeout(5000);
					chai.request('https://www.googleapis.com/')
						.get('/civicinfo/v2/elections?key=BADAPIKEY')
						.set('content-type', 'application/json')
						.end(function (err, res) {
							var errorDomain = (res.body.error.errors[0].domain)
							var errorReason = (res.body.error.errors[0].reason)
							var errorMessage = (res.body.error.errors[0].message)
							expect(errorDomain).to.equal('usageLimits');                //confirm error domain equal to usage limits
							expect(errorReason).to.equal('keyInvalid');                 //confirm error reason is because of invalid key
							expect(errorMessage).to.equal('Bad Request');               //confirm response indicates that request was bad
							expect(res).to.have.status(400);
							done();
						});
				});
			});
		});
	});
});