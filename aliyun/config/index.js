const Core = require('@alicloud/pop-core');

const clientConfig = {
  accessKeyId: '',
  accessKeySecret: '',
  endpoint: 'https://dns.aliyuncs.com',
  apiVersion: '2015-01-09',
};
const getRecordIdPath = (domain) => {
  return '/tmp/CERTBOT_' + domain + '_RECORD_ID';
};
const dnsClient = new Core(clientConfig);

module.exports = {
  dnsClient,
  getRecordIdPath,
};
