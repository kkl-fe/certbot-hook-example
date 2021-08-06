const fs = require('fs');
const { dnspodClient, getRecordIdPath } = require('./config');
// 读取主域名和记录名
const CERTBOT_DOMAIN = process.env.CERTBOT_DOMAIN;
const CERTBOT_VALIDATION = process.env.CERTBOT_VALIDATION;
console.log('CERTBOT_DOMAIN', CERTBOT_DOMAIN);
console.log('CERTBOT_VALIDATION', CERTBOT_VALIDATION);
let Domain,
  SubDomain = '';
let match = CERTBOT_DOMAIN.match(/((.*)\.)?(.*\..*)/);
if (match) {
  SubDomain = match[2];
  Domain = match[3];
  SubDomain = '_acme-challenge' + (SubDomain ? '.' + SubDomain : '');
} else {
  console.log('请检查域名');
  return;
}
console.log(Domain, SubDomain);
// 添加记录
dnspodClient
  .CreateRecord({
    Domain,
    SubDomain,
    RecordType: 'TXT',
    Value: CERTBOT_VALIDATION,
    RecordLine: '默认',
  })
  .then((data) => {
    let { RecordId } = data;
    // 存储RecordId
    fs.writeFileSync(getRecordIdPath(CERTBOT_DOMAIN), '' + RecordId);
    console.log('记录保存成功', RecordId);
    setTimeout(() => {
      // 等待解析生效
      console.log('结束');
    }, 10000);
  })
  .catch((err) => {
    console.error('error', err);
  });
