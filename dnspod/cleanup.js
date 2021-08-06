const fs = require('fs');
const { dnspodClient, getRecordIdPath } = require('./config');
// 读取主域名
const CERTBOT_DOMAIN = process.env.CERTBOT_DOMAIN;
console.log('CERTBOT_DOMAIN', CERTBOT_DOMAIN);
let Domain;
let match = CERTBOT_DOMAIN.match(/(.*\.)?(.*\..*)/);
if (match) {
  Domain = match[2];
} else {
  console.log('请检查域名');
  return;
}
console.log(Domain);
// 读取RecordId
let RecordId = fs.readFileSync(getRecordIdPath(CERTBOT_DOMAIN), {
  encoding: 'utf8',
});
console.log(RecordId);
// 删除记录
dnspodClient
  .DeleteRecord({
    Domain: Domain,
    RecordId: RecordId,
  })
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.error('error', err);
    }
  );
