const Core = require('@alicloud/pop-core');
const fs = require('fs');
const { dnsClient, getRecordIdPath } = require('./config');
//
let CERTBOT_DOMAIN = process.env.CERTBOT_DOMAIN;
console.log('CERTBOT_DOMAIN', CERTBOT_DOMAIN);
//
let RecordId = fs.readFileSync(getRecordIdPath(CERTBOT_DOMAIN), {
  encoding: 'utf8',
});
console.log(RecordId);
//
let params = {
  RecordId,
};
let requestOption = {
  method: 'POST',
};

dnsClient.request('DeleteDomainRecord', params, requestOption).then(
  (result) => {
    console.log(JSON.stringify(result));
  },
  (ex) => {
    console.log(ex);
  }
);
