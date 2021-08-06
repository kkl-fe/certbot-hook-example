const tencentcloud = require('tencentcloud-sdk-nodejs');
const DnspodClient = tencentcloud.dnspod.v20210323.Client;

const clientConfig = {
  // 腾讯云认证信息
  credential: {
    secretId: '',
    secretKey: '',
  },
  // 产品地域
  region: 'ap-shanghai',
  // 可选配置实例
  profile: {
    signMethod: 'HmacSHA256', // 签名方法
    httpProfile: {
      reqMethod: 'POST', // 请求方法
      reqTimeout: 30, // 请求超时时间，默认60s
    },
  },
};
const getRecordIdPath = (domain) => {
  return '/tmp/CERTBOT_' + domain + '_RECORD_ID';
};

const dnspodClient = new DnspodClient(clientConfig);
module.exports = { dnspodClient, getRecordIdPath };
